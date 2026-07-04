import json
import os
import re
import sys

import yaml

SKILL_LABELS = {
    "programming_languages": "Programming Languages",
    "frameworks_and_libraries": "Frameworks & Libraries",
    "infrastructure_and_tools": "Infrastructure & Tools",
}


def normalize_dates(text):
    if not text:
        return text

    normalized = text.replace(" -- ", " – ")
    normalized = re.sub(r" – Now$", " – Present", normalized)
    return normalized


def get_override(section_config, item_id):
    overrides = section_config.get("overrides", {})
    override = overrides.get(item_id, {})
    return override if isinstance(override, dict) else {}


def resolve_experience_entry(entry, item_id, section_config):
    override = get_override(section_config, item_id)
    resolved = entry.copy()
    resolved["organizationUrl"] = resolved.pop("organization_url", None)
    dates = normalize_dates(resolved.pop("dates", ""))
    location = resolved.pop("location", "")
    resolved["meta"] = override.get("meta") or f"{dates} · {location}"
    resolved.update({k: v for k, v in override.items() if k != "meta"})
    return resolved


def resolve_education_entry(entry, item_id, section_config):
    override = get_override(section_config, item_id)
    dates = normalize_dates(entry.get("dates", ""))
    location = entry.get("location", "")
    resolved = {
        "title": override.get("title") or f"{entry['degree']} — {entry['organization']}",
        "meta": override.get("meta") or (f"{dates} · {location}" if location else dates),
        "bullets": override.get("bullets", entry.get("bullets", [])),
    }

    for key in ("footnote", "footnoteMarker"):
        if key in override:
            resolved[key] = override[key]

    return resolved


def resolve_project_entry(entry, item_id, section_config):
    override = get_override(section_config, item_id)
    dates = normalize_dates(entry.get("dates", ""))
    meta = override.get("meta") or dates

    if entry.get("private") and "private" not in meta.lower():
        meta = f"{meta} · private"

    resolved = {
        "title": override.get("title", entry.get("title", "")),
        "meta": meta,
        "tools": override.get("tools", entry.get("tools", [])),
        "github": None if entry.get("private") else entry.get("url"),
        "bullets": override.get("bullets", entry.get("bullets")),
    }

    summary = override.get("summary", entry.get("summary"))
    if summary and not override.get("bulletsOnly"):
        resolved["summary"] = summary

    if override.get("bulletsOnly"):
        resolved.pop("summary", None)

    for key in ("view", "gif"):
        if key in override:
            resolved[key] = override[key]

    if resolved.get("bullets") is None:
        resolved.pop("bullets", None)

    return resolved


def resolve_contact_section(section_config):
    resolved = {
        "id": section_config["id"],
        "title": section_config["title"],
        "theme": section_config["theme"],
        "prompt": section_config.get("prompt", ""),
        "form": section_config["form"],
    }

    for key in ("cvFile", "downloadIntro", "downloadLabel"):
        if key in section_config:
            resolved[key] = section_config[key]

    return resolved


def build_content(cv_data, meta):
    content = {
        "meta": meta["meta"],
        "header": meta["header"],
        "nav": meta["nav"],
        "intro": meta["intro"],
        "summary": cv_data["summary"].get(meta.get("summary_key", "general"), "").strip(),
        "sections": {},
        "footer": meta["footer"],
        "ui": meta["ui"],
    }

    for sec_key, sec_config in meta["sections"].items():
        if sec_key == "experience":
            entries = []
            for item_id in sec_config.get("items", []):
                if item_id not in cv_data["experience"]:
                    print(f"Warning: experience item '{item_id}' not found in cvitae data")
                    continue
                entries.append(resolve_experience_entry(cv_data["experience"][item_id], item_id, sec_config))
            content["sections"][sec_key] = {
                "id": sec_config["id"],
                "title": sec_config["title"],
                "theme": sec_config["theme"],
                "entries": entries,
            }

        elif sec_key == "education":
            entries = []
            for item_id in sec_config.get("items", []):
                if item_id not in cv_data["education"]:
                    print(f"Warning: education item '{item_id}' not found in cvitae data")
                    continue
                entries.append(resolve_education_entry(cv_data["education"][item_id], item_id, sec_config))
            content["sections"][sec_key] = {
                "id": sec_config["id"],
                "title": sec_config["title"],
                "theme": sec_config["theme"],
                "entries": entries,
            }

        elif sec_key == "projects":
            entries = []
            for item_id in sec_config.get("items", []):
                if item_id not in cv_data["projects"]:
                    print(f"Warning: project item '{item_id}' not found in cvitae data")
                    continue
                entries.append(resolve_project_entry(cv_data["projects"][item_id], item_id, sec_config))
            content["sections"][sec_key] = {
                "id": sec_config["id"],
                "title": sec_config["title"],
                "theme": sec_config["theme"],
                "entries": entries,
            }

        elif sec_key == "skills":
            groups = []
            for cat, items in cv_data["skills"].items():
                groups.append({
                    "label": SKILL_LABELS.get(cat, cat.replace("_", " ").title()),
                    "items": ", ".join(items),
                })
            content["sections"][sec_key] = {
                "id": sec_config["id"],
                "title": sec_config["title"],
                "theme": sec_config["theme"],
                "groups": groups,
            }

        elif sec_key == "contact":
            content["sections"][sec_key] = resolve_contact_section(sec_config)

        elif sec_key == "papers":
            content["sections"][sec_key] = {
                "id": sec_config["id"],
                "title": sec_config["title"],
                "theme": sec_config["theme"],
                "entries": sec_config.get("entries", []),
            }

    return content


def sync():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    cv_data_path = os.path.join(root, "cvitae/dist/master.json")
    meta_path = os.path.join(root, "site_meta.yaml")
    output_path = os.path.join(root, "js/content.js")

    if not os.path.exists(cv_data_path):
        print(f"Error: CV data not found at {cv_data_path}")
        sys.exit(1)

    with open(cv_data_path, "r", encoding="utf-8") as f:
        cv_data = json.load(f)

    with open(meta_path, "r", encoding="utf-8") as f:
        meta = yaml.safe_load(f)

    try:
        content = build_content(cv_data, meta)
        js_output = (
            "/** AUTO-GENERATED FROM CVITAE — run: make sync **/\n"
            f"window.SITE_CONTENT = {json.dumps(content, indent=4, ensure_ascii=False)};"
        )
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(js_output)
        print(f"✅ Published updated content to {output_path}")
    except Exception as e:
        print(f"❌ Error during sync: {e}")
        sys.exit(1)


if __name__ == "__main__":
    sync()
