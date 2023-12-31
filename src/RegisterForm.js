import React, { useState } from 'react';
import validation from './userValidation';
import authAPI from './authAPI';
import { Link } from 'react-router-dom';
import './baseStyles.css'
import { ToastContainer } from 'react-toastify';

function RegisterForm(){
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        email: ''
    });

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

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const usernameError = validation.validateUsername(formData.username);
        const passwordError = validation.validatePassword(formData.password);
        const emailError = validation.validateEmail(formData.email);
        
        if(usernameError ||  passwordError || emailError){
            setErrors({
                password: passwordError,
                username: usernameError,
                email: emailError
            });
            return;
        }
        
        authAPI.register(formData);
    };

    return (
        <div className='main-container'>
            <div className='content-card'>
                <h2>User Registration</h2>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
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
                        <div className='form-group'>
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
                        <div className='form-group'>
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
                        <div className='button-container'>
                            <button type='submit'>Register</button>
                            <Link to={'/'} className='link-button'>Sign In</Link>
                            <ToastContainer/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default RegisterForm;
