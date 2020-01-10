import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import '../Auction.scss';
import { renderTooltip } from './Diagram';

export default class BarDiagram extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="graphics-item__container">
        <p className="graphic__label">Current Auction Price NEC/ETH</p>
        <BarChart
          width={450}
          height={300}
          data={this.props.data}
          margin={{ top: 20, right: 50, bottom: 30 }}
        >
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
}
