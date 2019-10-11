import React from 'react';
import './App.css';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import { withTranslation } from 'react-i18next';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isSignUp: false,
      value: "en",
      isActiveEn: 'active',
      isActiveRu: ''
    }
  }

  handleSignUp = (obj) => {
    this.setState(obj)
  }

  detectLang = lang => {
    if (lang == 'en') {
      this.setState({
        isActiveEn: 'active',
        isActiveRu: '',
        value: 'en'
      })
      this.props.i18n.changeLanguage(lang);
    }
    else{
      this.setState({
        isActiveEn: '',
        isActiveRu: 'active',
        value: 'ru'
      })
      this.props.i18n.changeLanguage(lang);
    }
  }

  render() {
    const { t, i18n } = this.props;
    return (
      <div className="App">
        {/* <p>{t('my translated text')}</p> */}
        <div className='languages'>
          <button onClick={() => this.detectLang('en')} className={`en ${this.state.isActiveEn}`}>en</button>
          <button onClick={() => this.detectLang('ru')} className={`ru ${this.state.isActiveRu}`}>ru</button>
        </div>
        {this.state.isSignUp ? <SignUp handleSignUp={this.handleSignUp} /> : <Login handleSignUp={this.handleSignUp} />}
      </div>
    );
  }
}

export default withTranslation()(App);
