# Deployment Guide - GitHub Pages

This guide explains how to deploy the Bazaar Tech Radar to GitHub Pages.

## Prerequisites

- Git repository hosted on GitHub
- MkDocs installed (`pip install -r requirements.txt`)
- Write access to the repository

## Method 1: Using MkDocs Built-in Deployment (Recommended)

This is the simplest method and handles everything automatically.

### Steps

1. **Generate the radar data**
   ```bash
   python3 generate_radar_data.py
   ```

2. **Deploy to GitHub Pages**
   ```bash
   mkdocs gh-deploy
   ```

   This command will:
   - Build the static site
   - Create/update the `gh-pages` branch
   - Push the built site to GitHub

3. **Configure GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Source", select:
     - Branch: `gh-pages`
     - Folder: `/ (root)`
   - Click **Save**

4. **Access your site**
   Your site will be available at:
   ```
   https://[username].github.io/[repository-name]/
   ```

## Method 2: Manual Build and Commit

If you prefer more control over the deployment process:

### Steps

1. **Generate radar data**
   ```bash
   python3 generate_radar_data.py
   ```

2. **Build the site**
   ```bash
   mkdocs build
   ```

   This creates a `site/` directory with the static files.

3. **Review the build**
   ```bash
   ls -la site/
   ```

4. **Deploy using gh-pages tool**
   ```bash
   # Install ghp-import if not already installed
   pip install ghp-import

   # Deploy
   ghp-import -p -f site/
   ```

5. **Configure GitHub Pages** (same as Method 1, step 3)

## Method 3: GitHub Actions (Automated Deployment)

For automatic deployment on every push to main branch.

### Setup

1. **Create workflow file**
   
   Create `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy Tech Radar
   
   on:
     push:
       branches:
         - main
     workflow_dispatch:
   
   permissions:
     contents: write
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         
         - uses: actions/setup-python@v4
           with:
             python-version: 3.x
         
         - name: Install dependencies
           run: |
             pip install -r requirements.txt
         
         - name: Generate radar data
           run: python3 generate_radar_data.py
         
         - name: Deploy to GitHub Pages
           run: mkdocs gh-deploy --force
   ```

2. **Commit and push**
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Actions deployment workflow"
   git push
   ```

3. **Configure GitHub Pages**
   - Go to **Settings** → **Pages**
   - Source: `gh-pages` branch

4. **Automatic deployments**
   - Every push to `main` will trigger a deployment
   - Check **Actions** tab for deployment status

## Custom Domain

To use a custom domain:

1. **Add CNAME file**
   
   Create `docs/CNAME`:
   ```
   radar.yourdomain.com
   ```

2. **Configure DNS**
   
   Add a CNAME record:
   ```
   radar.yourdomain.com  →  [username].github.io
   ```

3. **Update GitHub Settings**
   - Go to **Settings** → **Pages**
   - Enter your custom domain
   - Enable "Enforce HTTPS"

4. **Deploy**
   ```bash
   mkdocs gh-deploy
   ```

## Troubleshooting

### Issue: 404 Page Not Found

**Solution:**
- Verify GitHub Pages is enabled
- Check that `gh-pages` branch exists
- Ensure `site_url` in `mkdocs.yml` is correct
- Wait a few minutes for GitHub to process the deployment

### Issue: CSS/JS Not Loading

**Solution:**
- Check `site_url` in `mkdocs.yml`
- If using a custom domain, ensure it's configured correctly
- Clear browser cache
- Check browser console for errors

### Issue: Radar Not Displaying

**Solution:**
1. Verify `radar-data.js` was generated:
   ```bash
   cat docs/javascripts/radar-data.js
   ```

2. Re-generate data before deployment:
   ```bash
   python3 generate_radar_data.py
   mkdocs gh-deploy
   ```

3. Check browser console for JavaScript errors

### Issue: Deployment Permission Denied

**Solution:**
- Ensure you have write access to the repository
- Check GitHub token permissions
- For GitHub Actions, verify workflow permissions in repo settings

### Issue: Old Content Still Showing

**Solution:**
1. Clear browser cache (hard refresh: Cmd+Shift+R / Ctrl+Shift+R)
2. Try incognito/private browsing mode
3. Check the actual `gh-pages` branch to verify content updated
4. Wait a few minutes for CDN cache to clear

## Verification Checklist

After deployment, verify:

- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Interactive radar displays
- [ ] Technologies are plotted correctly
- [ ] Clicking on blips shows details
- [ ] Individual technology pages load
- [ ] Search functionality works
- [ ] All images and assets load
- [ ] Mobile view is responsive

## Continuous Deployment Workflow

### For Teams

1. **Developer makes changes**
   - Create feature branch
   - Add/update technology markdown
   - Run `python3 generate_radar_data.py`
   - Test locally with `mkdocs serve`
   - Commit and push

2. **Code review**
   - Create pull request
   - Team reviews changes
   - Merge to main

3. **Automatic deployment**
   - GitHub Actions deploys (if configured)
   - OR manually run `mkdocs gh-deploy`

4. **Verification**
   - Check live site
   - Verify changes are visible

## Rollback

If you need to rollback to a previous version:

```bash
# List gh-pages commits
git log origin/gh-pages

# Reset to a specific commit
git checkout gh-pages
git reset --hard <commit-hash>
git push origin gh-pages --force
```

## Monitoring

### Check Deployment Status

GitHub provides deployment status:
- Go to repository
- Click **Environments** → **github-pages**
- View deployment history

### Analytics (Optional)

Add Google Analytics to `mkdocs.yml`:

```yaml
extra:
  analytics:
    provider: google
    property: G-XXXXXXXXXX
```

## Best Practices

1. **Always generate data before deploying**
   ```bash
   python3 generate_radar_data.py
   ```

2. **Test locally first**
   ```bash
   mkdocs serve
   ```

3. **Use version control**
   - Commit `radar-data.js` to track changes
   - Or add to `.gitignore` and generate during deployment

4. **Document changes**
   - Update technology markdown files
   - Include "Last Updated" dates
   - Use clear commit messages

5. **Regular updates**
   - Review quarterly
   - Keep technology assessments current
   - Archive obsolete technologies

## Security

- Never commit secrets or API keys
- Review all content before deploying
- Keep dependencies updated
- Monitor repository access

## Support

For deployment issues:
1. Check GitHub Actions logs (if using)
2. Review MkDocs build output
3. Check GitHub Pages settings
4. Open an issue in the repository

---

**Deployment made simple! 🚀**

