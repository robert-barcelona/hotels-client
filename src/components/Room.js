import React from 'react'


export default (props) => {
  const {onClick, title,img,description,cost,discountedCost,beds,people,size} = props
  return <div onClick={onClick} className="card clearfix pointer active">
    <div className="room-image">
      <img src={img} className={'room-image'} width="80%"/>
    </div>
    <div className="room-content">
      <h5 className="form-group">{title}</h5>
      <p className="form-group">{description}</p>
      <p className="form-group">Size: {size}m2</p>
      <div className="room-info">
        <div className="item">
                      <span className="inline-block">
                        <img src="images/icons/double-bed.svg" width={40}/>
                      </span>
          <div>Beds: {beds}</div>
        </div>
        <div className="item">People: {people}</div>
        <div className="item price text-right">
         { discountedCost && <p className="new-line-through">{cost}€</p>}
          {discountedCost && `${discountedCost}€`}
          {!discountedCost && `${cost}€`}
        </div>
      </div>
    </div>
  </div>
}
