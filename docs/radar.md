# Interactive Tech Radar

<div id="radar-main-layout">
    <div id="radar-container">
        <div id="radar-loading">
            <div style="font-size: 2rem; margin-bottom: 1rem;">⚡</div>
            Loading Tech Radar...
        </div>
        <svg id="radar"></svg>
    </div>

    <div id="radar-legend-enhanced"></div>
</div>

<div id="radar-details">
    <h2>Technology Details</h2>
    <div id="detail-content">
        <p style="color: #999; text-align: center; padding: 3rem 0;">
            👆 Click on any technology in the radar above to see detailed information
        </p>
    </div>
</div>

## How to Use the Radar

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin: 3rem 0;">
    <div style="padding: 2rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
        <div style="font-size: 2rem; margin-bottom: 1rem;">🎯</div>
        <h3 style="margin-top: 0;">Explore the Radar</h3>
        <p>Hover over any dot (blip) on the radar to see the technology name and its current ring.</p>
    </div>
    
    <div style="padding: 2rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
        <div style="font-size: 2rem; margin-bottom: 1rem;">👆</div>
        <h3 style="margin-top: 0;">View Details</h3>
        <p>Click on any blip or legend item to see detailed information about the technology below.</p>
    </div>
    
    <div style="padding: 2rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
        <div style="font-size: 2rem; margin-bottom: 1rem;">📚</div>
        <h3 style="margin-top: 0;">Learn More</h3>
        <p>Click "View full details" to read complete documentation about each technology.</p>
    </div>
    
    <div style="padding: 2rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
        <div style="font-size: 2rem; margin-bottom: 1rem;">📊</div>
        <h3 style="margin-top: 0;">Browse by Quadrant</h3>
        <p>Use the legend below the radar to browse technologies organized by quadrant and ring.</p>
    </div>
</div>

## Understanding the Rings

<div style="margin: 3rem 0;">
    <div style="display: grid; gap: 1.5rem;">
        <div style="display: flex; align-items: start; gap: 1.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0f9e8 0%, #ffffff 100%); border-radius: 12px; border-left: 4px solid #5BA300;">
            <div style="font-size: 2.5rem; flex-shrink: 0;">✅</div>
            <div>
                <h3 style="margin: 0 0 0.5rem 0; color: #5BA300;">Adopt</h3>
                <p style="margin: 0; line-height: 1.6;">Technologies we have high confidence in and recommend for widespread use across our teams. These are proven in production.</p>
            </div>
        </div>
        
        <div style="display: flex; align-items: start; gap: 1.5rem; padding: 1.5rem; background: linear-gradient(135deg, #e6f7fb 0%, #ffffff 100%); border-radius: 12px; border-left: 4px solid #009EB0;">
            <div style="font-size: 2.5rem; flex-shrink: 0;">🧪</div>
            <div>
                <h3 style="margin: 0 0 0.5rem 0; color: #009EB0;">Trial</h3>
                <p style="margin: 0; line-height: 1.6;">Technologies that are ready for use but haven't been proven at scale yet. Worth pursuing in projects that can handle the risk.</p>
            </div>
        </div>
        
        <div style="display: flex; align-items: start; gap: 1.5rem; padding: 1.5rem; background: linear-gradient(135deg, #fffbeb 0%, #ffffff 100%); border-radius: 12px; border-left: 4px solid #C7BA00;">
            <div style="font-size: 2.5rem; flex-shrink: 0;">🔍</div>
            <div>
                <h3 style="margin: 0 0 0.5rem 0; color: #C7BA00;">Assess</h3>
                <p style="margin: 0; line-height: 1.6;">Technologies worth exploring to understand their potential impact. We're actively researching and experimenting with these.</p>
            </div>
        </div>
        
        <div style="display: flex; align-items: start; gap: 1.5rem; padding: 1.5rem; background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%); border-radius: 12px; border-left: 4px solid #E09B96;">
            <div style="font-size: 2.5rem; flex-shrink: 0;">⚠️</div>
            <div>
                <h3 style="margin: 0 0 0.5rem 0; color: #E09B96;">Hold</h3>
                <p style="margin: 0; line-height: 1.6;">Technologies we recommend proceeding with caution. Either we've had issues or better alternatives exist.</p>
            </div>
        </div>
    </div>
</div>

## Browse All Technologies

<div style="margin: 3rem 0; padding: 2rem; background: white; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.08);">
    <h3 style="margin-top: 0;">By Quadrant</h3>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
        <a href="../techniques/" style="display: block; padding: 1.5rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); border-radius: 12px; text-decoration: none; color: #8FA227; border: 2px solid transparent; transition: all 0.3s ease;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎯</div>
            <h4 style="margin: 0 0 0.5rem 0; color: #8FA227;">Techniques</h4>
            <p style="margin: 0; color: #666; font-size: 0.9rem;">Methods & practices</p>
        </a>
        
        <a href="../tools/" style="display: block; padding: 1.5rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); border-radius: 12px; text-decoration: none; color: #1EAADF; border: 2px solid transparent; transition: all 0.3s ease;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🛠️</div>
            <h4 style="margin: 0 0 0.5rem 0; color: #1EAADF;">Tools</h4>
            <p style="margin: 0; color: #666; font-size: 0.9rem;">Development tools</p>
        </a>
        
        <a href="../platforms/" style="display: block; padding: 1.5rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); border-radius: 12px; text-decoration: none; color: #F38A3E; border: 2px solid transparent; transition: all 0.3s ease;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">☁️</div>
            <h4 style="margin: 0 0 0.5rem 0; color: #F38A3E;">Platforms</h4>
            <p style="margin: 0; color: #666; font-size: 0.9rem;">Infrastructure & services</p>
        </a>
        
        <a href="../languages-frameworks/" style="display: block; padding: 1.5rem; background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); border-radius: 12px; text-decoration: none; color: #8B4789; border: 2px solid transparent; transition: all 0.3s ease;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">💻</div>
            <h4 style="margin: 0 0 0.5rem 0; color: #8B4789;">Languages & Frameworks</h4>
            <p style="margin: 0; color: #666; font-size: 0.9rem;">Programming languages</p>
        </a>
    </div>
</div>

<style>
    /* Hover effects for quadrant cards */
    a[href*="techniques/"]:hover,
    a[href*="tools/"]:hover,
    a[href*="platforms/"]:hover,
    a[href*="languages-frameworks/"]:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        border-color: currentColor;
    }
</style>
