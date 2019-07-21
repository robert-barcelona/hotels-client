import React from 'react'



export default (props) => {
  const {title,description,checkin,checkout,checkinTime,checkoutTime,adults,children,cost,discountedCost} = props

  return <div className="col-md-8 sidebar purchasePage">
    <div className="card">
      <h3>You have now booked the following room!</h3>
      <div className="clearfix">
        <h5 className="pull-left">{title}</h5>
      </div>
      <div className="clearfix">
        <div className="card-content">
          <p className="main">Check in</p>
          <p className="base">From {checkinTime}.00h</p>
        </div>
        <div className="card-content">
          <p className="main">Check out</p>
          <p className="base">Before {checkoutTime}.00h</p>
        </div>
        <div className="card-content">
          <p className="main">Reservation date</p>
          <p className="base">From <strong><span
            id="checkin-summary">{checkin}</span></strong> to <strong
            id="checkout-summary">{checkout}</strong></p>
        </div>
        <div className="card-content">
          <p className="main">People</p>
          <p className="base" id="adults-summary">{adults} Adults</p>
          <p className="base" id="children-summary">{children} Children</p>
        </div>
        <div className="card-checkout clearfix">
          <div className="left pull-left">
            <p className="main">Total</p>
            <p className="base"><a href="#">Price details &gt;</a></p>
          </div>
          <div className="right pull-right">
           { discountedCost && <p className="main">€{discountedCost}</p>}
           { !discountedCost && <p className="main">€{cost}</p>}
          </div>
        </div>
        <a href="#" className="btn btn-primary btn-group-justified">
          Save
        </a>
      </div>
    </div>
  </div>
}
