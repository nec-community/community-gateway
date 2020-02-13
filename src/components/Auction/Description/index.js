import React, { useState, useEffect } from 'react'
import '../Auction.scss';

const AuctionDescription = ({ closeDescription, visible }) => {
  return visible && (
    <div className="overview__description">
      <p>
        Every week the necBurn smart contract facilitates an auction the ‘necBurn’ whereby it sells off a percentage of the revenues gathered from trading fees on DeversiFi (in ETH) in the previous  week in exchange for NEC tokens which then get destroyed - ‘burnt’.
      </p>

      <p>
        The auctions start on Thursday of each week and last 7 days or until the accumulated funds are  sold out. The opening NEC/ETH price of the auction is half the price at which the previous  auction ended and it increases incrementally 5 times per day.
      </p>

      <p>
        The portion of DeversiFi trading fee revenues dedicated to the auction is determined by the  following schedule. <a target="__blank" href="https://nectar.community/whitepaper#page=17">Click here</a>
        </p>

        <p>
        For the purposes of the necBurn auction revenues from DeversiFi trading fees are defined as  trading fees collected from users minus on-chain settlement costs minus external liquidity  provider costs if one exists.
        </p>
      <div className="overview__close">
        <button onClick={closeDescription}>CLOSE</button>
      </div>
    </div>
  )
}


export default AuctionDescription
