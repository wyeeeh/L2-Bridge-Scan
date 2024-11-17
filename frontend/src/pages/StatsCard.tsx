import { FC } from 'react';

interface StatsCardProps {
  totalTransactions: number;
  uniqueUsers: number;
  totalValue: {
    eth: number;
    usd: number;
  };
}

const StatsCard: FC<StatsCardProps> = ({ totalTransactions, uniqueUsers, totalValue }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {/* 交易数量卡片 */}
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex flex-col">
          <span className="text-gray-500 text-sm">总桥接交易数量</span>
          <span className="text-3xl font-bold text-gray-800 mt-2">
            {totalTransactions.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 用户数量卡片 */}
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex flex-col">
          <span className="text-gray-500 text-sm">独立用户数量</span>
          <span className="text-3xl font-bold text-gray-800 mt-2">
            {uniqueUsers.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 总价值卡片 */}
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex flex-col">
          <span className="text-gray-500 text-sm">总桥接价值</span>
          <div className="flex flex-col mt-2">
            <span className="text-3xl font-bold text-gray-800">
              {totalValue.eth.toFixed(2)} ETH
            </span>
            <span className="text-gray-500 text-sm mt-1">
              ≈ ${totalValue.usd.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;