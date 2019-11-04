import React from 'react';
import pdf from './NEC 2.0 WP V1.4.pdf';
import './WhitePaper.scss';

export default ({ location }) => (
  <div className="whitepaper">
    <div className="container">
      <h1>Whitepaper</h1>
      <embed src={pdf + location.hash} width="100%" height="800" frameBorder="0" allowFullScreen />
    </div>
  </div>
);
