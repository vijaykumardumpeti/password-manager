import {Component} from 'react'
import './index.css'

export default class ListItem extends Component {
  render() {
    const {
      eachObject,
      deleteListObject,
      showPasswordsButtonClicked,
      checked,
    } = this.props
    const {id, website, userName, password, randomColor} = eachObject
    console.log(checked)

    let starsImageOrPassword
    if (showPasswordsButtonClicked === true || checked === true) {
      starsImageOrPassword = <p>{password}</p>
    } else {
      starsImageOrPassword = (
        <img
          className="stars-image"
          alt="stars"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        />
      )
    }

    this.deletingTheItem = () => {
      deleteListObject(id)
    }

    return (
      <li className="list-item-container">
        <div className={`profile-image-container ${randomColor}`}>
          <p>{userName[0]}</p>
        </div>
        <div className="details-container">
          <p>{website}</p>
          <p>{userName}</p>
          {starsImageOrPassword}
        </div>
        <div className="delete-button-container">
          <button
            onClick={this.deletingTheItem}
            className="delete-button-container"
            type="button"
          >
            <img
              className="delete-button-image"
              alt="delete"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            />
          </button>
        </div>
      </li>
    )
  }
}
