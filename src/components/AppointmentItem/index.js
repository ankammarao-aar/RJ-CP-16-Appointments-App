// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onChangeStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const likeImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    onChangeStarred(id)
  }
  return (
    <li className="list-item">
      <div className="container">
        <p className="title">{title}</p>
        <button
          type="button"
          className="star-button"
          onClick={onClickStar}
          data-testid="star"
        >
          <img src={likeImage} alt="star" className="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
