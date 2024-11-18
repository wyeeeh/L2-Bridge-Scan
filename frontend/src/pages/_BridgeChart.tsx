// BridgeChart.js

import React, { useState, useEffect } from 'react';
import { Card, Title, TabGroup, TabList, Tab } from "@tremor/react";
import * as d3 from 'd3';
import Sankey from './Sankey';
import { AreaChart, XAxis, YAxis, Tooltip, Area, Treemap, ResponsiveContainer } from 'recharts'; // 导入 recharts 组件
import OptionSelect from './OptionSelect';


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
  language: 'en' | 'zh';
  onLanguageChange: (language: 'en' | 'zh') => void;
}
type LanguageType = 'en' | 'zh';

const languageOptions: { value: LanguageType; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' }
];
const _BridgeChart = ({
  bridgeStats,
  dailyData,
  tokenDistribution,
  recentTransactions,
  sankeydata,
  sankeyWidth = 800,
  sankeyHeight = 500,
  language = 'en',
  onLanguageChange,
}: BridgeChartProps) => {

  const texts = {
    en: {
      totalBridgers: 'Total Bridgers',
      totalTransactions: 'Total Transactions',
      totalValue: 'Total Value (ETH)',
      dailyBridgeData: 'Daily Bridge Data',
      popularBridgeTokens: 'Popular Bridge Tokens',
      latestBridgeTransactions: 'Latest Bridge Transactions',
      blockNo: 'Block No.',
      receivingAddress: 'Receiving Address',
      l1TxHash: 'L1 Transaction Hash',
      time: 'Time',
      l2TxHash: 'L2 Transaction Hash',
      amount: 'Amount',
      token: 'Token',
      sankeyDiagram: 'Sankey Diagram'
    },
    zh: {
      totalBridgers: '总桥接用户数',
      totalTransactions: '总桥接交易数',
      totalValue: '总桥接价值 (ETH)',
      dailyBridgeData: '每日桥接数据',
      popularBridgeTokens: '热门桥接代币',
      latestBridgeTransactions: '最新桥接交易',
      blockNo: '区块号',
      receivingAddress: '接收地址',
      l1TxHash: 'L1 交易哈希',
      time: '时间',
      l2TxHash: 'L2 交易哈希',
      amount: '数量',
      token: '代币',
      sankeyDiagram: '桑基图'
    }
  };

  const [selectedDuration, setSelectedDuration] = useState('24h')
  const durationOptions = [
    { value: '24h', label: '24 hours' },
    { value: '7d', label: '7 days' },
    { value: '30d', label: '30 days' }
  ]
  // 处理数据更新
  const handleDurationChange = (value: string) => {
    setSelectedDuration(value)
    // 这里可以调用API或更新数据
    // updateChartData(value, selectedBridge)
  }
  // 桥选择
  const [selectedBridge, setSelectedBridge] = useState('Taiko')
  const bridgeOptions = [
    { value: 'Taiko', label: 'Taiko' },
    { value: 'Linea', label: 'Linea' }
  ]
  const handleBridgeChange = (value: string) => {
    setSelectedBridge(value)
    // 这里可以调用API或更新数据
    // updateChartData(selectedDuration, value)
  }
  // 更新数据的函数
  const updateChartData = async (duration: string, bridge: string) => {
    try {
      // 这里添加你的数据获取逻辑
      // const response = await fetch(`/api/bridge-data?duration=${duration}&bridge=${bridge}`)
      // const data = await response.json()
      // 更新图表数据
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  console.debug('Sankeydata received in BridgeChart:', sankeydata);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{language === 'zh' ? '桥接统计数据' : 'Bridge Statistics'}</h1>
        <div className="flex gap-10">
          <div className="relative">
            <OptionSelect
              options={languageOptions}
              value={language}
              onChange={(value) => onLanguageChange(value as 'en' | 'zh')}
            />
          </div>
          <div className="relative">
            {/* select 组件 */}
            <OptionSelect options={durationOptions} value={selectedDuration} onChange={handleDurationChange} />
          </div>

        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="border-2 border-blue-300 rounded-lg">
          <Title>{texts[language].totalBridgers}</Title>
          <p className="text-2xl font-bold">{bridgeStats.totalBridgers}</p>
        </Card>
        <Card className="border-2 border-blue-300 rounded-lg">
          <Title>{texts[language].totalTransactions}</Title>
          <p className="text-2xl font-bold">{bridgeStats.totalTransactions}</p>
        </Card>
        <Card className="border-2 border-blue-300 rounded-lg">
          <Title>{texts[language].totalValue}</Title>
          <p className="text-2xl font-bold">{bridgeStats.totalValueETH}</p>
        </Card>
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="border-2 border-blue-300 rounded-lg">
          <div className="grid place-items-center w-full h-full">
            <Title>{texts[language].dailyBridgeData}</Title>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailyData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="transactions" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="grid place-items-center h-full border-2 border-blue-300 rounded-lg">
          <Title className="mb-4">{texts[language].popularBridgeTokens}</Title>
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
          <Title>{texts[language].latestBridgeTransactions}</Title>
          <div className="relative">
            <OptionSelect options={bridgeOptions} value={selectedBridge} onChange={handleBridgeChange} />

          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">{texts[language].blockNo}</th>
                <th className="px-4 py-2">{texts[language].receivingAddress}</th>
                <th className="px-4 py-2">{texts[language].l1TxHash}</th>
                <th className="px-4 py-2">{texts[language].time}</th>
                <th className="px-4 py-2">{texts[language].l2TxHash}</th>
                <th className="px-4 py-2">{texts[language].amount}</th>
                <th className="px-4 py-2">{texts[language].token}</th>
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
      <Card className="border-2 border-blue-300 rounded-lg center">
        <Title>{texts[language].sankeyDiagram}</Title>
        <div className="flex justify-center items-center w-full">  {/* 修改这里 */}
          <div className="w-full max-w-[85%]">  {/* 添加这个包装div */}
            <Sankey
              data={sankeydata}
              width={sankeyWidth}
              height={sankeyHeight}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default _BridgeChart;