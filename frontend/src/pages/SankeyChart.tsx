// components/SankeyChart.tsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';


interface Node {
  name: string;
  depth?: number; // 新增属性：节点深度
}

interface Link {
  source: number | string;
  target: number | string;
  value: number;
}

interface SankeyData {
  nodes: Node[];
  links: Link[];
}

interface SankeyChartProps {
  data: SankeyData;
}

const SankeyChart: React.FC<SankeyChartProps> = ({ data }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data) return;

    console.log('Nodes:', data.nodes);
    console.log('Links:', data.links);

    // 设置图表尺寸
    const width = 800;
    const height = 600;

    // 创建 SVG 元素
    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height);

    // 定义桑基图布局
    const sankeyLayout = sankey<Node, Link>()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 1], [width - 1, height - 6]]);

    try {
      // 准备数据
      const { nodes, links } = sankeyLayout(data);

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

      // 生成随机颜色
      const colorScale = d3.scaleOrdinal(d3.schemePastel1);

      // 绘制链接
      const link = svg.append('g')
        .selectAll('.link')
        .data(finalLinks)
        .enter().append('path')
        .attr('class', 'link')
        .attr('d', sankeyLinkHorizontal())
        .style('stroke-width', (d) => Math.max(1, d.width))
        .style('fill', 'none')
        .style('stroke', (d) => colorScale(d.source.name)) // 使用源节点的颜色
        .style('opacity', 0.5);

      // 绘制节点
      const node = svg.append('g')
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
      const text = svg.append('g')
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
    } catch (error) {
      console.error('Error in sankey layout:', error);
    }
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default SankeyChart;