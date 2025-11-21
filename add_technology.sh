#!/bin/bash
# Quick script to add a new technology

echo "🎯 Add New Technology to Tech Radar"
echo "===================================="
echo ""

# Get technology name
read -p "Technology name: " tech_name
if [ -z "$tech_name" ]; then
    echo "❌ Error: Technology name is required"
    exit 1
fi

# Convert to filename (lowercase, replace spaces with hyphens)
filename=$(echo "$tech_name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# Get quadrant
echo ""
echo "Select Quadrant:"
echo "  1) Techniques"
echo "  2) Tools"
echo "  3) Platforms"
echo "  4) Languages & Frameworks"
read -p "Enter number (1-4): " quadrant_num

case $quadrant_num in
    1) quadrant="techniques" ;;
    2) quadrant="tools" ;;
    3) quadrant="platforms" ;;
    4) quadrant="languages-frameworks" ;;
    *) echo "❌ Invalid selection"; exit 1 ;;
esac

# Get ring
echo ""
echo "Select Ring:"
echo "  1) Adopt - Proven and recommended"
echo "  2) Trial - Ready for use, needs more experience"
echo "  3) Assess - Worth exploring"
echo "  4) Hold - Proceed with caution"
read -p "Enter number (1-4): " ring_num

case $ring_num in
    1) ring="adopt" ;;
    2) ring="trial" ;;
    3) ring="assess" ;;
    4) ring="hold" ;;
    *) echo "❌ Invalid selection"; exit 1 ;;
esac

# Get tags
echo ""
read -p "Tags (comma-separated, e.g. frontend,javascript,ui): " tags_input
tags=$(echo "$tags_input" | sed 's/,/, /g')

# Create file path
filepath="docs/$quadrant/$ring/$filename.md"

# Check if file already exists
if [ -f "$filepath" ]; then
    echo "⚠️  File already exists: $filepath"
    read -p "Overwrite? (y/n): " confirm
    if [ "$confirm" != "y" ]; then
        echo "❌ Cancelled"
        exit 1
    fi
fi

# Create the file
cat > "$filepath" << EOF
---
title: $tech_name
ring: $ring
quadrant: $quadrant
tags: [$tags]
---

# $tech_name

## Description

[Provide a clear, concise description of what this technology is and what problem it solves]

## Why $ring?

[Explain why this technology is in the $ring ring]

- Key benefit 1
- Key benefit 2
- Why we chose it / Why we're evaluating it

## Our Experience

[Share real experiences from the team]

- Which projects use it?
- How long have we used it?
- What successes have we had?
- What challenges did we face?

## Recommendations

[Practical guidance for teams]

**When to use:**
- Use case 1
- Use case 2

**When NOT to use:**
- Scenario 1
- Scenario 2

**Best practices:**
- Practice 1
- Practice 2

## Related Technologies

- [Related Tech 1](link)
- [Related Tech 2](link)

## Resources

- [Official Documentation](https://example.com)
- [Getting Started Guide](https://example.com)
- Internal Wiki: [Link]

## Last Updated

$(date +"%B %Y")
EOF

echo ""
echo "✅ Created: $filepath"
echo ""
echo "📝 Next steps:"
echo "   1. Edit the file and fill in the details"
echo "   2. Run: make data"
echo "   3. View at: http://127.0.0.1:8000/$quadrant/$ring/$filename/"
echo ""
echo "💡 Tip: Open the file in your editor now:"
echo "   $filepath"

