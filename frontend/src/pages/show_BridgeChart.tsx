import BridgeChart from './BridgeChart';

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
    ]
  };

  return (
    <BridgeChart
      bridgeStats={mockData.bridgeStats}
      dailyData={mockData.dailyData}
      tokenDistribution={mockData.tokenDistribution}
      recentTransactions={mockData.recentTransactions}
    />
  );
}