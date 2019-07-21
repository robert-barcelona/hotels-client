import React from 'react'



export default (props) => {
  const {title,description,checkin,checkout,checkinTime,checkoutTime,adults,children,cost,discountedCost} = props

  return <div className="col-md-4 sidebar">
    <div className="card">
      <h2>Reservation Summary</h2>
      <div className="clearfix">
        <h5 className="pull-left">{title}</h5>
        <div className="form-group pull-right">
          <select className="pull-right" id="rooms">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
          </select>
        </div>
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
