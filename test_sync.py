import sys
import os
from pathlib import Path
root = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(root, "cvitae"))
from backend.loader import load_yaml
cv_data = load_yaml(Path(os.path.join(root, "cvitae/contents/cv_variants/general.yaml")))
print(cv_data.keys())
print(cv_data["summary"][:50])
