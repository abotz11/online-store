import React from 'react';
import './LoginForm.css'
// const fetch = require("node-fetch");

class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            rememberMe: false,
            textMsg: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:5000/login', {
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
        if([e.target.name] == "rememberMe"){
            this.setState({
                [e.target.name]: e.target.checked
            })
        }else{
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    }


    render() {
        return (
            <div className="inner-container">
                {this.state.textMsg.length != 0 &&
                    <h3
                        style={{display: 'flex', justifyContent: 'center', color : 'red'}}>
                        {this.state.textMsg}
                    < /h3>
                }
                <div className="header">Login</div>
                <form id="myForm" onSubmit={this.handleSubmit}>
                <div className="box">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="login-input"
                            placeholder="Username"
                            onChange={this.handleChange}
                            required/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="login-input"
                            placeholder="Password"
                            onChange={this.handleChange}
                            required/>
                    </div>
                    <div className="checkbox">
                        <label htmlFor="checkmark">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                className="checkmark"
                                onChange={this.handleChange}
                                />
                            </label>
                            <span>  Remember Me</span>
                    </div>

                    <input
                        type="submit"
                        className="login-btn"
                        value="Login"
                        />

                    </div>
                </form>
            </div>
        );
    }
}

export default LoginForm;