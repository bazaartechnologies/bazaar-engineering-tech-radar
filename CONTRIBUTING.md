# Contributing to Bazaar Tech Radar

Thank you for contributing to the Tech Radar! This guide will help you add or update technologies effectively.

## Quick Contribution Guide

### Adding a New Technology

1. **Choose the right location**
   - Quadrant: `techniques`, `tools`, `platforms`, or `languages-frameworks`
   - Ring: `adopt`, `trial`, `assess`, or `hold`

2. **Create a markdown file**
   ```bash
   # Example: Adding Kafka to Platforms / Trial
   touch docs/platforms/trial/kafka.md
   ```

3. **Use the template**
   
   See the [Template](#template) section below.

4. **Generate data and test**
   ```bash
   python3 generate_radar_data.py
   mkdocs serve
   ```

5. **Submit changes**
   - Create a feature branch
   - Commit your changes
   - Open a pull request

## Template

Use this template for all technology entries:

```markdown
---
title: Technology Name
ring: adopt|trial|assess|hold
quadrant: techniques|tools|platforms|languages-frameworks
tags: [tag1, tag2, tag3]
---

# Technology Name

## Description

Clear, concise description of the technology. What is it? What problem does it solve?

## Why This Ring?

Explain why this technology is in the current ring. Include:
- Key benefits
- Why we chose it
- How it fits our needs

## Our Experience

Share real experiences from the team:
- Which projects use it?
- How long have we used it?
- What successes have we had?
- What challenges did we face?

## Recommendations

Practical guidance for teams:
- When to use this technology
- When NOT to use it
- Best practices we've learned
- Common pitfalls to avoid

## Related Technologies

- [Related Tech 1](../related-tech-1.md)
- [Related Tech 2](../related-tech-2.md)

## Resources

- [Official Documentation](https://example.com)
- [Getting Started Guide](https://example.com)
- Internal Wiki: [Link to internal docs]

## Last Updated

Month Year
```

## Ring Selection Guidelines

### Adopt ✅
**Use when:**
- Proven in production for 6+ months
- Team has strong expertise
- Clear benefits demonstrated
- Recommended for new projects
- Stable and mature

**Example criteria:**
- Multiple production services using it
- 5+ team members proficient
- Documented best practices
- Minimal issues in production

### Trial 🧪
**Use when:**
- Ready for production use
- Team has some expertise
- Initial results are positive
- Worth investing in learning
- Not yet proven at scale

**Example criteria:**
- 1-2 production services using it
- 2-3 team members experienced
- Some patterns established
- Monitoring ongoing

### Assess 🔍
**Use when:**
- Worth exploring
- Potential value identified
- Proof of concept stage
- Learning in progress
- No production use yet

**Example criteria:**
- Research phase
- Experimentation ongoing
- Limited team exposure
- Evaluating fit for our needs

### Hold ⚠️
**Use when:**
- Recommending against use
- Better alternatives exist
- Planning to phase out
- Known significant issues
- Context has changed

**Example criteria:**
- Deprecated technology
- Poor fit for our use case
- Superseded by better options
- Negative production experience

## Writing Guidelines

### Be Clear and Concise
- Use simple language
- Avoid jargon where possible
- Explain acronyms on first use
- Keep paragraphs short

### Be Specific
- Include concrete examples
- Mention actual project names
- Provide real metrics when possible
- Reference specific challenges faced

### Be Honest
- Share both pros and cons
- Mention challenges openly
- Don't oversell technologies
- Acknowledge limitations

### Be Helpful
- Provide actionable recommendations
- Link to resources
- Share lessons learned
- Help others make informed decisions

## Code Examples

When including code examples, keep them:
- **Short** - Focus on key concepts
- **Complete** - Include necessary context
- **Commented** - Explain non-obvious parts
- **Tested** - Ensure code works

Example:

```python
# Good example: Clear and commented
def calculate_total(items):
    """Calculate total price with tax."""
    subtotal = sum(item.price for item in items)
    tax = subtotal * 0.1  # 10% tax
    return subtotal + tax
```

## Tags

Use consistent, lowercase tags:

### Common Tags by Quadrant

**Techniques:**
- `testing`, `ci-cd`, `deployment`, `monitoring`, `security`, `agile`, `devops`

**Tools:**
- `testing`, `development`, `automation`, `monitoring`, `security`, `documentation`

**Platforms:**
- `cloud`, `infrastructure`, `database`, `container`, `orchestration`, `serverless`

**Languages & Frameworks:**
- `frontend`, `backend`, `mobile`, `data-science`, `systems`, `web`, `api`

### Keep Tags Relevant
- Use 2-5 tags per technology
- Be specific but not too granular
- Think about how people will search
- Check existing tags for consistency

## Moving Technologies

When moving a technology to a different ring:

1. **Move the file**
   ```bash
   git mv docs/platforms/assess/tech.md docs/platforms/trial/tech.md
   ```

2. **Update frontmatter**
   ```yaml
   ring: trial  # Update this
   ```

3. **Update content**
   Add a section explaining the move:
   
   ```markdown
   ## Ring Update History
   
   **November 2025: Moved from Assess to Trial**
   
   After 3 months of evaluation and successful deployment in our data 
   pipeline, we're confident to move this to Trial. Key learnings:
   - Performance exceeded expectations
   - Team onboarding was smooth
   - Integration worked well
   ```

4. **Clear commit message**
   ```bash
   git commit -m "Move Kafka from Assess to Trial
   
   After successful POC and deployment in data pipeline project.
   Team now has 3 members trained and ready for wider adoption."
   ```

## Pull Request Guidelines

### Title Format
```
[Quadrant/Ring] Action: Technology Name

Examples:
- [Platforms/Trial] Add: Apache Kafka
- [Tools/Adopt] Update: Docker best practices
- [Languages/Assess] Move from Trial: Rust
```

### Description Template

```markdown
## Summary
Brief description of the change

## Changes
- Added/Updated/Moved X to Y
- Key updates made

## Justification
Why this change is being made

## Checklist
- [ ] Markdown file follows template
- [ ] Frontmatter is correct
- [ ] Generated radar data (`python3 generate_radar_data.py`)
- [ ] Tested locally (`mkdocs serve`)
- [ ] Links work correctly
- [ ] Spelling and grammar checked
```

## Review Process

### For Reviewers
When reviewing PRs:
- ✅ Verify technical accuracy
- ✅ Check ring placement is appropriate
- ✅ Ensure content follows template
- ✅ Confirm frontmatter is correct
- ✅ Test the radar visualization
- ✅ Check links work
- ✅ Verify tags are appropriate

### For Authors
Be responsive to feedback:
- Address comments promptly
- Explain decisions when asked
- Make requested changes
- Test after changes

## Common Mistakes to Avoid

❌ **Don't:**
- Skip the frontmatter
- Use wrong quadrant or ring values
- Forget to regenerate data
- Write overly long descriptions
- Include sensitive information
- Make assumptions without team input

✅ **Do:**
- Follow the template
- Use consistent formatting
- Test your changes
- Keep it concise
- Involve the team
- Document your reasoning

## Questions?

If you're unsure about:
- **Where to place a technology**: Ask in #tech-radar channel
- **Ring selection**: Discuss with tech leads
- **Content**: Request review from someone familiar with the tech

## Recognition

Contributors are recognized in:
- Git commit history
- Pull request discussions
- Team knowledge sharing sessions

Thank you for helping maintain our Tech Radar! 🎯

