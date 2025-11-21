#!/usr/bin/env python3
"""
Update index.md files for each quadrant with current technologies.

This script scans all technology markdown files and updates the index.md
files in each quadrant directory to list the technologies in each ring.
"""

import os
from pathlib import Path
from collections import defaultdict
import re
import yaml


def extract_frontmatter(content: str) -> dict:
    """Extract YAML frontmatter from markdown content."""
    pattern = r'^---\s*\n(.*?)\n---\s*\n'
    match = re.match(pattern, content, re.DOTALL)
    
    if match:
        frontmatter_text = match.group(1)
        try:
            return yaml.safe_load(frontmatter_text)
        except yaml.YAMLError as e:
            print(f"Error parsing YAML: {e}")
            return {}
    return {}


def scan_quadrant(quadrant_path: Path, quadrant_name: str) -> dict:
    """Scan a quadrant directory and return technologies by ring."""
    rings = {'adopt': [], 'trial': [], 'assess': [], 'hold': []}
    
    for ring in rings.keys():
        ring_path = quadrant_path / ring
        if not ring_path.exists():
            continue
            
        for md_file in ring_path.glob('*.md'):
            try:
                with open(md_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                frontmatter = extract_frontmatter(content)
                title = frontmatter.get('title', md_file.stem)
                
                rings[ring].append({
                    'title': title,
                    'file': f"{ring}/{md_file.name}"
                })
                
            except Exception as e:
                print(f"Error processing {md_file}: {e}")
    
    return rings


def generate_index_content(quadrant_name: str, display_name: str, description: str, rings: dict) -> str:
    """Generate the index.md content for a quadrant."""
    
    content = f"""# {display_name}

{description}

"""
    
    ring_descriptions = {
        'adopt': 'Technologies in this ring are proven and recommended for wide use across our teams.',
        'trial': 'Technologies we\'re actively using but need more production experience with.',
        'assess': 'Technologies worth exploring to understand their potential impact.',
        'hold': 'Technologies we recommend proceeding with caution or avoiding.'
    }
    
    ring_titles = {
        'adopt': 'Adopt',
        'trial': 'Trial',
        'assess': 'Assess',
        'hold': 'Hold'
    }
    
    for ring in ['adopt', 'trial', 'assess', 'hold']:
        content += f"## {ring_titles[ring]}\n\n"
        content += f"{ring_descriptions[ring]}\n\n"
        
        if rings[ring]:
            for tech in sorted(rings[ring], key=lambda x: x['title']):
                content += f"- [{tech['title']}]({tech['file']})\n"
        else:
            content += "*No technologies in this ring yet.*\n"
        
        content += "\n"
    
    return content


def main():
    """Main function."""
    script_dir = Path(__file__).parent
    docs_dir = script_dir / 'docs'
    
    quadrants = {
        'techniques': {
            'name': 'Techniques',
            'description': 'Techniques are practices, methodologies, and approaches to software development that we use or are evaluating.'
        },
        'tools': {
            'name': 'Tools',
            'description': 'Software development tools, testing frameworks, and utilities that help us build better software.'
        },
        'platforms': {
            'name': 'Platforms',
            'description': 'Infrastructure, cloud services, and runtime environments that power our applications.'
        },
        'languages-frameworks': {
            'name': 'Languages & Frameworks',
            'description': 'Programming languages and application frameworks we use to build our software.'
        }
    }
    
    print("🔄 Updating index files...")
    
    for quadrant_id, quadrant_info in quadrants.items():
        quadrant_path = docs_dir / quadrant_id
        if not quadrant_path.exists():
            print(f"⚠️  Skipping {quadrant_id}: directory not found")
            continue
        
        # Scan for technologies
        rings = scan_quadrant(quadrant_path, quadrant_id)
        
        # Generate index content
        content = generate_index_content(
            quadrant_id,
            quadrant_info['name'],
            quadrant_info['description'],
            rings
        )
        
        # Write index.md
        index_file = quadrant_path / 'index.md'
        with open(index_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        # Count technologies
        total = sum(len(techs) for techs in rings.values())
        print(f"✅ Updated {quadrant_id}/index.md ({total} technologies)")
    
    print("\n✨ All index files updated!")


if __name__ == '__main__':
    main()

