import json
import os
import sys
import yaml

def sync():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    cv_data_path = os.path.join(root, 'cvitae/dist/master.json')
    meta_path = os.path.join(root, 'site_meta.yaml')
    output_path = os.path.join(root, 'js/content.js')

    if not os.path.exists(cv_data_path):
        print(f"Error: CV data not found at {cv_data_path}")
        sys.exit(1)

    with open(cv_data_path, 'r') as f:
        cv_data = json.load(f)
    
    with open(meta_path, 'r') as f:
        meta = yaml.safe_load(f)

    try:
        content = {
            "meta": meta["meta"],
            "header": meta["header"],
            "nav": meta["nav"],
            "intro": meta["intro"],
            "summary": cv_data["summary"].get(meta.get("summary_key", "general"), "").strip(),
            "sections": {},
            "footer": meta["footer"],
            "ui": meta["ui"]
        }

        for sec_key, sec_config in meta["sections"].items():
            resolved_sec = {
                "id": sec_config["id"],
                "title": sec_config["title"],
                "theme": sec_config["theme"],
                "entries": []
            }

            if sec_key == 'experience':
                for item_id in sec_config.get("items", []):
                    if item_id not in cv_data["experience"]: continue
                    entry = cv_data["experience"][item_id].copy()
                    entry['organizationUrl'] = entry.pop('organization_url', None)
                    entry['meta'] = f"{entry['dates']} · {entry['location']}"
                    entry.pop('dates', None)
                    entry.pop('location', None)
                    resolved_sec["entries"].append(entry)
            
            elif sec_key == 'education':
                for item_id in sec_config.get("items", []):
                    if item_id not in cv_data["education"]: continue
                    entry = cv_data["education"][item_id]
                    resolved_sec["entries"].append({
                        "title": f"{entry['degree']} — {entry['organization']}",
                        "meta": entry['dates'],
                        "bullets": entry['bullets']
                    })

            elif sec_key == 'projects':
                for item_id in sec_config.get("items", []):
                    if item_id not in cv_data["projects"]: continue
                    entry = cv_data["projects"][item_id]
                    resolved_sec["entries"].append({
                        "title": entry['title'],
                        "meta": entry['dates'],
                        "summary": entry['summary'],
                        "tools": entry['tools'],
                        "github": entry['url'] if not entry.get('private') else None,
                        "bullets": entry.get('bullets')
                    })

            elif sec_key == 'skills':
                del resolved_sec["entries"]
                resolved_sec["groups"] = []
                labels = {"programming_languages": "Programming Languages", "frameworks_and_libraries": "Frameworks & Libraries", "infrastructure_and_tools": "Infrastructure & Tools"}
                for cat, items in cv_data["skills"].items():
                    resolved_sec["groups"].append({"label": labels.get(cat, cat.replace('_', ' ').title()), "items": ", ".join(items)})

            elif sec_key == 'contact':
                resolved_sec.update({
                    "prompt": sec_config["prompt"],
                    "form": sec_config["form"]
                })

            elif sec_key == 'papers':
                resolved_sec["entries"] = sec_config["entries"]

            content["sections"][sec_key] = resolved_sec

        js_output = f"/** AUTO-GENERATED FROM CVITAE DATABASE **/\nwindow.SITE_CONTENT = {json.dumps(content, indent=4, ensure_ascii=False)};"
        with open(output_path, 'w') as f:
            f.write(js_output)
        print(f"✅ Published updated content to {output_path}")

    except Exception as e:
        print(f"❌ Error during sync: {e}")
        sys.exit(1)

if __name__ == '__main__':
    sync()
