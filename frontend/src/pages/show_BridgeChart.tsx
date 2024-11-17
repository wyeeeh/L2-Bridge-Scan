import _BridgeChart from './_BridgeChart';

export default function show_BridgeChart() {
  // 模拟数据
  const mockData = {
    bridgeStats: {
      totalBridgers: 9887,
      totalTransactions: 89987,
      totalValueETH: 10952
    },

    dailyData: [
      { date: '2024-01', transactions: 1200, users: 450 },
      { date: '2024-02', transactions: 1800, users: 680 },
      { date: '2024-03', transactions: 1200, users: 530 },
    ],

    tokenDistribution: [
      { name: 'ETH', value: 5000, fill: '#8884d8' },
      { name: 'USDC', value: 3000, fill: '#82ca9d' },
      { name: 'USDT', value: 2000, fill: '#ffc658' },
    ],

    recentTransactions: [
      {
        blockNo: '21203933',
        to: '0x41d3d3...',
        l1TxnHash: '0x8f98ff4734...',
        age: '3 hrs 30 mins ago',
        l2TxnHash: '0xa7b2b43557...',
        value: '30000',
        token: 'USDC'
      },
      {
        blockNo: '21203934',
        to: '0x41d3d3...',
        l1TxnHash: '0x8f98ff4734...',
        age: '3 hrs 30 mins ago',
        l2TxnHash: '0xa7b2b43557...',
        value: '30000',
        token: 'USDC'
      },
      {
        blockNo: '21203934',
        to: '0x41d3d3...',
        l1TxnHash: '0x8f98ff4734...',
        age: '3 hrs 30 mins ago',
        l2TxnHash: '0xa7b2b43557...',
        value: '30000',
        token: 'USDC'
      },
      {
        blockNo: '21203934',
        to: '0x41d3d3...',
        l1TxnHash: '0x8f98ff4734...',
        age: '3 hrs 30 mins ago',
        l2TxnHash: '0xa7b2b43557...',
        value: '30000',
        token: 'USDC'
      },
      {
        blockNo: '21203934',
        to: '0x41d3d3...',
        l1TxnHash: '0x8f98ff4734...',
        age: '3 hrs 30 mins ago',
        l2TxnHash: '0xa7b2b43557...',
        value: '30000',
        token: 'USDC'
      },
      {
        blockNo: '21203934',
        to: '0x41d3d3...',
        l1TxnHash: '0x8f98ff4734...',
        age: '3 hrs 30 mins ago',
        l2TxnHash: '0xa7b2b43557...',
        value: '30000',
        token: 'USDC'
      },
      {
        blockNo: '21203934',
        to: '0x41d3d3...',
        l1TxnHash: '0x8f98ff4734...',
        age: '3 hrs 30 mins ago',
        l2TxnHash: '0xa7b2b43557...',
        value: '30000',
        token: 'USDC'
      },
      {
        blockNo: '21203934',
        to: '0x41d3d3...',
        l1TxnHash: '0x8f98ff4734...',
        age: '3 hrs 30 mins ago',
        l2TxnHash: '0xa7b2b43557...',
        value: '30000',
        token: 'USDC'
      },
      {
        blockNo: '21203934',
        to: '0x41d3d3...',
        l1TxnHash: '0x8f98ff4734...',
        age: '3 hrs 30 mins ago',
        l2TxnHash: '0xa7b2b43557...',
        value: '30000',
        token: 'USDC'
      },
      {
        blockNo: '21203934',
        to: '0x41d3d3...',
        l1TxnHash: '0x8f98ff4734...',
        age: '3 hrs 30 mins ago',
        l2TxnHash: '0xa7b2b43557...',
        value: '30000',
        token: 'USDC'
      },
    ],

    // 模拟桑基图数据
    sankeyData: {
      nodes: [
        { name: '矿工A' },
        { name: '矿工B' },
        { name: '矿工C' },
        { name: '交易所A' },
        { name: '交易所B' },
        { name: '钱包X' },
        { name: '钱包Y' },
        { name: '钱包Z' },
        { name: '服务提供商1' },
        { name: '服务提供商2' },
        { name: '服务提供商3' },
        { name: '消费者1' },
        { name: '消费者2' },
        { name: '消费者3' },
        { name: '数据中心1' },
        { name: '数据中心2' },
        { name: '数据中心3' },
        { name: '云计算A' },
        { name: '云计算B' },
        { name: '云计算C' }
      ],
      links: [
        { source: 0, target: 3, value: 5 },
        { source: 1, target: 4, value: 3 },
        { source: 2, target: 3, value: 2 },
        { source: 3, target: 6, value: 8 },
        { source: 4, target: 7, value: 6 },
        { source: 5, target: 6, value: 4 },
        { source: 6, target: 8, value: 7 },
        { source: 7, target: 9, value: 3 },
        { source: 8, target: 10, value: 2 },
        { source: 9, target: 11, value: 5 },
        { source: 10, target: 12, value: 6 },
        { source: 11, target: 13, value: 3 },
        { source: 12, target: 14, value: 4 },
        { source: 13, target: 15, value: 2 },
        { source: 14, target: 16, value: 7 },
        { source: 15, target: 17, value: 5 },
        { source: 6, target: 18, value: 6 },
        { source: 7, target: 18, value: 2 },
        { source: 8, target: 12, value: 3 },
        { source: 9, target: 13, value: 4 },
        { source: 0, target: 6, value: 1 },
        { source: 1, target: 7, value: 2 },
        { source: 2, target: 6, value: 3 },
        { source: 6, target: 15, value: 2 },
        { source: 7, target: 14, value: 1 },
        { source: 6, target: 17, value: 2 },
        { source: 7, target: 19, value: 1 },
        { source: 8, target: 9, value: 1 },
        { source: 9, target: 10, value: 1 }
      ]
    }
  };

  return (
    <_BridgeChart
      bridgeStats={mockData.bridgeStats}
      dailyData={mockData.dailyData}
      tokenDistribution={mockData.tokenDistribution}
      recentTransactions={mockData.recentTransactions}
      sankeydata={mockData.sankeyData}
    />
  );
}