import json
import re

file_path = r'c:\Users\DELL USER\Desktop\assessment\sui\SuiWeet\suiweet\src\data\giverep_projects.json'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add brackets to make it a valid JSON array string
json_array_str = f'[{content}]'

# Use a regex to find and remove trailing comma before the closing bracket
json_array_str = re.sub(r',\s*\]$', ']', json_array_str)

projects = json.loads(json_array_str)

for i, project in enumerate(projects):
    project['id'] = i + 1
    
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(json.dumps(projects, indent=2))