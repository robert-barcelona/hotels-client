import React, {Component} from 'react'
import Datetime from 'react-datetime'
import {addDays, format} from 'date-fns'

class Main extends Component {

  onCheckInChange = checkin => this.setState({checkin})
  onCheckOutChange = checkout => this.setState({checkout})


  setError = error => {
    this.setState({error})
  }

  onModify = async (e) => {
    const {state: {checkin, checkout},setError, adultsRef, childrenRef} = this
    let adults = adultsRef.current.value
    let children = childrenRef.current.value

    e.preventDefault()

    if (adults === 0 && children === 0) {
      console.log(adults,children)

      setError('You must have either children or adults')
      return
    }
    console.log(adults,children)

  }


  adultsRef = React.createRef();
  childrenRef = React.createRef();


  componentDidMount() {
    const today = format(new Date(), 'dd-MM-yyyy')
    const tomorrow = format(addDays(new Date(), 1), 'dd-MM-yyyy')

    this.setState({checkin: today, checkout: tomorrow})

  }


  state = {

    checkin: '',
    checkout: '',
    error: ''
  }

  render() {
    const {state: {adults, children, checkin, checkout}, onModify, onCheckInChange, onCheckOutChange} = this

    return <div>
      <nav className="navbar navbar-fixed-top text-center">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                    aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>
            <a className="navbar-brand visible-xs-block" href="index.html">
              <img src="images/cocos/logo_mobile.png" alt="LosCocos" height={36}/>
            </a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><a href="#">Home</a></li>
              <li><a href="#">Rooms</a></li>
              <li><a href="#">Restaurant</a></li>
              <li className="hidden-xs">
                <a href="index.html">
                  <img src="images/cocos/logo.png" alt="LosCocos" height={36}/>
                </a>
              </li>
              <li><a href="#">Weddings</a></li>
              <li><a href="#">Membership</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="engine text-center">
        <div className="engine-wrapper">
          <div className="container text-center">
            <form id="search" className="form-inline" onSubmit={onModify}>
              <div className="form-group">
                <div className="input-group date" data-date-format="dd/mm/yyyy">
                  {/*<input id="checkin" type="text" className="form-control" placeholder="Check in"/>*/}
                  <Datetime onChange={onCheckInChange} value={checkin} placeholder={'Check in'}
                            dateFormat={"DD-MM-YYYY"} timeFormat={false}/>
                  <div className="input-group-addon">
                    <span className="glyphicon glyphicon-calendar"/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group date" data-date-format="dd/mm/yyyy">
                  <Datetime onChange={onCheckOutChange} value={checkout} placeholder={'Check out'}
                            dateFormat={"DD-MM-YYYY"} timeFormat={false}/>
                  <div className="input-group-addon">
                    <span className="glyphicon glyphicon-calendar"/>
                  </div>
                </div>
              </div>
              <div className="form-group select-inline">
                <select ref={this.adultsRef} defaultValue={0} className="form-control" placeholder="Adults" id="adults">
                  <option value={0} >Adults</option>
                  <option value={1}>Adults: 1</option>
                  <option value={2}>Adults: 2</option>
                  <option value={3}>Adults: 3</option>
                  <option value={4}>Adults: 4</option>
                  <option value={5}>Adults: 5</option>
                  <option value={6}>Adults: 6</option>
                  <option value={7}>Adults: 7</option>
                  <option value={8}>Adults: 8</option>
                  <option value={9}>Adults: 9</option>
                </select>
              </div>
              <div className="form-group select-inline">
                <select ref={this.childrenRef}  defaultValue={0}  className="form-control" placeholder="Children" id="children">
                  <option value={0} >Children</option>
                  <option value={1}>Children: 1</option>
                  <option value={2}>Children: 2</option>
                  <option value={3}>Children: 3</option>
                  <option value={4}>Children: 4</option>
                  <option value={5}>Children: 5</option>
                  <option value={6}>Children: 6</option>
                  <option value={7}>Children: 7</option>
                  <option value={8}>Children: 8</option>
                  <option value={9}>Children: 9</option>
                </select>
              </div>
              <div className="form-group">
                <a href="#" onClick={onModify} className="btn btn-primary">Modify</a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container rar-summary">
        <div className="row">
          <div className="col-md-8 main">
            <h2>Rooms &amp; Rates</h2>
            <p className="subtitle">Plan your perfect stay at our hotel</p>
            <img src="images/cocos/wizard_1.png" width={480} className="wizard"/>
          </div>
          <div className="col-md-4 sidebar-header"/>
        </div>
        <div className="row">
          <div className="col-md-8 main">
            {/* ROOM 1 */}
            <div className="card clearfix pointer active">
              <div className="room-image">
                <img src="images/cocos/room_1.png" width="100%"/>
              </div>
              <div className="room-content">
                <h5 className="form-group">Mini Dreamy Room</h5>
                <p className="form-group">Generous and comfortable these modern furnished rooms offer two queen-size
                  beds and are on the first floor.</p>
                <p className="form-group">Size: 25m2</p>
                <div className="room-info">
                  <div className="item">
                      <span className="inline-block">
                        <img src="images/icons/double-bed.svg" width={40}/>
                      </span>
                    <div>Beds: 1</div>
                  </div>
                  <div className="item">People: 2</div>
                  <div className="item price text-right">
                    <span className="line-through">€400</span>
                    €350
                  </div>
                </div>
              </div>
            </div>
            {/* ROOM 2 */}
            <div className="card clearfix pointer">
              <div className="room-image">
                <img src="images/cocos/room_2.png" width="100%"/>
              </div>
              <div className="room-content">
                <h5 className="form-group">Sweet Bungalow</h5>
                <p className="form-group">The perfect blend of comfort and culture, our superior room with a central
                  garden view has the stunning, and comes with a double bed.</p>
                <p className="form-group">Size: 50m2</p>
                <div className="room-info">
                  <div className="item">
                      <span className="inline-block">
                        <img src="images/icons/double-bed.svg" width={40}/>
                      </span>
                    <div>Beds: 1</div>
                  </div>
                  <div className="item">People: 2</div>
                  <div className="item price text-right">
                    <span className="line-through">€500</span>
                    €400
                  </div>
                </div>
              </div>
            </div>
            {/* ROOM 3 */}
            <div className="card clearfix pointer">
              <div className="room-image">
                <img src="images/cocos/room_3.png" width="100%"/>
              </div>
              <div className="room-content">
                <h5 className="form-group">Los Cocos Suite</h5>
                <p className="form-group">If you want a little extra from your stay, you might like our superior rooms.
                  A garden view room has a private patio and a double bed.</p>
                <p className="form-group">Size: 125m2</p>
                <div className="room-info">
                  <div className="item">
                      <span className="inline-block">
                        <img src="images/icons/double-bed.svg" width={40}/>
                      </span>
                    <div>Beds: 3</div>
                  </div>
                  <div className="item">People: 4</div>
                  <div className="item price text-right">
                    <span className="line-through">€750</span>
                    €600
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* SIDEBAR */}
          <div className="col-md-4 sidebar">
            <div className="card">
              <h2>Reservation Summary</h2>
              <div className="clearfix">
                <h5 className="pull-left">Mini Dreamy Room</h5>
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
                  <p className="base">From 15.00h</p>
                </div>
                <div className="card-content">
                  <p className="main">Check out</p>
                  <p className="base">Before 12.00h</p>
                </div>
                <div className="card-content">
                  <p className="main">Reservation date</p>
                  <p className="base">From <strong><span id="checkin-summary">4/7/2018</span></strong> to <strong
                    id="checkout-summary">15/7/2018</strong></p>
                </div>
                <div className="card-content">
                  <p className="main">People</p>
                  <p className="base" id="adults-summary">2 Adults</p>
                  <p className="base" id="children-summary">2 Children</p>
                </div>
                <div className="card-checkout clearfix">
                  <div className="left pull-left">
                    <p className="main">Total</p>
                    <p className="base"><a href="#">Price details &gt;</a></p>
                  </div>
                  <div className="right pull-right">
                    <p className="main">€350</p>
                  </div>
                </div>
                <a href="#" className="btn btn-primary btn-group-justified">
                  Save
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <span className="ico ico-logo"/>
        <span className="ico ico-social"/>
        <div className="text-left col-left">
          <ul className="inline-block">
            <li>
              <a href="#">Terms &amp; Conditions</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Partners</a>
            </li>
          </ul>
        </div>
        <div className="text-right col-right">
          <ul className="inline-block">
            <li className="link">
              <a href="#">reservations@loscocosbungalows.com</a>
            </li>
            <li className="link">
              <a href="#">Tlf: +34 987 675 432</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>


  }


}


export default Main
