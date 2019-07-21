import React, { Component } from 'react'
import Datetime from 'react-datetime'
import { addDays, format } from 'date-fns'
import Swal from 'sweetalert2'
import { searchAvailability } from '../logic'
import { eeuu2EuDate, isAfterDateEU, eu2EeuuDate } from '../utils'
import Room from './Room'
import Sidebar from './Sidebar'
import PurchasePage from './PurchasePage'

class Main extends Component {


  state = {
    checkin: '',
    checkout: '',
    error: '',
    availabilityCursor: 0,
    promo_code: 'THN30',
    available: [],
    currentRoom: null,
  }

  adultsRef = React.createRef()
  childrenRef = React.createRef()

  onCheckInChange = momentObject => {
    this.setState({ checkin: momentObject.format('DD-MM-YYYY') })
  }
  onCheckOutChange = momentObject => this.setState({ checkout: momentObject.format('DD-MM-YYYY') })


  makePurchase = () => {
   const {state:{checkin,checkout,currentRoom:{title,cost,discountedCost}}} = this

    const total = discountedCost ? discountedCost : cost

    Swal.fire({
      title: 'Room booked!',
      text: `You have now booked ${title} from ${checkin} to ${checkout} for a total cost of ${total}€`,
    })

  }


  setError = error => {
    this.setState({ error })
  }

  setCurrentRoom = index => {
    const { state: { available } } = this
    if (available) {
      if (index <= available.length - 1) {
        this.setState({ currentRoom: available[index] })
      }
    } else {
      this.setState({ currentRoom: null })
    }
  }

  getAvailable = async (adults, children, checkin, checkout, promo_code) => {
    const { setError } = this

    setError('')

    const checkinEeuu = eu2EeuuDate(checkin)
    const checkoutEeuu = eu2EeuuDate(checkout)

    try {
      return searchAvailability(adults, children, checkinEeuu, checkoutEeuu, promo_code)
    } catch (e) {
      setError(`${e.message}`)
    }
  }

  onModify = async (e) => {
    const { state: { promo_code, checkin, checkout }, setError, getAvailable, adultsRef, childrenRef, } = this

    e.preventDefault()

    const adults = adultsRef.current.value
    const children = childrenRef.current.value

    if (adults === '0' && children === '0') {
      return setError('You have not specified any guests')
    }

    if (!(isAfterDateEU(checkout, checkin))) return setError('Checkout date must be after checkin date')
    try {
      const available = await getAvailable(adults, children, checkin, checkout, promo_code)
      this.setState({ available })
    } catch (e) {
      setError(e.message)
    }
  }

  async componentDidMount() {

    const { state: { promo_code }, getAvailable, setError } = this
    const today = format(new Date(), 'dd-MM-yyyy')
    const tomorrow = format(addDays(new Date(), 1), 'dd-MM-yyyy')

    this.setState({
      checkin: today,
      checkout: tomorrow
    })
    try {
      const available = await getAvailable(1, 1, today, tomorrow, promo_code)
      this.setState({ available })
      if (available) this.setState({ currentRoom: available[0] })
    } catch (e) {
      setError(e.message)
    }
  }

  render() {
    const { state: {purchaseMade, currentRoom, error, checkin, checkout, available }, onModify, onCheckInChange, onCheckOutChange, adultsRef, childrenRef } = this
    let adults
    let children

    if (adultsRef && adultsRef.current) adults = adultsRef.current.value
    if (childrenRef && childrenRef.current) children = childrenRef.current.value

    return <div>
      <nav className="navbar navbar-fixed-top text-center">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#navbar"
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
       <div>
        <div className="engine text-center">
          <div className="engine-wrapper">
            <div className="container text-center">
              <form id="search" className="form-inline" onSubmit={onModify}>
                <div className="form-group">
                  <div className="input-group date" data-date-format="dd/mm/yyyy">
                    {/*<input id="checkin" type="text" className="form-control" placeholder="Check in"/>*/}
                    <Datetime onChange={onCheckInChange} value={checkin} placeholder={'Check in'}
                              dateFormat={'DD-MM-YYYY'} timeFormat={false}/>
                    <div className="input-group-addon">
                      <span className="glyphicon glyphicon-calendar"/>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group date" data-date-format="dd/mm/yyyy">
                    <Datetime onChange={onCheckOutChange} value={checkout} placeholder={'Check out'}
                              dateFormat={'DD-MM-YYYY'} timeFormat={false}/>
                    <div className="input-group-addon">
                      <span className="glyphicon glyphicon-calendar"/>
                    </div>
                  </div>
                </div>
                <div className="form-group select-inline">
                  <select ref={this.adultsRef} defaultValue={1} className="form-control"
                          placeholder="Adults" id="adults">
                    <option value={0}>Adults</option>
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
                  <select ref={this.childrenRef} defaultValue={1} className="form-control"
                          placeholder="Children"
                          id="children">
                    <option value={0}>Children</option>
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
          {error && <div className={'row'}>
            <div className="alert alert-warning" role="alert">
              {`There's been a problem: ${error}`}
            </div>
          </div>}
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

              {/* ROOMS */}
              {available.length !== 0  && available.map((room, index) => <Room
                onClick={e => this.setCurrentRoom(index)} key={room.title}   {...room}/>)}
              {available.length === 0 && 'No rooms available for these criteria'}
            </div>
            {/* SIDEBAR */}
            {currentRoom && <Sidebar makePurchase={this.makePurchase} adults={adults} children={children} checkin={checkin}
                                     checkout={checkout} {...currentRoom} />}
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
