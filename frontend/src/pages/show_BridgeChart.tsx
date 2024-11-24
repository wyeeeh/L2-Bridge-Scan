import _BridgeChart from './_BridgeChart';
import { useState, useEffect } from 'react';
import { BridgeChartProps, fetchExchangeRates } from './_BridgeChart';
import { Item } from '@radix-ui/react-select';

const tokenDecimals: { [token: string]: number } = {
  'ETH': 1e18,
  'USDC': 1e6,
  'USDT': 1e6,
  'DAI': 1e18,
  'WBTC': 1e8,
  'crvUSD': 1e18,
}


const queryText_dailyData1Day = `SELECT DATE(create_time) AS date, COUNT(*) AS transactions, COUNT(DISTINCT src_owner) AS users FROM af_cross_tx_l1tol2s WHERE create_time >= NOW() - INTERVAL '1 day' GROUP BY DATE(create_time) ORDER BY DATE(create_time)`;

const queryText_tokenDistribution1Day = `SELECT token_id AS name, SUM(amount) AS value FROM af_cross_tx_l1tol2s WHERE create_time >= NOW() - INTERVAL '1 day' GROUP BY name`;

const queryText_recentTransactions = `SELECT block_number AS block_no, src_owner AS "from", dest_owner AS "to", EXTRACT(epoch FROM (NOW() - create_time)) AS age, transaction_hash AS l2txnhash, amount AS value, token_id AS token FROM af_cross_tx_l1tol2s ORDER BY NOW() - create_time LIMIT 20`;

const fillList = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#ff6347', '#ff4500', '#ff0000', '#ff1493', '#ff69b4']


export default function show_BridgeChart({ }: BridgeChartProps) {
  const [language, setLanguage] = useState<'en' | 'zh'>('en');

  const [bridgeStats, setBridgeStats] = useState<{
    totalBridgers: number;
    totalTransactions: number;
    totalValueETH: number;
  }>({
    totalBridgers: 0,
    totalTransactions: 0,
    totalValueETH: 0,
  });

  const [dailyData, setdailyData] = useState<{
    date: string;
    transactions: number;
    users: number;
  }[]>([]);

  const [tokenDistribution, setTokenDistribution] = useState<{
    name: string;
    value: number;
    fill: string;
  }[]>([]);

  const [recentTransactions, setRecentTransactions] = useState<{
    block_no: string;
    from: string;
    to: string;
    age: string;
    l2txnhash: string;
    value: number;
    token: string;
  }[]>([]);

  const fetchTransactions = async () => {
    const response_RecentTransactions = await fetch(`/api/api?queryText=${encodeURIComponent(queryText_recentTransactions)}`);
    let json_RecentTransactions = await response_RecentTransactions.json();
    // change the age type form seconds to day hour min sec
    // change address from Buffer to hex string
    json_RecentTransactions = json_RecentTransactions.map((item: { from: string; to: string; age: string; l2txnhash: string; value: number, token: string }) => {
      const age_num = Number(item.age);
      const days = Math.floor(age_num / (24 * 3600));
      const hours = Math.floor((age_num % (24 * 3600)) / 3600);
      const minutes = Math.floor((age_num % 3600) / 60);
      return {
        ...item,
        from: item.from.toString(),
        to: item.to.toString(),
        l2txnhash: item.l2txnhash.toString(),
        age: `${days}d ${hours}h ${minutes}m ago`,
        value: item.value / tokenDecimals[item.token]
      };
    });

    setRecentTransactions(json_RecentTransactions);
  }

  const fetchData = async () => {
    // fetch the data from the API

    const response_dailyData = await fetch(`/api/api?queryText=${encodeURIComponent(queryText_dailyData1Day)}`);
    let json_dailyData = await response_dailyData.json();
    // change the date type to number
    json_dailyData = json_dailyData.map((item: { date: string; transactions: number; users: number }) => {
      return {
        date: new Date(item.date).toLocaleDateString(),
        transactions: Number(item.transactions),
        users: Number(item.users),
      };
    });

    const response_tokenDistribution = await fetch(`/api/api?queryText=${encodeURIComponent(queryText_tokenDistribution1Day)}`);
    let json_tokenDistribution = await response_tokenDistribution.json();

    // fetch the exchange rates for the tokens
    const token_ids = json_tokenDistribution.map((item: { name: string }) => item.name);
    const exchangeRates = await fetchExchangeRates(token_ids);
    // reformat the tokenDistribution data
    json_tokenDistribution = json_tokenDistribution.map((item: { name: string; value: number }, index: number) => {
      const exchangeRate = exchangeRates[item.name] ? exchangeRates[item.name] : 1;
      const tokenDecimal = tokenDecimals[item.name] ? tokenDecimals[item.name] : 1e18;
      return {
        ...item,
        value: item.value * exchangeRate / tokenDecimal,
        fill: fillList[index % fillList.length],
      };
    });

    // update the state of dailyData
    setdailyData(json_dailyData);
    // update the state of bridgeStats
    setBridgeStats({
      totalBridgers: json_dailyData.reduce((acc: number, item: { users: number }) => acc + item.users, 0),
      totalTransactions: json_dailyData.reduce((acc: number, item: { transactions: number }) => acc + item.transactions, 0),
      totalValueETH: json_tokenDistribution.reduce((acc: number, item: { value: number }) => acc + item.value, 0),
    });
    // update the state of tokenDistribution
    setTokenDistribution(json_tokenDistribution);

  };

  useEffect(() => {
    fetchData();
  }, [recentTransactions]);

  useEffect(() => {
    // fetch the recent transactions every 5 minute
    fetchTransactions();
    const interval = setInterval(() => {
      fetchTransactions();
    }
      , 300000);
    return () => clearInterval(interval);
  }, []);

  // 模拟数据
  const mockData = {


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
      language={language}
      onLanguageChange={setLanguage}
      bridgeStats={bridgeStats}
      dailyData={dailyData}
      tokenDistribution={tokenDistribution}
      recentTransactions={recentTransactions}
      sankeydata={mockData.sankeyData}
      sankeyWidth={800}
      sankeyHeight={500}
    />
  );
}