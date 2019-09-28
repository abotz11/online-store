import React from 'react';
import './LoginForm.css'

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            textMsg: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:5000/register', {
            method: "post",
            credentials: 'include',
            body: JSON.stringify(this.state),
        }).then(res => res.json())
            .then(res => {
                if(res.massege == "OK"){
                    this.props.handler(this.state.username, true, res.maxAge)
                }else{
                    this.setState({textMsg: res})
                }
            })
            .catch(error => alert(error))

    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
            return(
        < div
            className = "inner-container" >
                {this.state.textMsg.length != 0 &&
                        <h3
                    style={{display: 'flex', justifyContent: 'center', color : 'red'}}> {this.state.textMsg} < /h3>
                }

                < div
        className = "header" > Register < /div>
                < form
            id = "myForm"
            onSubmit = {this.handleSubmit} >
                < div
            className = "box" >

                < div
            className = "input-group" >
                < label
            htmlFor = "username" > Username < /label>
                < input
            type = "text"
            name = "username"
            className = "login-input"
            placeholder = "Username"
            onChange = {this.handleChange}
            required / >
            < /div>

            < div
            className = "input-group" >
                < label
            htmlFor = "email" > Email < /label>
                < input
            type = "text"
            name = "email"
            className = "login-input"
            placeholder = "Email"
            onChange = {this.handleChange}
            required / >
            < /div>

            < div
            className = "input-group" >
                < label
            htmlFor = "password" > Password < /label>
                < input
            type = "password"
            name = "password"
            className = "login-input"
            placeholder = "Password"
            onChange = {this.handleChange}
            required / >
            < /div>

            < input
            type = "submit"
            className = "login-btn"
            value = "Register"
            / >
                < /div>
                < /form>
                < /div>
        )
    }
}

export default RegisterForm;