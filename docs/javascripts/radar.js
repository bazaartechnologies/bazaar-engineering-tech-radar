/**
 * Elite Tech Radar Visualization
 * Thoughtfully crafted for perfection
 */

(function() {
    'use strict';

    const config = {
        svg_id: "radar",
        width: 1000,
        height: 1000,
        colors: {
            background: "#fff",
            grid: "#e5e7eb",
            inactive: "#ddd"
        },
        quadrants: [
            { name: "Techniques", shortName: "TECHNIQUES", color: "#8FA227" },
            { name: "Tools", shortName: "TOOLS", color: "#1EAADF" },
            { name: "Platforms", shortName: "PLATFORMS", color: "#F38A3E" },
            { name: "Languages & Frameworks", shortName: "LANGUAGES &\nFRAMEWORKS", color: "#8B4789" }
        ],
        rings: [
            { name: "ADOPT", radius: 0.25, color: "#5BA300" },
            { name: "TRIAL", radius: 0.45, color: "#009EB0" },
            { name: "ASSESS", radius: 0.70, color: "#C7BA00" },
            { name: "HOLD", radius: 0.92, color: "#E09B96" }
        ],
        animation_duration: 700,
        blip_size: 12
    };

    function renderRadar() {
        if (typeof window.radarData === 'undefined') {
            setTimeout(renderRadar, 100);
            return;
        }

        const data = window.radarData;
        const loadingDiv = document.getElementById('radar-loading');
        if (loadingDiv) loadingDiv.style.display = 'none';

        d3.select('#radar').selectAll('*').remove();
        
        const container = document.getElementById('radar-container');
        const containerWidth = container.clientWidth - 80;
        const size = Math.min(containerWidth, 880, window.innerHeight - 120);
        
        const svg = d3.select("#radar")
            .attr("width", size)
            .attr("height", size)
            .attr("viewBox", `0 0 ${size} ${size}`)
            .attr("preserveAspectRatio", "xMidYMid meet");

        const radarContainer = svg.append("g")
            .attr("transform", `translate(${size / 2}, ${size / 2})`);

        const radius = (size / 2) - 90;

        // Elegant gradient background
        const defs = svg.append("defs");
        const gradient = defs.append("radialGradient").attr("id", "radar-gradient");
        gradient.append("stop").attr("offset", "0%").attr("stop-color", "#fafafa");
        gradient.append("stop").attr("offset", "100%").attr("stop-color", "#ffffff");

        radarContainer.append("circle")
            .attr("r", radius)
            .attr("fill", "url(#radar-gradient)");

        // Draw rings with refined styling
        const rings = radarContainer.append("g").attr("class", "rings");
        
        config.rings.forEach((ring, i) => {
            const ringRadius = ring.radius * radius;
            
            // Ring circle
            rings.append("circle")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", ringRadius)
                .attr("fill", "none")
                .attr("stroke", config.colors.grid)
                .attr("stroke-width", 1.5)
                .style("opacity", 0)
                .transition()
                .duration(config.animation_duration)
                .delay(i * 70)
                .style("opacity", 1);

            // Subtle ring background
            rings.append("circle")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", ringRadius)
                .attr("fill", ring.color)
                .attr("opacity", 0.02);
        });

        // Quadrant lines
        const quadrantLines = radarContainer.append("g").attr("class", "quadrant-lines");
        [0, 90, 180, 270].forEach((angle, i) => {
            const rad = angle * Math.PI / 180;
            quadrantLines.append("line")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", Math.cos(rad) * radius)
                .attr("y2", Math.sin(rad) * radius)
                .attr("stroke", config.colors.grid)
                .attr("stroke-width", 1.5)
                .style("opacity", 0)
                .transition()
                .duration(config.animation_duration)
                .delay(i * 70)
                .style("opacity", 1);
        });

        // Ring labels - elegant positioning
        const ringLabels = radarContainer.append("g").attr("class", "ring-labels");
        config.rings.forEach((ring, i) => {
            const ringRadius = ring.radius * radius;
            const labelAngle = Math.PI / 4.5; // Slightly adjusted
            const labelX = Math.cos(labelAngle) * ringRadius * 0.90;
            const labelY = -Math.sin(labelAngle) * ringRadius * 0.90;
            
            ringLabels.append("text")
                .attr("x", labelX)
                .attr("y", labelY)
                .attr("text-anchor", "middle")
                .attr("font-size", "10px")
                .attr("font-weight", "700")
                .attr("fill", ring.color)
                .attr("opacity", 0)
                .text(ring.name)
                .transition()
                .duration(config.animation_duration)
                .delay(350 + i * 70)
                .attr("opacity", 0.8);
        });

        // Quadrant labels - thoughtfully positioned with multi-line support
        const quadrantLabels = radarContainer.append("g").attr("class", "quadrant-labels");
        
        // Position configurations for each quadrant
        const labelPositions = [
            { // Top-right (Techniques)
                x: radius * 0.75,
                y: -radius * 0.75,
                anchor: "middle",
                lines: [config.quadrants[0].shortName]
            },
            { // Top-left (Tools)
                x: -radius * 0.75,
                y: -radius * 0.75,
                anchor: "middle",
                lines: [config.quadrants[1].shortName]
            },
            { // Bottom-left (Platforms)
                x: -radius * 0.75,
                y: radius * 0.75,
                anchor: "middle",
                lines: [config.quadrants[2].shortName]
            },
            { // Bottom-right (Languages & Frameworks)
                x: radius * 0.75,
                y: radius * 0.75,
                anchor: "middle",
                lines: config.quadrants[3].shortName.split('\n')
            }
        ];

        config.quadrants.forEach((quadrant, i) => {
            const pos = labelPositions[i];
            const labelGroup = quadrantLabels.append("g");
            
            pos.lines.forEach((line, lineIndex) => {
                labelGroup.append("text")
                    .attr("x", pos.x)
                    .attr("y", pos.y + (lineIndex * 16))
                    .attr("text-anchor", pos.anchor)
                    .attr("font-size", "13px")
                    .attr("font-weight", "700")
                    .attr("fill", quadrant.color)
                    .attr("opacity", 0)
                    .text(line)
                    .transition()
                    .duration(config.animation_duration)
                    .delay(500 + i * 70)
                    .attr("opacity", 0.85);
            });
        });

        // Plot blips with intelligent distribution
        const blips = data.technologies.map((tech, techIndex) => {
            const quadrant = config.quadrants[tech.quadrant];
            const ring = config.rings[tech.ring];
            
            // Better angle distribution within quadrant
            const quadrantAngle = tech.quadrant * Math.PI / 2;
            const angleSpread = Math.PI / 2 * 0.70; // 70% of quadrant
            const angleOffset = Math.PI / 2 * 0.15; // 15% offset from edges
            const angle = quadrantAngle + angleOffset + (Math.random() * angleSpread);
            
            // Better radial distribution
            const prevRingRadius = tech.ring > 0 ? config.rings[tech.ring - 1].radius * radius : 0;
            const currentRingRadius = ring.radius * radius;
            const ringThickness = currentRingRadius - prevRingRadius;
            const minPadding = 18;
            const maxPadding = ringThickness - 18;
            const r = prevRingRadius + minPadding + (Math.random() * (maxPadding - minPadding));
            
            return {
                ...tech,
                x: Math.cos(angle) * r,
                y: Math.sin(angle) * r,
                color: quadrant.color,
                ringColor: ring.color
            };
        });

        const blipGroup = radarContainer.append("g").attr("class", "blips");

        const blipElements = blipGroup.selectAll("g")
            .data(blips)
            .enter()
            .append("g")
            .attr("class", "blip")
            .attr("transform", d => `translate(${d.x},${d.y})`)
            .style("cursor", "pointer")
            .style("opacity", 0);

        // Outer glow
        blipElements.append("circle")
            .attr("r", 0)
            .attr("fill", d => d.color)
            .attr("opacity", 0.12)
            .transition()
            .duration(config.animation_duration)
            .delay((d, i) => 700 + i * 35)
            .attr("r", config.blip_size + 6);

        // Main blip circle
        blipElements.append("circle")
            .attr("class", "blip-circle")
            .attr("r", 0)
            .attr("fill", d => d.color)
            .attr("stroke", "#fff")
            .attr("stroke-width", 2.5)
            .style("filter", "drop-shadow(0 2px 5px rgba(0,0,0,0.2))")
            .transition()
            .duration(config.animation_duration)
            .delay((d, i) => 700 + i * 35)
            .attr("r", config.blip_size);

        // Number labels
        blipElements.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("font-size", "10px")
            .attr("font-weight", "700")
            .attr("fill", "#fff")
            .style("pointer-events", "none")
            .style("opacity", 0)
            .text((d, i) => i + 1)
            .transition()
            .duration(config.animation_duration)
            .delay((d, i) => 850 + i * 35)
            .style("opacity", 1);

        blipElements
            .transition()
            .duration(config.animation_duration)
            .delay((d, i) => 700 + i * 35)
            .style("opacity", 1);

        // Enhanced interactions
        blipElements
            .on("mouseover", function(event, d) {
                d3.select(this).select(".blip-circle")
                    .transition()
                    .duration(200)
                    .attr("r", config.blip_size + 4)
                    .style("filter", "drop-shadow(0 4px 14px rgba(0,0,0,0.35))");
                
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("transform", "scale(1.1)");
                
                showTooltip(event, d);
            })
            .on("mouseout", function(event, d) {
                d3.select(this).select(".blip-circle")
                    .transition()
                    .duration(200)
                    .attr("r", config.blip_size)
                    .style("filter", "drop-shadow(0 2px 5px rgba(0,0,0,0.2))");
                
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("transform", "scale(1)");
                
                hideTooltip();
            })
            .on("click", function(event, d) {
                showBlipDetails(d);
                blipGroup.selectAll(".blip-circle")
                    .transition()
                    .duration(200)
                    .attr("stroke-width", 2.5);
                d3.select(this).select(".blip-circle")
                    .transition()
                    .duration(200)
                    .attr("stroke-width", 4);
            });

        createLegend(blips);
        console.log(`✅ Rendered ${data.technologies.length} technologies with excellence`);
    }

    function createLegend(blips) {
        const legendContainer = d3.select("#radar-legend-enhanced");
        if (!legendContainer.node()) return;

        legendContainer.selectAll("*").remove();
        const byQuadrant = d3.group(blips, d => d.quadrant);

        byQuadrant.forEach((techs, quadrantId) => {
            const quadrant = config.quadrants[quadrantId];
            const section = legendContainer.append("div").attr("class", "legend-quadrant");

            section.append("h3")
                .style("color", quadrant.color)
                .style("border-left", `4px solid ${quadrant.color}`)
                .style("padding-left", "12px")
                .style("margin-bottom", "12px")
                .style("font-size", "1.05rem")
                .text(quadrant.name);

            const list = section.append("div").attr("class", "legend-list");

            techs.forEach((tech, i) => {
                const item = list.append("div")
                    .attr("class", "legend-item")
                    .style("cursor", "pointer")
                    .on("click", () => showBlipDetails(tech))
                    .on("mouseover", function() {
                        d3.select(this).style("background-color", "#f0f4f8");
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
                .style("background", "rgba(0, 0, 0, 0.92)")
                .style("color", "#fff")
                .style("padding", "10px 14px")
                .style("border-radius", "6px")
                .style("font-size", "13px")
                .style("pointer-events", "none")
                .style("z-index", "10000")
                .style("box-shadow", "0 4px 12px rgba(0,0,0,0.3)")
                .style("max-width", "240px");
        }

        tooltip.html(`
            <div style="font-weight: 700; font-size: 14px; margin-bottom: 3px;">${d.name}</div>
            <div style="opacity: 0.85; font-size: 12px;">${config.rings[d.ring].name}</div>
        `)
        .style("display", "block")
        .style("left", (event.pageX + 12) + "px")
        .style("top", (event.pageY - 12) + "px");
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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderRadar);
    } else {
        renderRadar();
    }

})();
