"use client"

import * as React from "react"
import { useEffect } from "react"
import * as d3 from 'd3'
import { sankey, sankeyLinkHorizontal } from 'd3-sankey'

interface SankeyProps {
    data: {
        nodes: Array<{
            name: string
            depth?: number
            index?: number
            x0?: number
            x1?: number
            y0?: number
            y1?: number
        }>
        links: Array<{
            source: any
            target: any
            value: number
            width?: number
        }>
    }
    width: number
    height: number
}

const Sankey: React.FC<SankeyProps> = ({ data, width, height }) => {
    const createSankeyChart = (element: Element | null, data: SankeyProps['data'], width: number, height: number) => {
        if (!element) return;

        // 清除现有的SVG元素
        d3.select(element).select('svg').remove();

        const svg = d3.select(element)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const sankeyLayout = sankey<any, any>()
            .nodeWidth(15)
            .nodePadding(10)
            .extent([[1, 1], [width - 1, height - 6]]);

        // 准备数据
        const { nodes, links } = sankeyLayout(data);

        const maxDepth = 10;
        const filteredNodes = nodes.filter(node => node.depth <= maxDepth);
        const filteredLinks = links.filter(link => {
            const sourceNode = nodes.find(node => node.index === link.source.index);
            const targetNode = nodes.find(node => node.index === link.target.index);
            return sourceNode && targetNode && sourceNode.depth <= maxDepth && targetNode.depth <= maxDepth;
        });

        // 重新计算布局
        const { nodes: finalNodes, links: finalLinks } = sankeyLayout({
            nodes: filteredNodes,
            links: filteredLinks
        });

        const colorScale = d3.scaleOrdinal(d3.schemePastel1.map(color => {
            const hslColor = d3.hsl(color);
            hslColor.s = Math.min(1, hslColor.s + 0.3);
            return hslColor;
        }));

        // 绘制链接
        svg.append('g')
            .selectAll('.link')
            .data(finalLinks)
            .enter().append('path')
            .attr('class', 'link')
            .attr('d', sankeyLinkHorizontal())
            .style('stroke-width', (d) => Math.max(1, d.width))
            .style('fill', 'none')
            .style('stroke', (d) => colorScale(d.source.name))
            .style('opacity', 0.5);

        // 绘制节点
        svg.append('g')
            .selectAll('.node')
            .data(finalNodes)
            .enter().append('rect')
            .attr('class', 'node')
            .attr('x', (d) => d.x0)
            .attr('y', (d) => d.y0)
            .attr('height', (d) => d.y1 - d.y0)
            .attr('width', (d) => d.x1 - d.x0)
            .style('fill', (d) => colorScale(d.name))
            .style('stroke', '#fff');

        // 添加文本标签
        svg.append('g')
            .selectAll('.label')
            .data(finalNodes)
            .enter().append('text')
            .attr('x', (d) => d.x0 - 6)
            .attr('y', (d) => (d.y1 + d.y0) / 2)
            .attr('dy', '0.35em')
            .attr('text-anchor', 'end')
            .text((d) => d.name)
            .style('font-size', '12px')
            .style('fill', '#000');

        // 特别处理 depth 为 0 的节点
        finalNodes.forEach(node => {
            if (node.depth === 0) {
                svg.append('text')
                    .attr('x', () => node.x0 < 10 ? node.x0 + 16 : node.x0 - 6)
                    .attr('y', (node.y1 + node.y0) / 2)
                    .attr('dy', '0.35em')
                    .attr('text-anchor', () => node.x0 < 10 ? 'start' : 'end')
                    .text(node.name)
                    .style('font-size', '12px')
                    .style('fill', '#000');
            }
        });
    };

    useEffect(() => {
        if (data.nodes.length > 0 && data.links.length > 0) {
            createSankeyChart(document.querySelector('.sankey-chart'), data, width, height);
        }
    }, [data, width, height]);

    return (
        <div className="sankey-chart w-full h-full" style={{ height: `${height}px` }} />
    )
}

export default Sankey;