import React from 'react';
import pdf from './NEC 2.0 WP V1.4.pdf';
import './WhitePaper.scss';

export default ({ location }) => (
  <div className="whitepaper">
    <div className="container">
      <div className="section__title">
        <span>Whitepaper</span>
      </div>
      <div className="whitepaper__document">
        <embed src={pdf + location.hash} width="700px" height="800" frameBorder="0" allowFullScreen />
      </div>
    </div>
  </div>
);
