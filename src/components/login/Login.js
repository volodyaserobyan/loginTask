import React from 'react';
import './login.css';
import { withTranslation } from "react-i18next";
import { connect } from 'react-redux';
import { compose } from 'redux';
let _ = require('lodash');

class Login extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            mail: '',
            password: '',
            errors:''
        }
        this.isSignedUp = false;
    }

    handleValidation = () => {
        let errors = {};
        let formIsValid = true;

        //Password
        if(this.state.password.length < 6){
            formIsValid = false;
            errors.password = "Password length must be greater than 7"
        }

        //mail
           let lastAtPos = this.state.mail.lastIndexOf('@');
           let lastDotPos = this.state.mail.lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.mail.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.mail.length - lastDotPos) > 2)) {
              formIsValid = false;
              errors.mail = "Email is not valid";
            }
       this.setState({errors: errors});
       return formIsValid;
   }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        e.preventDefault();
        if(this.handleValidation()){
            const info = {
                mail: this.state.mail,
                password: this.state.password
            }
            this.props.userListReducer.map((item, i) => {
                if(info.mail == item.email && info.password == item.password){
                    this.isSignedUp = true;
                    return;
                }
                else {
                    this.isSignedUp = false;
                }
            })
            if(this.isSignedUp == false) {
                alert('Login Fail')
            }
            else {
                alert('Login Success')
            }
        }
    }

    render() {
        const { t } = this.props;
        return(
            <>
                <div className='formContainer'>
                <form onSubmit={this.handleSubmit} className='loginForm'>
                    <h3>{t("Log In")}</h3>
                    <input placeholder={t("E-mail or phone")} name='mail' onChange={this.handleChange} value={this.state.mail} className='mail' required/>
                    {!this.state.errors.mail ? <></> : <span className='error' style={{color: 'red'}}>{t(this.state.errors.mail)}</span>}
                    <input placeholder={t("Password")} className='password' name='password' onChange={this.handleChange} value={this.state.password} type='password' required/>
                    {!this.state.errors.password ? <></> : <span className='error' style={{color: 'red'}}>{t(this.state.errors.password)}</span>}
                    <input type='submit' className='submitLogin' value={t('Log In')} />
                    <p>{t("Are you here for the first time?")}</p>
                </form>
                    <button onClick={() => this.props.handleSignUp({isSignUp: true})} className='btnSignUp'>{t("Sign Up")}</button>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    if (_.isEmpty(state)) {
        return {
            ...state
        };
    }
    else {
        return {
              userListReducer: state.users
        };
    }
}

export default compose(withTranslation(), connect(mapStateToProps))(Login);