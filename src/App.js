import React from 'react';
import AppStylesScss from './App.module.scss';
import AppStylesCss from './App.module.css';
import Logo from './logo.gif';

class App extends React.Component {
  render() {
    return (
      <div className={`${AppStylesScss.app} global-color`}>
        <img alt="header" src={Logo} className="app-header" />
        <p className={AppStylesCss.welcomeMessage}>Welcome to react(ive)-starter-kit</p>
      </div>
    );
  }
}

export default App;
