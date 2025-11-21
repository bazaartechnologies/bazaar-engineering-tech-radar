# Bazaar Tech Radar

A ThoughtWorks-style Technology Radar built with MkDocs and D3.js, designed for easy maintenance through simple Markdown files.

## 🎯 What is a Tech Radar?

A Tech Radar is a visual document that shows the current technology landscape for your organization. It helps teams make informed decisions about which technologies to adopt, trial, assess, or avoid.

### Structure

**Four Quadrants:**
- **Techniques** - Development practices, methodologies, and approaches
- **Tools** - Development tools, testing frameworks, and utilities
- **Platforms** - Infrastructure, cloud services, and runtime environments
- **Languages & Frameworks** - Programming languages and application frameworks

**Four Rings:**
- **Adopt** - Technologies we have high confidence in and recommend for widespread use
- **Trial** - Technologies ready for use but haven't been proven at scale yet
- **Assess** - Technologies worth exploring to understand their potential impact
- **Hold** - Technologies we recommend proceeding with caution or avoiding

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Clone or navigate to this repository**
   ```bash
   cd bazaar-tech-radar
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Generate radar data**
   ```bash
   python generate_radar_data.py
   ```

4. **Start the development server**
   ```bash
   mkdocs serve
   ```

5. **Open your browser**
   Navigate to [http://127.0.0.1:8000](http://127.0.0.1:8000)

## 📝 Adding Technologies

### Step 1: Choose Location

Determine the appropriate quadrant and ring:

```
docs/
├── techniques/
├── tools/
├── platforms/
└── languages-frameworks/
    ├── adopt/
    ├── trial/
    ├── assess/
    └── hold/
```

### Step 2: Create Markdown File

Create a new `.md` file in the appropriate directory:

```bash
# Example: Adding React to Languages & Frameworks / Adopt
touch docs/languages-frameworks/adopt/react.md
```

### Step 3: Write Content

Use this template:

```markdown
---
title: Technology Name
ring: adopt
quadrant: languages-frameworks
tags: [tag1, tag2, tag3]
---

# Technology Name

## Description

Brief overview of what this technology is and what it does.

## Why This Ring?

Explanation of why this technology is in the current ring.

## Our Experience

Share the team's experience with this technology:
- What projects use it?
- What successes have we had?
- What challenges have we faced?

## Recommendations

Guidance for teams considering this technology:
- When to use it
- When not to use it
- Best practices
- Gotchas to watch out for

## Related Technologies

- Link to related tech 1
- Link to related tech 2

## Resources

- [Official Documentation](https://example.com)
- Internal wiki links
- Helpful tutorials

## Last Updated

Month Year
```

### Step 4: Regenerate Radar Data

```bash
python generate_radar_data.py
```

### Step 5: Preview

```bash
mkdocs serve
```

Visit [http://127.0.0.1:8000/radar](http://127.0.0.1:8000/radar) to see your changes.

## 🔄 Moving Technologies

To move a technology to a different ring:

1. **Move the file**
   ```bash
   mv docs/platforms/assess/kubernetes.md docs/platforms/trial/kubernetes.md
   ```

2. **Update the frontmatter**
   Change the `ring` field in the file:
   ```yaml
   ---
   title: Kubernetes
   ring: trial  # Changed from 'assess'
   quadrant: platforms
   tags: [orchestration, containers]
   ---
   ```

3. **Update the content**
   Add a note explaining why the technology is moving

4. **Regenerate radar data**
   ```bash
   python generate_radar_data.py
   ```

## 🌐 Deploying to GitHub Pages

### Option 1: Manual Deployment

```bash
# Build the site
mkdocs build

# Deploy to GitHub Pages
mkdocs gh-deploy
```

This command builds the site and pushes it to the `gh-pages` branch.

### Option 2: GitHub Actions (Future)

You can set up automated deployment using GitHub Actions (configuration not included yet).

### Configure GitHub Pages

1. Go to your repository settings
2. Navigate to **Pages**
3. Set source to `gh-pages` branch
4. Save

Your site will be available at: `https://yourusername.github.io/bazaar-tech-radar/`

## 📁 Project Structure

```
bazaar-tech-radar/
├── docs/                          # Documentation source
│   ├── index.md                   # Homepage
│   ├── radar.md                   # Interactive radar page
│   ├── guide.md                   # How-to guide
│   ├── techniques/                # Techniques quadrant
│   │   ├── index.md
│   │   ├── adopt/
│   │   ├── trial/
│   │   ├── assess/
│   │   └── hold/
│   ├── tools/                     # Tools quadrant
│   │   └── ...
│   ├── platforms/                 # Platforms quadrant
│   │   └── ...
│   ├── languages-frameworks/      # Languages & Frameworks quadrant
│   │   └── ...
│   ├── javascripts/
│   │   ├── radar.js              # D3.js visualization
│   │   └── radar-data.js         # Auto-generated data
│   └── stylesheets/
│       ├── extra.css             # Custom styles
│       └── radar.css             # Radar-specific styles
├── generate_radar_data.py         # Data generator script
├── mkdocs.yml                     # MkDocs configuration
├── requirements.txt               # Python dependencies
├── .gitignore
└── README.md
```

## 🛠️ Development Workflow

### Daily Workflow

1. **Start the dev server**
   ```bash
   mkdocs serve
   ```

2. **Make changes** to markdown files

3. **Regenerate data** (when adding/moving technologies)
   ```bash
   python generate_radar_data.py
   ```

4. **Preview changes** at http://127.0.0.1:8000

### Team Workflow

1. **Create a branch**
   ```bash
   git checkout -b feature/add-graphql
   ```

2. **Add or update technology**
   - Create/edit markdown file
   - Run `python generate_radar_data.py`

3. **Commit changes**
   ```bash
   git add .
   git commit -m "Add GraphQL to Assess ring"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/add-graphql
   ```

5. **Get review and merge**

6. **Deploy** (if using manual deployment)
   ```bash
   mkdocs gh-deploy
   ```

## 🎨 Customization

### Update Site Information

Edit `mkdocs.yml`:

```yaml
site_name: Your Tech Radar
site_description: Your description
repo_url: https://github.com/yourorg/your-radar
```

### Change Colors

Edit `docs/javascripts/radar.js`:

```javascript
const config = {
    colors: {
        techniques: '#8B4789',
        tools: '#1EAADF',
        platforms: '#8FA227',
        'languages-frameworks': '#F38A3E'
    }
};
```

### Modify Radar Layout

Edit `docs/javascripts/radar.js` to adjust:
- Radar size
- Ring proportions
- Label positions
- Blip sizes

## 🐛 Troubleshooting

### Radar doesn't show up

1. Make sure you ran `python generate_radar_data.py`
2. Check browser console for errors
3. Verify `docs/javascripts/radar-data.js` exists and has data

### Technologies not appearing

1. Verify frontmatter format is correct
2. Check that `quadrant` and `ring` values are valid
3. Run the data generator with verbose output

### Styling issues

1. Clear browser cache
2. Check that CSS files are loaded (browser dev tools)
3. Verify file paths in `mkdocs.yml`

## 📚 Resources

### MkDocs
- [MkDocs Documentation](https://www.mkdocs.org/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)

### Tech Radar
- [ThoughtWorks Tech Radar](https://www.thoughtworks.com/radar)
- [Build Your Own Radar](https://github.com/thoughtworks/build-your-own-radar)

### D3.js
- [D3.js Documentation](https://d3js.org/)
- [D3 Gallery](https://observablehq.com/@d3/gallery)

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

### Guidelines

- Follow the markdown template for consistency
- Write clear, descriptive commit messages
- Update documentation if needed
- Ensure the radar builds successfully
- Get review from at least one team member

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by [ThoughtWorks Tech Radar](https://www.thoughtworks.com/radar)
- Built with [MkDocs](https://www.mkdocs.org/) and [Material theme](https://squidfunk.github.io/mkdocs-material/)
- Visualization powered by [D3.js](https://d3js.org/)

## 📞 Support

For questions or issues:
- Open a GitHub issue
- Contact the platform team
- Check the internal wiki

---

**Happy Technology Tracking! 🎯**

