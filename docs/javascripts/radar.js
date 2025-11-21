/**
 * Tech Radar Visualization using D3.js
 * Professional ThoughtWorks-style implementation
 */

(function() {
    'use strict';

    // Enhanced Configuration
    const config = {
        svg_id: "radar",
        width: 1400,
        height: 1000,
        colors: {
            background: "#fff",
            grid: "#ddd",
            inactive: "#ddd"
        },
        quadrants: [
            { name: "Techniques", color: "#8FA227" },
            { name: "Tools", color: "#1EAADF" },
            { name: "Platforms", color: "#F38A3E" },
            { name: "Languages & Frameworks", color: "#8B4789" }
        ],
        rings: [
            { name: "Adopt", radius: 0.20, color: "#5BA300" },
            { name: "Trial", radius: 0.40, color: "#009EB0" },
            { name: "Assess", radius: 0.65, color: "#C7BA00" },
            { name: "Hold", radius: 0.90, color: "#E09B96" }
        ],
        print_layout: true,
        zoomed_quadrant: 0,
        // Animation settings
        animation_duration: 1000,
        blip_size: 10
    };

    let svg, radar, legend_items = [];

    function renderRadar() {
        // Wait for radar data
        if (typeof window.radarData === 'undefined') {
            setTimeout(renderRadar, 100);
            return;
        }

        const data = window.radarData;
        
        // Hide loading
        const loadingDiv = document.getElementById('radar-loading');
        if (loadingDiv) loadingDiv.style.display = 'none';

        // Clear existing
        d3.select('#radar').selectAll('*').remove();
        
        // Setup SVG
        svg = d3.select("#radar")
            .attr("width", config.width)
            .attr("height", config.height);

        const radarContainer = svg.append("g")
            .attr("transform", `translate(${config.width / 2}, ${config.height / 2})`);

        const radius = Math.min(config.width, config.height) / 2 - 100;

        // Add subtle gradient background
        const defs = svg.append("defs");
        const gradient = defs.append("radialGradient")
            .attr("id", "radar-gradient");
        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#f8f9fa");
        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#ffffff");

        radarContainer.append("circle")
            .attr("r", radius)
            .attr("fill", "url(#radar-gradient)");

        // Draw rings with better styling
        const rings = radarContainer.append("g").attr("class", "rings");
        
        config.rings.forEach((ring, i) => {
            const ringRadius = ring.radius * radius;
            
            // Ring circle
            rings.append("circle")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", ringRadius)
                .attr("fill", "none")
                .attr("stroke", "#ddd")
                .attr("stroke-width", 1.5)
                .style("opacity", 0)
                .transition()
                .duration(config.animation_duration)
                .delay(i * 100)
                .style("opacity", 1);

            // Ring background with subtle color
            rings.append("circle")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", ringRadius)
                .attr("fill", ring.color)
                .attr("opacity", 0.03);
        });

        // Draw quadrant lines with better styling
        const quadrantLines = radarContainer.append("g").attr("class", "quadrant-lines");
        [0, 90, 180, 270].forEach((angle, i) => {
            const rad = angle * Math.PI / 180;
            quadrantLines.append("line")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", Math.cos(rad) * radius)
                .attr("y2", Math.sin(rad) * radius)
                .attr("stroke", "#ccc")
                .attr("stroke-width", 2)
                .style("opacity", 0)
                .transition()
                .duration(config.animation_duration)
                .delay(i * 100)
                .style("opacity", 1);
        });

        // Add ring labels with better positioning
        config.rings.forEach((ring, i) => {
            if (i < config.rings.length - 1) {
                const ringRadius = ring.radius * radius;
                rings.append("text")
                    .attr("x", 10)
                    .attr("y", -ringRadius + 20)
                    .attr("text-anchor", "start")
                    .attr("font-size", "14px")
                    .attr("font-weight", "600")
                    .attr("fill", ring.color)
                    .style("opacity", 0)
                    .text(ring.name.toUpperCase())
                    .transition()
                    .duration(config.animation_duration)
                    .delay(500 + i * 100)
                    .style("opacity", 1);
            }
        });

        // Add quadrant labels with better styling
        const quadrantLabels = radarContainer.append("g").attr("class", "quadrant-labels");
        config.quadrants.forEach((quadrant, i) => {
            const angle = (i * Math.PI / 2) + Math.PI / 4;
            const labelRadius = radius * 0.8;
            const x = Math.cos(angle) * labelRadius;
            const y = Math.sin(angle) * labelRadius;

            quadrantLabels.append("text")
                .attr("x", x)
                .attr("y", y)
                .attr("text-anchor", "middle")
                .attr("font-size", "20px")
                .attr("font-weight", "700")
                .attr("fill", quadrant.color)
                .attr("opacity", 0)
                .text(quadrant.name.toUpperCase())
                .transition()
                .duration(config.animation_duration)
                .delay(700 + i * 100)
                .attr("opacity", 0.9);
        });

        // Plot blips with enhanced visuals
        const blips = data.technologies.map(tech => {
            const quadrant = config.quadrants[tech.quadrant];
            const ring = config.rings[tech.ring];
            
            // Calculate position
            const angle = (tech.quadrant * Math.PI / 2) + (Math.random() * Math.PI / 2 * 0.8) + (Math.PI / 2 * 0.1);
            const prevRingRadius = tech.ring > 0 ? config.rings[tech.ring - 1].radius * radius : 0;
            const currentRingRadius = ring.radius * radius;
            const r = prevRingRadius + (Math.random() * (currentRingRadius - prevRingRadius - 30)) + 15;
            
            return {
                ...tech,
                x: Math.cos(angle) * r,
                y: Math.sin(angle) * r,
                color: quadrant.color,
                ringColor: ring.color
            };
        });

        const blipGroup = radarContainer.append("g").attr("class", "blips");

        // Create blip groups
        const blipElements = blipGroup.selectAll("g")
            .data(blips)
            .enter()
            .append("g")
            .attr("class", "blip")
            .attr("transform", d => `translate(${d.x},${d.y})`)
            .style("cursor", "pointer")
            .style("opacity", 0);

        // Blip outer circle (glow effect)
        blipElements.append("circle")
            .attr("r", 0)
            .attr("fill", d => d.color)
            .attr("opacity", 0.2)
            .transition()
            .duration(config.animation_duration)
            .delay((d, i) => 1000 + i * 50)
            .attr("r", config.blip_size + 4);

        // Blip main circle
        blipElements.append("circle")
            .attr("class", "blip-circle")
            .attr("r", 0)
            .attr("fill", d => d.color)
            .attr("stroke", "#fff")
            .attr("stroke-width", 2.5)
            .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.2))")
            .transition()
            .duration(config.animation_duration)
            .delay((d, i) => 1000 + i * 50)
            .attr("r", config.blip_size);

        // Add number labels on blips
        blipElements.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("font-size", "11px")
            .attr("font-weight", "700")
            .attr("fill", "#fff")
            .style("pointer-events", "none")
            .style("opacity", 0)
            .text((d, i) => i + 1)
            .transition()
            .duration(config.animation_duration)
            .delay((d, i) => 1200 + i * 50)
            .style("opacity", 1);

        // Show blip groups
        blipElements
            .transition()
            .duration(config.animation_duration)
            .delay((d, i) => 1000 + i * 50)
            .style("opacity", 1);

        // Interaction handlers
        blipElements
            .on("mouseover", function(event, d) {
                d3.select(this).select(".blip-circle")
                    .transition()
                    .duration(200)
                    .attr("r", config.blip_size + 4)
                    .style("filter", "drop-shadow(0 4px 12px rgba(0,0,0,0.3))");
                
                showTooltip(event, d);
            })
            .on("mouseout", function(event, d) {
                d3.select(this).select(".blip-circle")
                    .transition()
                    .duration(200)
                    .attr("r", config.blip_size)
                    .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.2))");
                
                hideTooltip();
            })
            .on("click", function(event, d) {
                showBlipDetails(d);
                
                // Highlight selected
                blipGroup.selectAll(".blip-circle")
                    .transition()
                    .duration(200)
                    .attr("stroke-width", 2.5);
                
                d3.select(this).select(".blip-circle")
                    .transition()
                    .duration(200)
                    .attr("stroke-width", 4);
            });

        // Create enhanced legend
        createLegend(blips);

        console.log(`✅ Rendered ${data.technologies.length} technologies`);
    }

    function createLegend(blips) {
        const legendContainer = d3.select("#radar-legend-enhanced");
        if (!legendContainer.node()) return;

        legendContainer.selectAll("*").remove();

        // Group by quadrant
        const byQuadrant = d3.group(blips, d => d.quadrant);

        byQuadrant.forEach((techs, quadrantId) => {
            const quadrant = config.quadrants[quadrantId];
            
            const section = legendContainer.append("div")
                .attr("class", "legend-quadrant");

            section.append("h3")
                .style("color", quadrant.color)
                .style("border-left", `4px solid ${quadrant.color}`)
                .style("padding-left", "12px")
                .style("margin-bottom", "16px")
                .text(quadrant.name);

            const list = section.append("div")
                .attr("class", "legend-list");

            techs.forEach((tech, i) => {
                const item = list.append("div")
                    .attr("class", "legend-item")
                    .style("cursor", "pointer")
                    .on("click", () => showBlipDetails(tech))
                    .on("mouseover", function() {
                        d3.select(this).style("background-color", "#f8f9fa");
                    })
                    .on("mouseout", function() {
                        d3.select(this).style("background-color", "transparent");
                    });

                item.append("span")
                    .attr("class", "legend-number")
                    .style("background-color", quadrant.color)
                    .text(blips.indexOf(tech) + 1);

                item.append("span")
                    .attr("class", "legend-name")
                    .text(tech.name);

                item.append("span")
                    .attr("class", "legend-ring")
                    .style("color", tech.ringColor)
                    .text(config.rings[tech.ring].name);
            });
        });
    }

    function showTooltip(event, d) {
        let tooltip = d3.select("body").select(".radar-tooltip");
        if (tooltip.empty()) {
            tooltip = d3.select("body").append("div")
                .attr("class", "radar-tooltip")
                .style("position", "absolute")
                .style("background", "rgba(0, 0, 0, 0.9)")
                .style("color", "#fff")
                .style("padding", "12px 16px")
                .style("border-radius", "8px")
                .style("font-size", "14px")
                .style("pointer-events", "none")
                .style("z-index", "10000")
                .style("box-shadow", "0 4px 12px rgba(0,0,0,0.3)")
                .style("max-width", "300px");
        }

        tooltip.html(`
            <div style="font-weight: 700; font-size: 16px; margin-bottom: 4px;">${d.name}</div>
            <div style="opacity: 0.8;">${config.rings[d.ring].name}</div>
        `)
        .style("display", "block")
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 15) + "px");
    }

    function hideTooltip() {
        d3.select(".radar-tooltip").style("display", "none");
    }

    function showBlipDetails(tech) {
        const detailDiv = document.getElementById('detail-content');
        if (!detailDiv) return;

        const ringName = config.rings[tech.ring].name;
        const quadrantName = config.quadrants[tech.quadrant].name;

        let tagsHtml = '';
        if (tech.tags && tech.tags.length > 0) {
            tagsHtml = tech.tags.map(tag => 
                `<span class="tech-tag">${tag}</span>`
            ).join(' ');
        }

        detailDiv.innerHTML = `
            <div class="tech-detail-card">
                <h3 class="tech-detail-title">${tech.name}</h3>
                <div class="tech-detail-meta">
                    <span class="tech-badge" style="background-color: ${tech.color}">
                        ${quadrantName}
                    </span>
                    <span class="tech-badge ring-badge" style="background-color: ${tech.ringColor}">
                        ${ringName}
                    </span>
                </div>
                ${tagsHtml ? `<div class="tech-tags">${tagsHtml}</div>` : ''}
                ${tech.description ? `<p class="tech-description">${tech.description}</p>` : ''}
                <a href="${tech.url}" class="tech-detail-link">
                    View full details →
                </a>
            </div>
        `;

        detailDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderRadar);
    } else {
        renderRadar();
    }

})();
