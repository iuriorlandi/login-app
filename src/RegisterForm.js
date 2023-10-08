import React, { useState } from 'react';
import axios from 'axios';
import API_URL from './config'

function RegisterForm(){
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const{name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value,
        });
    };

    const cleanError = (e) =>{
        const{name} = e.target;
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const validateUsername = (username) => {
        const fieldName = 'Username'
        return validateRequired(username, fieldName)
            || validateMinLength(username, 6, fieldName) 
            || validateMaxLength(username, 50, fieldName)
    };

    const validatePassword = (password) => {
        const fieldName = 'Password'
        return validateRequired(password, fieldName)
            || validateMinLength(password, 6, fieldName) 
            || validateMaxLength(password, 50, fieldName)
    };

    const validateEmail = (email) => {
        const fieldName = 'E-mail'
        return validateRequired(email, fieldName)
            || validateMaxLength(email, 200, fieldName)
    };

    const validateRequired = (value, fieldName) => {
            return value ? '' : `${fieldName} is required.`
    };

    const validateMinLength = (value, minLength, fieldName) => {
        return value.length >= minLength ? '' : `${fieldName} minimum length is ${minLength} characters.`;
      };
      
    const validateMaxLength = (value, maxLength, fieldName) => {
        return value.length <= maxLength ? '' : `${fieldName} maximum length is ${maxLength} characters.`;
      };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const usernameError = validateUsername(formData.username);
        const passwordError = validatePassword(formData.password);
        const emailError = validateEmail(formData.email);
        
        if(usernameError ||  passwordError || emailError){
            setErrors({
                password: passwordError,
                username: usernameError,
                email: emailError
            });
            return;
        }

        try {

            const api = axios.create({
                baseURL: API_URL
            });

            const response = await api.post('User/register', formData);
      
            if (response.status === 200) {
              alert('Registration successful. You can now log in.');
            }
          } catch (error) {
            console.error('Error during registration:', error.message);
            alert('An error occurred during registration. Please check your network connection and try again.');
          }
    };

    return (
        <div>
            <h2>User Registration</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text' 
                            id='username' 
                            name='username'
                            value={formData.username}
                            onFocus={cleanError}
                            onChange={handleInputChange}/>
                        <div className='error'>{errors.username}</div>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password' 
                            name='password'
                            value={formData.password}
                            onFocus={cleanError}
                            onChange={handleInputChange}/>
                        <div className='error'>{errors.password}</div>
                    </div>
                    <div>
                        <label htmlFor='email'>E-mail</label>
                        <input
                            type='email'
                            id='email' 
                            name='email'
                            value={formData.email}
                            onFocus={cleanError}
                            onChange={handleInputChange}/>
                        <div className='error'>{errors.email}</div>
                    </div>
                    <button type='submit'>Register</button>
                </form>
            </div>
        </div>
    );
}
export default RegisterForm;
