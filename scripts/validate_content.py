#!/usr/bin/env python3
"""Validate SITE_CONTENT shape against render.js and site.js expectations."""

import json
import os
import sys

import yaml

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sync import build_content


REQUIRED_TOP = ("meta", "header", "nav", "intro", "summary", "sections", "footer", "ui")
REQUIRED_SECTIONS = ("experience", "education", "skills", "projects", "contact", "papers")


def fail(message):
    print(f"❌ {message}")
    return False


def ok(message):
    print(f"✅ {message}")
    return True


def validate_content(content):
    passed = True

    for key in REQUIRED_TOP:
        if key not in content:
            passed = fail(f"Missing top-level field: {key}") and passed

    sections = content.get("sections", {})
    for key in REQUIRED_SECTIONS:
        if key not in sections:
            passed = fail(f"Missing section: {key}") and passed

    experience = sections.get("experience", {})
    if not experience.get("entries"):
        passed = fail("Experience section has no entries") and passed
    else:
        for index, entry in enumerate(experience["entries"]):
            for field in ("role", "organization", "meta", "bullets"):
                if field not in entry or entry[field] in (None, ""):
                    passed = fail(f"Experience[{index}] missing '{field}'") and passed

    education = sections.get("education", {})
    if not education.get("entries"):
        passed = fail("Education section has no entries") and passed
    else:
        aims = education["entries"][0]
        if not aims.get("footnote") or not aims.get("footnoteMarker"):
            passed = fail("AIMS education entry missing footnote") and passed

    skills = sections.get("skills", {})
    if not skills.get("groups"):
        passed = fail("Skills section has no groups") and passed

    projects = sections.get("projects", {})
    if not projects.get("entries"):
        passed = fail("Projects section has no entries") and passed
    else:
        titles = {entry.get("title") for entry in projects["entries"]}
        if "Billvoicer" not in titles:
            passed = fail("Billvoicer project missing") and passed
        recommender = next((e for e in projects["entries"] if e.get("title") == "Recommender System"), None)
        if not recommender or not recommender.get("view"):
            passed = fail("Recommender System missing live demo URL") and passed

    contact = sections.get("contact", {})
    for field in ("prompt", "form", "cvFile", "downloadIntro", "downloadLabel"):
        if field not in contact or contact[field] in (None, ""):
            passed = fail(f"Contact section missing '{field}'") and passed

    papers = sections.get("papers", {})
    if len(papers.get("entries", [])) < 2:
        passed = fail("Papers section should list both theses") and passed

    if passed:
        ok("SITE_CONTENT structure looks valid for the website renderer")
    return passed


def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    cv_data_path = os.path.join(root, "cvitae/dist/master.json")
    meta_path = os.path.join(root, "site_meta.yaml")

    with open(cv_data_path, "r", encoding="utf-8") as f:
        cv_data = json.load(f)
    with open(meta_path, "r", encoding="utf-8") as f:
        meta = yaml.safe_load(f)

    content = build_content(cv_data, meta)

    # Cross-check configured item IDs resolve in cvitae
    for sec_key, sec_config in meta.get("sections", {}).items():
        bucket = {"experience": "experience", "education": "education", "projects": "projects"}.get(sec_key)
        if not bucket:
            continue
        for item_id in sec_config.get("items", []):
            if item_id not in cv_data.get(bucket, {}):
                fail(f"site_meta item '{item_id}' not found in cvitae/{bucket}")

    if not validate_content(content):
        sys.exit(1)

    print("✅ All cvitae item IDs referenced in site_meta resolve correctly")


if __name__ == "__main__":
    main()
