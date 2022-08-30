import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      logUser: '',
    };
  }

  componentDidMount() {
    getUser().then((user) => {
      this.setState({
        logUser: user.name,
      });
    });
  }

  render() {
    const { logUser } = this.state;
    return (
      <div>
        <header data-testid="header-component" className="header">
          <h1> Trybe Tunes</h1>
          { logUser ? <p data-testid="header-user-name">{ logUser }</p> : <Loading /> }
        </header>
        <nav className="navbar">
          <Link data-testid="link-to-search" to="/search"> Pesquisar</Link>
          <Link data-testid="link-to-favorites" to="/favorites"> Favoritos</Link>
          <Link data-testid="link-to-profile" to="/profile"> Perfil </Link>
        </nav>
      </div>
    );
  }
}

export default Header;
