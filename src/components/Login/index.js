// Login.js
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import {
  Container,
  FormContainer,
  Logo,
  Label,
  Input,
  CheckboxContainer,
  Checkbox,
  LoginButton,
  ErrorMsg,
  LogoContainer,
} from './LoginStyled'

class Login extends Component {
  state = {errorMsg: '', username: '', password: '', showPassword: false}

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      header: {'Content-Type': 'application/json'}, // FIXED
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 3})
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onChangeShowPassword = () =>
    this.setState(prev => ({showPassword: !prev.showPassword}))

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, showPassword, errorMsg} = this.state

    return (
      <Container>
        <FormContainer onSubmit={this.submitForm}>
          <LogoContainer>
            <Logo
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
            />
          </LogoContainer>

          <Label htmlFor="nameInput">USERNAME</Label>
          <Input
            id="nameInput"
            type="text"
            value={username}
            onChange={this.onChangeUsername}
            placeholder="Username"
          />

          <Label htmlFor="passwordInput">PASSWORD</Label>
          <Input
            id="passwordInput"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={this.onChangePassword}
            placeholder="Password"
          />

          <CheckboxContainer>
            <Checkbox
              id="checkboxInput"
              type="checkbox"
              onChange={this.onChangeShowPassword}
            />
            <Label htmlFor="checkboxInput">Show Password</Label>
          </CheckboxContainer>

          <LoginButton type="submit">Login</LoginButton>

          {errorMsg && <ErrorMsg>*{errorMsg}</ErrorMsg>}
        </FormContainer>
      </Container>
    )
  }
}

export default Login
