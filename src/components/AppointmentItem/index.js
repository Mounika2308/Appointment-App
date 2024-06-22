// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {AppointmentDetails, clickingStar} = props
  const {id, title, date, isStarred} = AppointmentDetails
  console.log(title, date)

  const onClickStar = () => {
    clickingStar(id)
  }

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="appointment-item-container">
      <div className="appointment-item-top-container">
        <p className="appointment-item-title">{title}</p>
        <button
          data-testid="star"
          type="button"
          className="star-button"
          onClick={onClickStar}
        >
          <img src={starImgUrl} alt="star" />
        </button>
      </div>
      <p className="appointment-item-date">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
