import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import '../Auction.scss';
import { formatNumber } from '../../../services/utils'

export function renderTooltip({ active, payload }) {
  if (!active) {
    return null;
  }

  return (
    <div className="tooltip__container">
      <p>{payload && payload[0] && `${formatNumber(payload[0].value)}`}</p>
      {/* <span className="tooltip__triangle" /> */}
    </div>
  );
}

export default class Diagram extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="diagram__container">
        <p className="diagram__label">{this.props.tabContent.name}</p>
        <LineChart
          width={920}
          height={300}
          data={this.props.data}
          margin={{ top: 20, right: 50, bottom: 30, left: 15 }}
        >
          <CartesianGrid vertical={false} stroke="#000000" />
          <XAxis
            tick={{ stroke: '#ffffff' }}
            stroke="#000000"
            axisLine={false}
            tickMargin={10}
            tickLine={false}
            dataKey="name"
          />
          <YAxis tickFormatter={formatNumber}
            tick={{ stroke: '#ffffff' }} stroke="#000000" axisLine={false} tickMargin={10} />
          <Tooltip content={renderTooltip} wrapperStyle={{ top: -60, left: -50 }} />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#5FF5FC"
            activeDot={{ r: 8 }}
            strokeWidth={5}
          />
        </LineChart>
      </div>
    );
  }
}
