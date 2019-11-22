import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import '../Auction.scss';
import { renderTooltip } from './Diagram';

const data = [
  {
    name: 'Page A',
    uv: 2,
  },
  {
    name: 'Page B',
    uv: 4,
  },
  {
    name: 'Page C',
    uv: 6,
  },
  {
    name: 'Page D',
    uv: 7,
  },
  {
    name: 'Page E',
    uv: 8,
  },
  {
    name: 'Page F',
    uv: 9,
  },
  {
    name: 'Page G',
    uv: 11,
  },
];

export default function BarDiagram() {
  return (
    <div className="graphics-item__container">
      <p className="graphic__label">Current Auction Price NEC/ETH</p>
      <BarChart width={450} height={300} data={data} margin={{ top: 20, right: 50, bottom: 30 }}>
        <CartesianGrid vertical={false} stroke="#000000" />
        <XAxis
          dataKey="name"
          tick={{ stroke: '#ffffff' }}
          stroke="#000000"
          axisLine={false}
          tickMargin={10}
          tickLine={false}
        />
        <YAxis tick={{ stroke: '#ffffff' }} stroke="#000000" axisLine={false} tickMargin={10} />
        <Tooltip content={renderTooltip} />
        <Bar dataKey="uv" fill="#4D7198" />
      </BarChart>
    </div>
  );
}
