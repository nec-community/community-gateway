import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import '../Auction.scss';
import { renderTooltip } from './Diagram';
import { formatNumber } from '../../../services/utils';

export default class BarDiagram extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, XAxisKey, YAxisKey, highlightValue } = this.props;

    return (
      <div className="graphics-item__container">
        <p className="graphic__label">Current Auction Price NEC/ETH</p>
        <BarChart
          width={450}
          height={300}
          data={data}
          margin={{ top: 20, right: 50, bottom: 30 }}
        >
          <CartesianGrid vertical={false} stroke="#000000" />
          <XAxis
            tickFormatter={formatNumber}
            dataKey={XAxisKey}
            tick={{ stroke: '#ffffff' }}
            stroke="#000000"
            axisLine={false}
            tickMargin={10}
            tickLine={false}
          />
          <YAxis tickFormatter={formatNumber} tick={{ stroke: '#ffffff' }} stroke="#000000" axisLine={false} tickMargin={10} />
          <Tooltip content={renderTooltip} />
          <Bar dataKey={YAxisKey}>
            {
              this.props.data && this.props.data.map((entry, index) => (
                <Cell key={index} fill={this.props.data[index].nec === highlightValue  ? '#5ff5fc' : '#005599' }/>
              ))
            }
          </Bar>
        </BarChart>
      </div>
    );
  }
}
