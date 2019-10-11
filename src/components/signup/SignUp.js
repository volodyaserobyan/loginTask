import React from 'react';
import { connect } from 'react-redux';
import './signup.css';
import { loadUsers, setUsers } from '../../action/Action';
import { withTranslation } from "react-i18next";
import { compose } from 'redux';
let _ = require('lodash');

class SignUp extends React.Component{

    constructor(props) {
        super(props)

        this.state = { 
            mail: '',
            password: '',
            confirmPassword: '',
            name: '',
            errors: ''
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleValidation = () => {
        let errors = {};
        let formIsValid = true;

        //Password
        if(this.state.password.length < 6){
            formIsValid = false;
            errors.password = "Password length must be greater than 7"
        }

        //ConfirmPassword
        if(this.state.password != this.state.confirmPassword){
            formIsValid = false;
            errors.confirmPass = "Password and Confirm Password must be the same"
        }

        //Name
           if(!this.state.name.match(/^[a-zA-Z]+$/) || this.state.name[0] != this.state.name[0].toUpperCase()){
              formIsValid = false;
              errors.name = "Only letters with capital 1st letter";
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

   handleSubmit = e => {
        e.preventDefault();
        if(this.handleValidation()) {
            const sendObj = {
                email: this.state.mail,
                password: this.state.password,
                confPass: this.state.confirmPassword,
                name: this.state.name
            }
            this.props.loadUsers(sendObj)
            this.props.handleSignUp({isSignUp: false})
        }
   }

    render() {
        const { t } = this.props;
        return(
            <>
                <div className='formContainerSignUp'>
                <form onSubmit={this.handleSubmit} className='signupForm'>
                    <h3>{t('Sign Up')}</h3>
                    <input placeholder={t('Enter your e-mail')} name='mail' value={this.state.mail} onChange={this.handleChange} className='mail' required/>
                    {!this.state.errors.mail ? <></> : <span className='error' style={{color: 'red'}}>{t(this.state.errors.mail)}</span>}
                    <input placeholder={t('Enter your password')} name='password' value={this.state.password} onChange={this.handleChange} className='password' type='password' required/>
                    {!this.state.errors.password ? <></> : <span className='error' style={{color: 'red'}}>{t(this.state.errors.password)}</span>}
                    <input placeholder={t('Confirm Password')} name='confirmPassword' value={this.state.confirmPassword} onChange={this.handleChange} className='confPassword' type='password' required/>
                    {!this.state.errors.confirmPass ? <></> : <span className='error' style={{color: 'red'}}>{t(this.state.errors.confirmPass)}</span>}
                    <input placeholder={t('Enter your name')} name='name' value={this.state.name} onChange={this.handleChange} className='name' required/>
                    {!this.state.errors.name ? <></> : <span className='error' style={{color: 'red'}}>{t(this.state.errors.name)}</span>}
                    <input type='submit' className='submitsignup' value={t('Sign Up')} />
                    <p>{t('Already registered?')}</p>
                </form>
                    <button onClick={() => this.props.handleSignUp({isSignUp: false})} className='btnLogin'>{t('Log In')}</button>
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
            
        };
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUsers: (data) => dispatch(loadUsers(data)),
        setUsers: (data) => dispatch(setUsers(data))
    }
}

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProps))(SignUp);