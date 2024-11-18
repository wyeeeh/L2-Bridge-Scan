import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit';
// import favicon from '@/assets/img/favicon.svg'

import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import Show_BridgeChart from './show_BridgeChart';
import { taiko } from 'wagmi/chains';


const Home: NextPage = () => {
  return (
    <RainbowKitProvider initialChain={taiko}>
      <div className={styles.container}>
        <Head>
          <title>L2 Bridge Scan</title>
          <meta
            content="Created by THUBA Team"
            name="description"
          />
          <link rel="icon" href="/img/favicon.svg" type="image/svg+xml" />
          {/* 为了兼容性，可以同时提供多种格式 */}
          <link rel="shortcut icon" href="/img/favicon.svg" type="image/svg+xml" />
          {/* 如果需要，还可以添加 apple-touch-icon */}
          <link rel="apple-touch-icon" href="/img/favicon.svg" />
        </Head>
      </div>
      <div>
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src="/img/favicon.svg"
                  alt="L2 Bridge"
                  className="w-12 h-12"
                />
                <span className="text-2xl font-semibold">L2 Bridge Scan</span>
              </div>
              <ConnectButton />
            </div>
          </div>
        </nav>
        {/* <ConnectWalletButton /> */}
        {/* <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '2em' }}>
          <ConnectButton />
        </div> */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* <Show_StatsCard /> */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
            <Show_BridgeChart />
          </div>
        </div>
      </div>
    </RainbowKitProvider>
  );
};


export default Home;

{/*import show_SankeyChart from './show_SankeyChart'
export default show_SankeyChart;
export default show_BridgeChart;*/}
