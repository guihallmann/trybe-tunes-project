import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components.js/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = ({
      loginName: '',
      loginBtnDisable: true,
      loadingStatus: false,
      shouldRedirect: false,
    });

    this.onInputChange = this.onInputChange.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.loginValidation);
  }

  onLoginClick() {
    const { loginName } = this.state;
    this.setState({
      loadingStatus: true,
    });
    createUser({ name: loginName }).then(() => { // O .then foi dica do Brenno, pois createUser retorna uma promise
      this.setState({
        shouldRedirect: true,
      });
    });
  }

  loginValidation() {
    const LOGIN_MIN_SIZE = 3;
    const { loginName } = this.state;
    if (loginName.length >= LOGIN_MIN_SIZE) {
      this.setState({ loginBtnDisable: false });
    } else {
      this.setState({ loginBtnDisable: true });
    }
  }

  render() {
    const { loginName, loginBtnDisable, loadingStatus, shouldRedirect } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/search" />;
    }
    if (loadingStatus) {
      return <Loading />;
    }
    return (
      <div data-testid="page-login">
        <form>
          <h1>Login</h1>
          <input
            type="text"
            id="login-name-input"
            name="loginName"
            data-testid="login-name-input"
            value={ loginName }
            onChange={ this.onInputChange }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ loginBtnDisable }
            onClick={ this.onLoginClick }
          >
            Entrar
          </button>
        </form>
      </div>);
  }
}

export default Login;
