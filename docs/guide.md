# How to Use the Tech Radar

This guide explains how to add, update, or move technologies in the Tech Radar.

## Understanding the Structure

The Tech Radar is organized into a simple directory structure:

```
docs/
├── techniques/
│   ├── adopt/
│   ├── trial/
│   ├── assess/
│   └── hold/
├── tools/
│   ├── adopt/
│   ├── trial/
│   ├── assess/
│   └── hold/
├── platforms/
│   ├── adopt/
│   ├── trial/
│   ├── assess/
│   └── hold/
└── languages-frameworks/
    ├── adopt/
    ├── trial/
    ├── assess/
    └── hold/
```

## Adding a New Technology

To add a new technology to the radar:

1. **Determine the Quadrant**: Decide which quadrant the technology belongs to:
   - `techniques/` - Development practices, methodologies
   - `tools/` - Development tools, testing frameworks
   - `platforms/` - Infrastructure, cloud services
   - `languages-frameworks/` - Programming languages, frameworks

2. **Determine the Ring**: Decide which ring reflects your assessment:
   - `adopt/` - Proven and recommended for wide use
   - `trial/` - Ready for use in projects that can handle risk
   - `assess/` - Worth exploring and understanding
   - `hold/` - Proceed with caution

3. **Create a Markdown File**: Create a new `.md` file in the appropriate directory.

### Example: Adding React to Languages & Frameworks / Adopt

Create a file: `docs/languages-frameworks/adopt/react.md`

```markdown
---
title: React
ring: adopt
quadrant: languages-frameworks
tags: [frontend, javascript, ui]
---

# React

## Description

React is a JavaScript library for building user interfaces, maintained by Meta and a community of developers. It enables developers to create reusable UI components and manage application state efficiently.

## Why This Ring?

We have adopted React as our primary frontend framework because:

- Strong community support and ecosystem
- Component-based architecture promotes reusability
- Excellent performance with virtual DOM
- Great developer experience with modern tooling
- Wide availability of skilled developers

## Our Experience

We've successfully built multiple production applications using React, including our main customer portal and internal admin tools. The team is highly skilled in React development.

## Recommendations

- Use for all new frontend projects
- Pair with TypeScript for better type safety
- Follow React best practices and hooks patterns
- Consider Next.js for server-side rendering needs

## Related Technologies

- Next.js (Adopt)
- TypeScript (Adopt)
- Redux (Trial)

## Last Updated

November 2025
```

## File Format Requirements

Each technology file must include:

### Frontmatter (Required)

```yaml
---
title: Technology Name
ring: adopt|trial|assess|hold
quadrant: techniques|tools|platforms|languages-frameworks
tags: [tag1, tag2, tag3]
---
```

### Content Sections (Recommended)

1. **Title**: `# Technology Name`
2. **Description**: Brief overview of what it is
3. **Why This Ring?**: Justification for the current placement
4. **Our Experience**: Team's experience with the technology
5. **Recommendations**: Guidance for teams considering this technology
6. **Related Technologies**: Links to related entries
7. **Last Updated**: Date of last update

## Moving a Technology Between Rings

To move a technology to a different ring:

1. **Move the file** from the current ring directory to the new ring directory
2. **Update the frontmatter** - change the `ring` field to match the new directory
3. **Update the content** - explain why the technology is moving
4. **Commit with a clear message** - e.g., "Move React from Trial to Adopt"

### Example: Moving a Technology

Moving `kubernetes.md` from `assess` to `trial`:

```bash
# Move the file
mv docs/platforms/assess/kubernetes.md docs/platforms/trial/kubernetes.md

# Update the frontmatter in the file
# Change: ring: assess
# To: ring: trial

# Add explanation in the file about why it's moving
```

## Best Practices

### Writing Good Descriptions

- **Be Clear**: Explain what the technology is in simple terms
- **Be Specific**: Include concrete examples from our projects
- **Be Honest**: Share both successes and challenges
- **Be Helpful**: Provide actionable recommendations

### Choosing the Right Ring

- **Adopt**: We've used it successfully in production, we recommend it
- **Trial**: We're actively using it, but need more experience
- **Assess**: We're exploring it, initial results are promising
- **Hold**: We recommend avoiding it or planning to phase it out

### Keeping It Updated

- Review technologies quarterly
- Update when team's experience changes
- Update when technology landscape changes
- Archive obsolete technologies with explanation

## Workflow

### For Individual Contributors

1. Create/update a markdown file
2. Create a pull request
3. Get team review and feedback
4. Merge after approval

### For Tech Leads

1. Review entries quarterly
2. Facilitate discussions on moving technologies
3. Ensure consistent quality and format
4. Keep the radar aligned with organizational strategy

## Tips for Success

- **Start Small**: Don't try to document everything at once
- **Focus on What Matters**: Document technologies actively used or being evaluated
- **Collaborate**: Get input from multiple team members
- **Be Consistent**: Follow the format and structure
- **Keep It Simple**: Markdown is powerful in its simplicity

## Questions?

If you have questions about where a technology should be placed or how to document it, reach out to your tech lead or start a discussion in the team channel.

---

**Remember**: The Tech Radar is a living document. It's more important to keep it updated and relevant than to make it perfect.

