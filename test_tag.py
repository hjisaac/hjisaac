import sys
import os
from pathlib import Path
root = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(root, "cvitae"))
from backend.loader import load_yaml, TaggedText
from backend.latex import escape_for_latex
from backend.resolution import resolve_cv
from backend.models import ContentData, CVConfig

cv_data_path = os.path.join(root, "cvitae/contents/cv_variants/general.yaml")
cv_data = load_yaml(Path(cv_data_path))
content = ContentData(**cv_data)

selector = os.path.join(root, "cvitae/contents/cv_selectors/general.yaml")
from backend.loader import load_yaml_with_inheritance
sel_data = load_yaml_with_inheritance(Path(selector))
config = CVConfig(**sel_data)

resolved = resolve_cv(config, content)
escaped = escape_for_latex(resolved)

print("Before escaping:")
print(type(resolved["cv"]["sections"][0]["entries"][0]["role"]))
print("After escaping:")
print(type(escaped["cv"]["sections"][0]["entries"][0]["role"]))

import jinja2
from backend.build import create_latex_template
template = create_latex_template(Path("cvitae/templates"))
out = template.render(cv=escaped["cv"], skills=escaped.get("skills", {}), languages=escaped.get("languages", {}), labels={})
print("Template render snippet:")
import re
match = re.search(r"\\textbf\{.*Apprentice Research Engineer.*\}", out)
print(match.group(0) if match else "NOT FOUND")
