// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentList: [],
    isFilterActive: false,
  }

  titleChange = e => {
    this.setState({title: e.target.value})
  }

  onDateChange = e => {
    this.setState({date: e.target.value})
  }

  addAppointment = e => {
    const {title, date} = this.state
    e.preventDefault()
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  clickingStar = id => {
    const {appointmentList} = this.state
    this.setState({
      appointmentList: appointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    })
  }

  starredButton = () => {
    this.setState(prevState => ({isFilterActive: !prevState.isFilterActive}))
  }

  filterAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {title, date, isFilterActive} = this.state
    const filterClass = isFilterActive
      ? 'appointments-starred-heading-active'
      : 'appointments-starred-heading'

    const filteredAppointments = this.filterAppointmentList()

    return (
      <div className="appointment-app-main-container">
        <div className="appointment-app-sub-container">
          <div className="appointment-app-top-container">
            <form className="form-container" onSubmit={this.addAppointment}>
              <h1 className="appointments-heading">Add Appointment</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                placeholder="Title"
                id="title"
                className="form-input"
                onChange={this.titleChange}
                value={title}
                required
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                type="date"
                placeholder="dd/mm/yyyy"
                id="date"
                className="form-input"
                onChange={this.onDateChange}
                value={date}
                required
              />
              <button type="submit" className="form-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="line" />
          <div className="appointment-starred-container">
            <h1 className="appointments-heading">Appointments</h1>
            <button
              type="button"
              className={filterClass}
              onClick={this.starredButton}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-main-list-container">
            {filteredAppointments.map(eachAppointment => (
              <AppointmentItem
                AppointmentDetails={eachAppointment}
                clickingStar={this.clickingStar}
                key={eachAppointment.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
