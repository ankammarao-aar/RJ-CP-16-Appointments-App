// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {inputTitle: '', inputDate: '', appointmentList: [], isActive: false}

  onChangeInputText = event => {
    this.setState({inputTitle: event.target.value})
  }

  onChangeInputDate = event => {
    this.setState({inputDate: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()

    const {inputTitle, inputDate} = this.state
    const formatDate = inputDate
      ? format(new Date(inputDate), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: inputTitle,
      date: formatDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      inputTitle: '',
      inputDate: '',
    }))
  }

  onChangeStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  getFilteredAppointmentList = () => {
    const {appointmentList, isActive} = this.state

    if (isActive) {
      return appointmentList.filter(each => each.isStarred === true)
    }
    return appointmentList
  }

  onIsActive = () => {
    const {isActive} = this.state
    this.setState({isActive: !isActive})
  }

  render() {
    const {inputTitle, inputDate} = this.state
    const filteredAppointmentList = this.getFilteredAppointmentList()

    return (
      <div className="bg-container">
        <div className="card">
          <div className="add-container">
            <form className="form" onSubmit={this.addAppointment}>
              <div className="input-card">
                <h1 className="heading">Add Appointment</h1>
                <label htmlFor="text-input" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="text-input"
                  placeholder="Title"
                  className="input"
                  value={inputTitle}
                  onChange={this.onChangeInputText}
                />
              </div>
              <div className="input-card">
                <label htmlFor="date-input" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date-input"
                  className="input"
                  value={inputDate}
                  onChange={this.onChangeInputDate}
                />
              </div>
              <div>
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-img"
            />
          </div>
          <hr className="line" />

          <div className="bottom-card">
            <h1 className="name">Appointments</h1>
            <button
              type="button"
              className="stared-button"
              onClick={this.onIsActive}
            >
              Starred
            </button>
          </div>

          <ul className="list-container">
            {filteredAppointmentList.map(each => (
              <AppointmentItem
                key={each.id}
                appointmentDetails={each}
                onChangeStarred={this.onChangeStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
