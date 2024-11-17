import StatsCard from './StatsCard';

export default function Show_StatsCard() {
  // 这里可以添加获取数据的逻辑
  const statsData = {
    totalTransactions: 15234,
    uniqueUsers: 5678,
    totalValue: {
      eth: 1234.56,
      usd: 2468123
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">桥接统计数据</h1>
      <StatsCard {...statsData} />
    </div>
  );
}