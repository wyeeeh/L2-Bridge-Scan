import { ConnectButton } from '@rainbow-me/rainbowkit';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

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


import Show_StatsCard from './show_StatsCard';
import { celo, manta, taiko } from 'viem/chains';


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
        </Head>
      </div>
      <div>
        {/* <ConnectWalletButton /> */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '2em' }}>
          <ConnectButton />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* <Show_StatsCard /> */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
            <Show_StatsCard />
          </div>
        </div>
      </div>
    </RainbowKitProvider>
  );
};


export default Home;