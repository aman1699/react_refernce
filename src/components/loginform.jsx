import React, { Component } from 'react';
import joi, { Joi } from 'joi-browser';
import Input from './common/input';
import axios from 'axios';
class Login extends Component {
    state = {
        account: { username: "", password: "", name:"" },
        errors: {}
    };
    schema = {
        username:joi.string().email().required().label('Username'),
        password: joi.string().required().label('Password'),
        name:  joi.string().required().label('Name')
    }
    validate = () => {
        const result=joi.validate(this.state.account, this.schema, {abortEarly:false}); //this result object return error property which is shown below after this line and path property=["username"] and message property={username is not allowed to be empty}.
        if (!result.error) return null;
        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    } //this validate function is used for whole form validation 
   
    handleSubmit = async e => {
        e.preventDefault();
        const errors = this.validate();  //this.validate() returns null if there is no error
        this.setState({ errors: errors || {} });
        try {
            await axios.post("http://localhost:3900/api/users", {
                email: this.state.account.username,
                name: this.state.account.name,
                password: this.state.account.password
            });
        }
        catch (ex) {
            if (ex.response && ex.response.status === 400)
                alert("user already registered");
               }
    };
    validProperty = (input) => {
        if (input.name === "username") {
            if (input.value.trim() === '') return "username is required"
        }
        if (input.name === "password") {
            if (input.value.trim() === '') return "password is required"
        }
        if (input.name === "name") {
            if (input.value.trim() === '') return "name is required"
        
        }//this validproperty function is for one fields when user removes everything from one field it gives notification below that field
    }
    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errormessage = this.validProperty(input);
        if (errormessage) errors[input.name] = errormessage;
        else delete errors[input.name];
        const account = { ...this.state.account };
        account[input.name] = input.value;
        this.setState({ account,errors });
    };
    
    render() { 
        return (
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input name="username" type='text' value={this.state.account.username} label="Username" autofocus onChange={this.handleChange} error={this.state.errors.username}/>
                    <Input name="password" type='password' value={this.state.account.password} label="Password" onChange={this.handleChange} error={this.state.errors.password} />
                    <Input name="name" type='text' value={this.state.account.name} label="Name" onChange={this.handleChange} error={this.state.errors.name}/>
                    <button disabled={this.validate()} className="btn btn-primary">Login</button>
                </form>
            </div>
            );
    }
}
 
export default Login;