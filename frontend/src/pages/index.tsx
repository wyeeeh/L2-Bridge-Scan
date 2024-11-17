import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const Home: NextPage = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 12 }}>
        <ConnectButton />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3em' }}>
        <Card>
          <CardHeader>
            <CardTitle>Card Title 1</CardTitle>
            <CardDescription>Card Description 1</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content 1</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer 1</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card Title 2</CardTitle>
            <CardDescription>Card Description 2</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content 2</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer 2</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card Title 3</CardTitle>
            <CardDescription>Card Description 3</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content 3</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer 3</p>
          </CardFooter>
        </Card>
      </div>
    </div>
    </div>
  );
};

{/*export default Home;*/}

import show_StatsCard from './show_StatsCard';

export default show_StatsCard;