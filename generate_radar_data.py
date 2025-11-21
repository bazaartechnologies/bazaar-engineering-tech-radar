#!/usr/bin/env python3
"""
Generate radar data from markdown files.

This script scans the docs directory for technology markdown files,
extracts their frontmatter metadata, and generates a JavaScript file
containing the radar data for visualization.
"""

import os
import json
import yaml
import re
from pathlib import Path
from typing import List, Dict, Any


def extract_frontmatter(content: str) -> Dict[str, Any]:
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


def scan_technologies(docs_dir: Path) -> List[Dict[str, Any]]:
    """Scan all markdown files and extract technology data."""
    technologies = []
    
    # Define quadrants and rings
    quadrants = ['techniques', 'tools', 'platforms', 'languages-frameworks']
    rings = ['adopt', 'trial', 'assess', 'hold']
    
    for quadrant in quadrants:
        quadrant_path = docs_dir / quadrant
        if not quadrant_path.exists():
            continue
            
        for ring in rings:
            ring_path = quadrant_path / ring
            if not ring_path.exists():
                continue
            
            # Find all markdown files in this ring
            for md_file in ring_path.glob('*.md'):
                try:
                    with open(md_file, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    frontmatter = extract_frontmatter(content)
                    
                    if not frontmatter:
                        print(f"Warning: No frontmatter found in {md_file}")
                        continue
                    
                    # Extract technology data
                    tech = {
                        'name': frontmatter.get('title', md_file.stem),
                        'ring': frontmatter.get('ring', ring),
                        'quadrant': frontmatter.get('quadrant', quadrant),
                        'tags': frontmatter.get('tags', []),
                        'url': f"{quadrant}/{ring}/{md_file.stem}.html"
                    }
                    
                    # Extract description (first paragraph after frontmatter)
                    desc_match = re.search(r'---\s*\n.*?\n---\s*\n.*?\n##\s*Description\s*\n\n(.*?)(?:\n\n|\n##)', 
                                          content, re.DOTALL)
                    if desc_match:
                        tech['description'] = desc_match.group(1).strip()
                    else:
                        tech['description'] = ''
                    
                    technologies.append(tech)
                    
                except Exception as e:
                    print(f"Error processing {md_file}: {e}")
    
    return technologies


def map_quadrant_to_number(quadrant: str) -> int:
    """Map quadrant name to number (0-3) for D3 visualization."""
    mapping = {
        'techniques': 0,
        'tools': 1,
        'platforms': 2,
        'languages-frameworks': 3
    }
    return mapping.get(quadrant, 0)


def map_ring_to_number(ring: str) -> int:
    """Map ring name to number (0-3) for D3 visualization."""
    mapping = {
        'adopt': 0,
        'trial': 1,
        'assess': 2,
        'hold': 3
    }
    return mapping.get(ring, 0)


def generate_radar_data(technologies: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Generate the radar data structure for D3 visualization."""
    
    # Transform technologies for radar visualization
    radar_data = []
    for tech in technologies:
        radar_data.append({
            'name': tech['name'],
            'quadrant': map_quadrant_to_number(tech['quadrant']),
            'ring': map_ring_to_number(tech['ring']),
            'tags': tech['tags'],
            'description': tech['description'],
            'url': tech['url']
        })
    
    return {
        'technologies': radar_data,
        'quadrants': [
            {'name': 'Techniques', 'id': 0},
            {'name': 'Tools', 'id': 1},
            {'name': 'Platforms', 'id': 2},
            {'name': 'Languages & Frameworks', 'id': 3}
        ],
        'rings': [
            {'name': 'Adopt', 'id': 0, 'color': '#93c47d'},
            {'name': 'Trial', 'id': 1, 'color': '#93d2f3'},
            {'name': 'Assess', 'id': 2, 'color': '#fbdb84'},
            {'name': 'Hold', 'id': 3, 'color': '#efafa9'}
        ]
    }


def write_javascript_data(radar_data: Dict[str, Any], output_file: Path):
    """Write radar data as a JavaScript file."""
    js_content = f"""// Auto-generated radar data
// Generated from markdown files in docs/

const radarData = {json.dumps(radar_data, indent=2)};

// Make it available globally
if (typeof window !== 'undefined') {{
    window.radarData = radarData;
}}
"""
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"✅ Generated radar data: {output_file}")
    print(f"   Found {len(radar_data['technologies'])} technologies")


def main():
    """Main function."""
    # Get the project root directory
    script_dir = Path(__file__).parent
    docs_dir = script_dir / 'docs'
    output_file = docs_dir / 'javascripts' / 'radar-data.js'
    
    # Ensure output directory exists
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    print("🔍 Scanning for technology markdown files...")
    technologies = scan_technologies(docs_dir)
    
    if not technologies:
        print("⚠️  No technologies found. Make sure markdown files have proper frontmatter.")
        return
    
    print(f"📊 Processing {len(technologies)} technologies...")
    radar_data = generate_radar_data(technologies)
    
    print("💾 Writing JavaScript data file...")
    write_javascript_data(radar_data, output_file)
    
    # Print summary
    print("\n📈 Summary by Quadrant and Ring:")
    for quadrant in ['techniques', 'tools', 'platforms', 'languages-frameworks']:
        techs = [t for t in technologies if t['quadrant'] == quadrant]
        if techs:
            print(f"\n  {quadrant.upper()}:")
            for ring in ['adopt', 'trial', 'assess', 'hold']:
                count = len([t for t in techs if t['ring'] == ring])
                if count > 0:
                    print(f"    {ring}: {count}")
    
    print("\n✨ Done! Run 'mkdocs serve' to view the radar.")


if __name__ == '__main__':
    main()

