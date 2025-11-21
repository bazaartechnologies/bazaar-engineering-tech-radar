/**
 * Tech Radar Visualization using D3.js
 * Based on ThoughtWorks Tech Radar
 */

(function() {
    'use strict';

    // Configuration
    const config = {
        width: 1200,
        height: 1200,
        colors: {
            techniques: '#8B4789',
            tools: '#1EAADF',
            platforms: '#8FA227',
            'languages-frameworks': '#F38A3E'
        },
        rings: [
            { radius: 0.25, name: 'Adopt' },
            { radius: 0.40, name: 'Trial' },
            { radius: 0.60, name: 'Assess' },
            { radius: 1.00, name: 'Hold' }
        ],
        quadrants: [
            { name: 'Techniques', startAngle: 0 },
            { name: 'Tools', startAngle: Math.PI / 2 },
            { name: 'Platforms', startAngle: Math.PI },
            { name: 'Languages & Frameworks', startAngle: 3 * Math.PI / 2 }
        ]
    };

    function renderRadar() {
        // Wait for radar data to be available
        if (typeof window.radarData === 'undefined') {
            console.log('Waiting for radar data...');
            setTimeout(renderRadar, 100);
            return;
        }

        const data = window.radarData;
        
        // Clear loading message
        const loadingDiv = document.getElementById('radar-loading');
        if (loadingDiv) {
            loadingDiv.style.display = 'none';
        }

        // Set up SVG
        const svg = d3.select('#radar');
        svg.selectAll('*').remove(); // Clear any existing content
        
        const width = config.width;
        const height = config.height;
        const radius = Math.min(width, height) / 2 - 50;
        
        svg
            .attr('width', width)
            .attr('height', height);

        const g = svg.append('g')
            .attr('transform', `translate(${width/2},${height/2})`);

        // Draw rings
        const rings = g.append('g').attr('class', 'rings');
        config.rings.forEach((ring, i) => {
            rings.append('circle')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', ring.radius * radius)
                .attr('fill', 'none')
                .attr('stroke', '#ccc')
                .attr('stroke-width', 1);

            // Ring labels
            if (i < config.rings.length - 1) {
                rings.append('text')
                    .attr('x', 5)
                    .attr('y', -(ring.radius * radius) + 15)
                    .attr('text-anchor', 'start')
                    .attr('font-size', '12px')
                    .attr('fill', '#666')
                    .text(ring.name);
            }
        });

        // Draw quadrant lines
        const quadrants = g.append('g').attr('class', 'quadrants');
        [0, 90, 180, 270].forEach(angle => {
            const rad = angle * Math.PI / 180;
            quadrants.append('line')
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', Math.cos(rad) * radius)
                .attr('y2', Math.sin(rad) * radius)
                .attr('stroke', '#ccc')
                .attr('stroke-width', 1);
        });

        // Quadrant labels
        const quadrantLabels = g.append('g').attr('class', 'quadrant-labels');
        config.quadrants.forEach((quadrant, i) => {
            const angle = quadrant.startAngle + Math.PI / 4;
            const labelRadius = radius * 0.85;
            const x = Math.cos(angle) * labelRadius;
            const y = Math.sin(angle) * labelRadius;

            quadrantLabels.append('text')
                .attr('x', x)
                .attr('y', y)
                .attr('text-anchor', 'middle')
                .attr('font-size', '18px')
                .attr('font-weight', 'bold')
                .attr('fill', Object.values(config.colors)[i])
                .text(quadrant.name);
        });

        // Plot technologies
        const technologies = data.technologies;
        const blips = g.append('g').attr('class', 'blips');

        // Position blips
        const positionedBlips = technologies.map(tech => {
            const quadrantAngle = config.quadrants[tech.quadrant].startAngle;
            const angleRange = Math.PI / 2;
            const angle = quadrantAngle + Math.random() * angleRange + 0.1;
            
            const ring = config.rings[tech.ring];
            const prevRing = tech.ring > 0 ? config.rings[tech.ring - 1] : { radius: 0 };
            const minRadius = prevRing.radius * radius;
            const maxRadius = ring.radius * radius;
            const r = minRadius + Math.random() * (maxRadius - minRadius - 20) + 10;
            
            return {
                ...tech,
                x: Math.cos(angle) * r,
                y: Math.sin(angle) * r,
                color: Object.values(config.colors)[tech.quadrant]
            };
        });

        // Draw blips
        const blipGroups = blips.selectAll('g')
            .data(positionedBlips)
            .enter()
            .append('g')
            .attr('class', 'blip')
            .attr('transform', d => `translate(${d.x},${d.y})`)
            .style('cursor', 'pointer')
            .on('click', function(event, d) {
                showBlipDetails(d);
                // Highlight selected blip
                blips.selectAll('circle').attr('stroke-width', 2);
                d3.select(this).select('circle').attr('stroke-width', 4);
            })
            .on('mouseover', function(event, d) {
                d3.select(this).select('circle')
                    .transition()
                    .duration(200)
                    .attr('r', 12);
                
                // Show tooltip
                tooltip.style('display', 'block')
                    .html(`<strong>${d.name}</strong><br/>${config.rings[d.ring].name}`)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 10) + 'px');
            })
            .on('mouseout', function(event, d) {
                d3.select(this).select('circle')
                    .transition()
                    .duration(200)
                    .attr('r', 8);
                
                tooltip.style('display', 'none');
            });

        blipGroups.append('circle')
            .attr('r', 8)
            .attr('fill', d => d.color)
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .attr('opacity', 0.8);

        // Add tooltip
        const tooltip = d3.select('body').append('div')
            .attr('class', 'radar-tooltip')
            .style('position', 'absolute')
            .style('display', 'none')
            .style('background', 'rgba(0, 0, 0, 0.8)')
            .style('color', '#fff')
            .style('padding', '8px 12px')
            .style('border-radius', '4px')
            .style('font-size', '12px')
            .style('pointer-events', 'none')
            .style('z-index', '1000');

        console.log(`✅ Rendered ${technologies.length} technologies on the radar`);
    }

    function showBlipDetails(tech) {
        const detailDiv = document.getElementById('detail-content');
        if (!detailDiv) return;

        const ringName = config.rings[tech.ring].name;
        const quadrantName = config.quadrants[tech.quadrant].name;

        let tagsHtml = '';
        if (tech.tags && tech.tags.length > 0) {
            tagsHtml = tech.tags.map(tag => 
                `<span class="tag">${tag}</span>`
            ).join(' ');
        }

        detailDiv.innerHTML = `
            <h3>${tech.name}</h3>
            <div class="detail-meta">
                <span class="badge" style="background-color: ${tech.color}">
                    ${quadrantName}
                </span>
                <span class="badge ring-${tech.ring}">
                    ${ringName}
                </span>
            </div>
            ${tagsHtml ? `<div class="tags">${tagsHtml}</div>` : ''}
            ${tech.description ? `<p>${tech.description}</p>` : ''}
            <a href="${tech.url}" class="detail-link">View full details →</a>
        `;

        // Scroll to details
        detailDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Initialize radar when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderRadar);
    } else {
        renderRadar();
    }

})();

