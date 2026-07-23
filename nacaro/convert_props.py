#!/usr/bin/env python3
import re
import glob

def convert_define_props(content):
    # Pattern to match defineProps with generic type
    pattern = r'defineProps<\{[^}]+\}>\(\);'
    
    def replacer(match):
        return 'defineProps({});'
    
    return re.sub(pattern, replacer, content, flags=re.DOTALL)

# Process all Vue files
for filepath in glob.glob('app/**/*.vue', recursive=True):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = convert_define_props(content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f'Converted: {filepath}')

print('Done!')
