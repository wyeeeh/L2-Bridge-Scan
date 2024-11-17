'use client';

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Treemap } from 'recharts';
import { Card, Title, TabGroup, TabList, Tab } from "@tremor/react";
import SankeyChart from './SankeyChart';

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
}

export default function BridgeChart({
  bridgeStats,
  dailyData,
  tokenDistribution,
  recentTransactions,
  sankeydata,
}: BridgeChartProps) {
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
          <button className="px-4 py-2 bg-blue-400 text-white rounded-lg w-32">
            连接钱包
          </button>
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

      <Card className="border-2 border-blue-300 rounded-lg">
        <h1>桑基图</h1>
        <SankeyChart data={sankeydata} />
      </Card>
    </div>
  );
}