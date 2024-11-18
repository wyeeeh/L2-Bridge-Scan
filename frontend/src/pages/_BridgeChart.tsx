// BridgeChart.js

import React, { useState, useEffect } from 'react';
import { Card, Title, TabGroup, TabList, Tab } from "@tremor/react";
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey'; // 导入 sankey 相关函数
import { AreaChart, XAxis, YAxis, Tooltip, Area, Treemap, ResponsiveContainer } from 'recharts'; // 导入 recharts 组件

// 桑基图组件
const SankeyChart = ({ data, width, height }) => {
  const createSankeyChart = (element, data, width, height) => {
    // 清除现有的SVG元素
    d3.select(element).select('svg').remove();

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const sankeyGenerator = sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 1], [width, height]]);

    // 定义桑基图布局
    const sankeyLayout = sankey<Node, Link>()
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
      hslColor.s = Math.min(1, hslColor.s + 0.3); // 提升饱和度，但不超过 1
      return hslColor;
    }));

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

    // 特别处理 depth 为 0 的节点
    finalNodes.forEach(node => {
      if (node.depth === 0) {
        console.log(`Adding label for node with name: ${node.name}, depth: ${node.depth}`);
        svg.append('text')
          .attr('x', () => {
            if (node.x0 < 10) { // 如果节点非常接近左边界
              return node.x0 + 16; // 将文本标签进一步向右移动
            } else {
              return node.x0 - 6; // 否则保持原来的对齐方式
            }
          })
          .attr('y', (node.y1 + node.y0) / 2)
          .attr('dy', '0.35em')
          .attr('text-anchor', () => {
            if (node.x0 < 10) { // 如果节点非常接近左边界
              return 'start'; // 文本标签靠左对齐
            } else {
              return 'end'; // 否则靠右对齐
            }
          })
          .text(node.name)
          .style('font-size', '12px')
          .style('fill', '#000');
      }
    });

    // 检查是否有节点的文本标签未被添加
    nodes.forEach((node, index) => {
      if (!document.querySelector(`.label:nth-child(${index + 1})`)) {
        console.warn(`Node ${index} with name "${node.name}" is missing its label.`);
      }
    });
  };

  useEffect(() => {
    if (data.nodes.length > 0 && data.links.length > 0) {
      createSankeyChart(document.querySelector('.sankey-chart'), data, width, height);
    }
  }, [data, width, height]);

  return <div className="sankey-chart" style={{ height: `${height}px`, margin: '0 auto', maxWidth: '100%' }}></div>;
};

// 主组件
interface BridgeStats {
  totalBridgers: number;
  totalTransactions: number;
  totalValueETH: number;
}

interface Transaction {
  blockNo: string;
  to: string;
  l1TxnHash: string;
  age: string;
  l2TxnHash: string;
  value: string;
  token: string;
}

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

interface BridgeChartProps {
  bridgeStats: BridgeStats;
  dailyData: Array<{ date: string; transactions: number; users: number }>;
  tokenDistribution: Array<{ name: string; value: number; fill: string }>;
  recentTransactions: Transaction[];
  sankeydata: SankeyData;
  sankeyWidth: number;
  sankeyHeight: number;
}

const _BridgeChart = ({
  bridgeStats,
  dailyData,
  tokenDistribution,
  recentTransactions,
  sankeydata,
  sankeyWidth = 800,
  sankeyHeight = 500,
}: BridgeChartProps) => {
  const [selectedDuration, setSelectedDuration] = useState('24h');
  const handleDurationChange = (e) => {
    setSelectedDuration(e.target.value);
  };

  const [selectedNetwork, setSelectedNetwork] = useState('Taiko');
  const handleNetworkChange = (e) => {
    setSelectedNetwork(e.target.value);
  };

  console.debug('Sankeydata received in BridgeChart:', sankeydata);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">桥接统计数据</h1>
        <div className="flex gap-10">
          <div className="relative">
            <select
              value={selectedDuration}
              onChange={handleDurationChange}
              className="px-4 py-2 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="24h">24小时</option>
              <option value="7d">7天</option>
              <option value="30d">30天</option>
            </select>
          </div>

        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="border-2 border-blue-300 rounded-lg">
          <Title>总桥接用户数</Title>
          <p className="text-2xl font-bold">{bridgeStats.totalBridgers}</p>
        </Card>
        <Card className="border-2 border-blue-300 rounded-lg">
          <Title>总桥接交易数</Title>
          <p className="text-2xl font-bold">{bridgeStats.totalTransactions}</p>
        </Card>
        <Card className="border-2 border-blue-300 rounded-lg">
          <Title>总桥接价值 (ETH)</Title>
          <p className="text-2xl font-bold">{bridgeStats.totalValueETH} </p>
        </Card>
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="border-2 border-blue-300 rounded-lg">
          <Title>每日桥接数据</Title>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="transactions" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="grid place-items-center h-full border-2 border-blue-300 rounded-lg">
          <Title className="mb-4">热门桥接代币</Title>
          <div className="grid place-items-center w-full h-full">
            <ResponsiveContainer width="100%" height={300}>
              <Treemap
                data={tokenDistribution}
                dataKey="value"
                aspectRatio={4 / 3}
                stroke="#fff"
              />
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* 最新交易表格 */}
      <Card className="border-2 border-blue-300 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <Title>最新桥接交易</Title>
          <div className="relative">
            <select
              value={selectedNetwork}
              onChange={handleNetworkChange}
              className="px-4 py-2 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="Taiko">Taiko</option>
              <option value="Linea">Linea</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">区块号</th>
                <th className="px-4 py-2">接收地址</th>
                <th className="px-4 py-2">L1 交易哈希</th>
                <th className="px-4 py-2">时间</th>
                <th className="px-4 py-2">L2 交易哈希</th>
                <th className="px-4 py-2">数量</th>
                <th className="px-4 py-2">代币</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx, index) => (
                <tr key={index} className="border-b">
                  <th className="px-4 py-2">{tx.blockNo}</th>
                  <th className="px-4 py-2">{tx.to}</th>
                  <th className="px-4 py-2">{tx.l1TxnHash}</th>
                  <th className="px-4 py-2">{tx.age}</th>
                  <th className="px-4 py-2">{tx.l2TxnHash}</th>
                  <th className="px-4 py-2">{tx.value}</th>
                  <th className="px-4 py-2">{tx.token}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 桑基图卡片 */}
      <div className="mt-8">
        <Card className="border-2 border-blue-300 rounded-lg">
          <Title>桑基图</Title>
          <div className="flex justify-center items-center">
            <SankeyChart data={sankeydata} width={sankeyWidth} height={sankeyHeight} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default _BridgeChart;