# Welcome to Bazaar Tech Radar

<div style="font-size: 1.25rem; color: #4a5568; margin-bottom: 3rem; line-height: 1.8; max-width: 900px;">
The Bazaar Tech Radar is a living document that inspires and supports engineering teams to make informed technology decisions. It's a platform to share knowledge, experiences, and insights about the technologies we use, evaluate, and recommend.
</div>

## What is a Tech Radar?

The Tech Radar is a visual document that shows the current technology landscape for our organization. It's based on the pioneering work by ThoughtWorks and consists of:

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin: 3rem 0;">
    <div style="padding: 2rem; background: linear-gradient(135deg, #f4f7f3 0%, #ffffff 100%); border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border-left: 4px solid #8FA227;">
        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🎯</div>
        <h3 style="margin: 0 0 0.75rem 0; color: #8FA227;">Techniques</h3>
        <p style="margin: 0; line-height: 1.6; font-size: 0.95rem;">Methods, practices, and approaches to software development</p>
    </div>
    
    <div style="padding: 2rem; background: linear-gradient(135deg, #e6f5fb 0%, #ffffff 100%); border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border-left: 4px solid #1EAADF;">
        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🛠️</div>
        <h3 style="margin: 0 0 0.75rem 0; color: #1EAADF;">Tools</h3>
        <p style="margin: 0; line-height: 1.6; font-size: 0.95rem;">Software development tools, testing frameworks, and utilities</p>
    </div>
    
    <div style="padding: 2rem; background: linear-gradient(135deg, #fef5ed 0%, #ffffff 100%); border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border-left: 4px solid #F38A3E;">
        <div style="font-size: 2.5rem; margin-bottom: 1rem;">☁️</div>
        <h3 style="margin: 0 0 0.75rem 0; color: #F38A3E;">Platforms</h3>
        <p style="margin: 0; line-height: 1.6; font-size: 0.95rem;">Infrastructure, cloud services, and runtime environments</p>
    </div>
    
    <div style="padding: 2rem; background: linear-gradient(135deg, #f5f0f4 0%, #ffffff 100%); border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border-left: 4px solid #8B4789;">
        <div style="font-size: 2.5rem; margin-bottom: 1rem;">💻</div>
        <h3 style="margin: 0 0 0.75rem 0; color: #8B4789;">Languages & Frameworks</h3>
        <p style="margin: 0; line-height: 1.6; font-size: 0.95rem;">Programming languages and application frameworks</p>
    </div>
</div>

### Four Rings

<div style="display: grid; gap: 1.5rem; margin: 2rem 0 3rem 0;">
    <div style="display: flex; align-items: start; gap: 1.5rem; padding: 1.75rem; background: linear-gradient(135deg, #f0f9e8 0%, #ffffff 100%); border-radius: 12px; border-left: 4px solid #5BA300; box-shadow: 0 2px 12px rgba(0,0,0,0.05);">
        <div style="font-size: 2.5rem; flex-shrink: 0;">✅</div>
        <div>
            <h4 style="margin: 0 0 0.625rem 0; color: #5BA300; font-size: 1.3rem;">Adopt</h4>
            <p style="margin: 0; line-height: 1.7;">Technologies we have high confidence in and recommend for widespread use across our teams. Proven in production.</p>
        </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1.5rem; padding: 1.75rem; background: linear-gradient(135deg, #e6f7fb 0%, #ffffff 100%); border-radius: 12px; border-left: 4px solid #009EB0; box-shadow: 0 2px 12px rgba(0,0,0,0.05);">
        <div style="font-size: 2.5rem; flex-shrink: 0;">🧪</div>
        <div>
            <h4 style="margin: 0 0 0.625rem 0; color: #009EB0; font-size: 1.3rem;">Trial</h4>
            <p style="margin: 0; line-height: 1.7;">Technologies ready for use but haven't been proven at scale yet. Worth pursuing in projects that can handle the risk.</p>
        </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1.5rem; padding: 1.75rem; background: linear-gradient(135deg, #fffbeb 0%, #ffffff 100%); border-radius: 12px; border-left: 4px solid #C7BA00; box-shadow: 0 2px 12px rgba(0,0,0,0.05);">
        <div style="font-size: 2.5rem; flex-shrink: 0;">🔍</div>
        <div>
            <h4 style="margin: 0 0 0.625rem 0; color: #C7BA00; font-size: 1.3rem;">Assess</h4>
            <p style="margin: 0; line-height: 1.7;">Technologies worth exploring to understand their potential impact. Actively researching and experimenting.</p>
        </div>
    </div>
    
    <div style="display: flex; align-items: start; gap: 1.5rem; padding: 1.75rem; background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%); border-radius: 12px; border-left: 4px solid #E09B96; box-shadow: 0 2px 12px rgba(0,0,0,0.05);">
        <div style="font-size: 2.5rem; flex-shrink: 0;">⚠️</div>
        <div>
            <h4 style="margin: 0 0 0.625rem 0; color: #E09B96; font-size: 1.3rem;">Hold</h4>
            <p style="margin: 0; line-height: 1.7;">Technologies we recommend proceeding with caution. Either we've had issues or better alternatives exist.</p>
        </div>
    </div>
</div>

## Interactive Tech Radar

<div style="text-align: center; margin: 2rem 0;">
    <a href="radar/" class="md-button md-button--primary" style="font-size: 1.1rem; padding: 0.8rem 2rem;">
        View Full Interactive Radar →
    </a>
</div>

## Quick Start

1. **View the Radar**: Check out our [interactive Tech Radar](radar.md) with full details
2. **Browse Technologies**: Explore technologies by quadrant in the navigation menu
3. **Learn How to Contribute**: Read the [guide](guide.md) on how to add or update technologies

## How We Use It

The Tech Radar reflects our collective technology strategy and helps teams make informed decisions about:

- Which technologies to adopt for new projects
- Which technologies to invest time in learning
- Which technologies to phase out or avoid

The radar is a living document that evolves as we gain experience and as the technology landscape changes.

## Current Status

| Quadrant | Adopt | Trial | Assess | Hold |
|----------|-------|-------|--------|------|
| **Techniques** | 1 | 0 | 0 | 0 |
| **Tools** | 1 | 0 | 0 | 0 |
| **Platforms** | 1 | 0 | 1 | 0 |
| **Languages & Frameworks** | 2 | 1 | 0 | 0 |

**Total Technologies**: 7

---

**Last Updated**: November 2025

