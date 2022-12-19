import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import ListItem from '../ListItem'

import './index.css'

export default class PasswordManager extends Component {
  state = {
    websiteInput: '',
    userNameInput: '',
    passwordInput: '',
    userDetailsList: [],
    searchInput: '',

    checked: false,
  }

  onWebsite = event => {
    this.setState({
      websiteInput: event.target.value,
    })
  }

  onUsername = event => {
    this.setState({
      userNameInput: event.target.value,
    })
  }

  onPassword = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  onCheckBox = () => {
    this.setState(prevState => ({
      checked: !prevState.checked,
    }))
  }

  submitForm = event => {
    const {websiteInput, userNameInput, passwordInput} = this.state
    event.preventDefault()

    const backgroundColorsList = [
      'red',
      'blue',
      'green',
      'white',
      'violet',
      'indigo',
      'yellow',
    ]
    const randInt = Math.floor(Math.random() * 8)
    const colorText = backgroundColorsList[randInt]

    const objectItem = {
      id: uuidv4(),
      website: websiteInput,
      userName: userNameInput,
      password: passwordInput,
      randomColor: colorText,
    }
    this.setState(prevState => ({
      userDetailsList: [...prevState.userDetailsList, objectItem],
      websiteInput: '',
      userNameInput: '',
      passwordInput: '',
    }))
  }

  deleteListObject = id => {
    const {userDetailsList} = this.state
    const filteredList = userDetailsList.filter(
      eachObject => eachObject.id !== id,
    )
    this.setState({
      userDetailsList: filteredList,
    })
  }

  searchFunctionForListItems = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  render() {
    const {
      websiteInput,
      userNameInput,
      passwordInput,
      userDetailsList,
      showPasswordsButtonClicked,
      checked,
      searchInput,
    } = this.state

    console.log(userDetailsList)

    const searchedList = userDetailsList.filter(eachObject =>
      eachObject.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    let resultView
    if (userDetailsList.length === 0 || searchedList.length === 0) {
      resultView = (
        <div className="no-results-container">
          <img
            className="no-password-image"
            alt="no passwords"
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          />
          <p className="no-passwords-heading">No Passwords</p>
        </div>
      )
    } else {
      resultView = (
        <ul className="unordered-list-container">
          {searchedList.map(eachObject => (
            <ListItem
              key={eachObject.id}
              eachObject={eachObject}
              showPasswordsButtonClicked={showPasswordsButtonClicked}
              checked={checked}
              deleteListObject={this.deleteListObject}
            />
          ))}
        </ul>
      )
    }

    return (
      <div className="bg-container">
        <img
          className="image-password-manager"
          alt="app logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        />
        <div className="container-1">
          <div className="form-container">
            <form onSubmit={this.submitForm}>
              <h1 className="form-heading">Add New Password</h1>
              <div className="first-input-container">
                <div className="website-image-for-input-container">
                  <img
                    className="website-image-for-input"
                    alt="website"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  />
                </div>
                <input
                  onChange={this.onWebsite}
                  value={websiteInput}
                  className="website-input"
                  type="text"
                  placeholder="Enter Website"
                />
              </div>
              <div className="first-input-container">
                <div className="website-image-for-input-container">
                  <img
                    className="website-image-for-input"
                    alt="username"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  />
                </div>
                <input
                  value={userNameInput}
                  onChange={this.onUsername}
                  className="website-input"
                  type="text"
                  placeholder="Enter Username"
                />
              </div>
              <div className="first-input-container">
                <div className="website-image-for-input-container">
                  <img
                    className="website-image-for-input"
                    alt="password"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  />
                </div>
                <input
                  value={passwordInput}
                  onChange={this.onPassword}
                  className="website-input"
                  type="password"
                  placeholder="Enter Password"
                />
              </div>
              <div className="add-button-container">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <img
            className="key-image"
            alt="password manager"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
          />
        </div>
        <div className="container-2">
          <div className="container-2-1">
            <div className="your-password-container">
              <h1 className="heading-passwords">Your Passwords</h1>
              <p className="count-paragraph">{userDetailsList.length}</p>
            </div>
            <div className="search-input-container">
              <div className="search-image-container">
                <img
                  className="search-image"
                  alt="search"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  placeholder="Search"
                />
              </div>
              <input
                onChange={this.searchFunctionForListItems}
                type="search"
                placeholder="Search"
                className="search-input-element"
              />
            </div>
          </div>
          <div className="container-2-2">
            <input
              value={checked}
              onChange={this.onCheckBox}
              className="check-box-input-element"
              id="check-box"
              type="checkbox"
            />
            <div>
              <label htmlFor="check-box" className="show-password-heading">
                Show Passwords
              </label>
            </div>
          </div>
          <div className="container-2-3">{resultView}</div>
        </div>
      </div>
    )
  }
}
