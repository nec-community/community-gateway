import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import '../Auction.scss';

const data = [
  {
    name: 'Page A',
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    pv: 4300,
    amt: 2100,
  },
];

export function renderTooltip({ active, payload }) {
  if (!active) {
    return null;
  }

  return (
    <div className="tooltip__container">
      <p>{`${payload[0].value}`}</p>
      {/*<span className="tooltip__triangle" />*/}
    </div>
  );
}

export default function Diagram() {
  return (
    <div className="diagram__container">
      <p className="diagram__label">Burned NEC</p>
      <LineChart width={870} height={300} data={data} margin={{ top: 20, right: 50, bottom: 30 }}>
        <CartesianGrid vertical={false} stroke="#000000" />
        <XAxis
          tick={{ stroke: '#ffffff' }}
          stroke="#000000"
          axisLine={false}
          tickMargin={10}
          tickLine={false}
        />
        <YAxis tick={{ stroke: '#ffffff' }} stroke="#000000" axisLine={false} tickMargin={10} />
        <Tooltip content={renderTooltip} wrapperStyle={{ top: -60, left: -50 }} />
        <Line type="monotone" dataKey="pv" stroke="#5FF5FC" activeDot={{ r: 8 }} strokeWidth={5} />
      </LineChart>
    </div>
  );
}
