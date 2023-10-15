    import React, {useState} from 'react';
    import { Link } from 'react-router-dom';
    import validation from './userValidation';
    import authAPI from './authAPI';
    import './baseStyles.css';
    import { ToastContainer } from 'react-toastify';

    function LoginForm(){
        const[formData, setFormData] = useState({
            username: '',
            password: '',
        });

        const[errors, setErrors] = useState({
            username: '',
            password: '',
        });

        const handleInputChange = (e) => {
            const {name, value} = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        };

        const cleanErrors = (e) => {
            const {name} = e.target;
            setErrors({
                ...errors,
                [name]: '',
            });
        };

        const handleSubmit = async(e) => {
            e.preventDefault();
            
            const usernameError = validation.validateUsername(formData.username);
            const passwordError = validation.validatePassword(formData.password);

            if(usernameError ||  passwordError){
                setErrors({
                    password: passwordError,
                    username: usernameError,
                });
                return;
            }

            authAPI.login(formData)
        };

        return (
            <div className='main-container'>
                <div className='content-card'>
                    <h2>User Login</h2>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor='username'>Username</label>
                                <input 
                                    type='text' 
                                    name='username' 
                                    id='username' 
                                    onInput={handleInputChange}
                                    onFocus={cleanErrors}
                                />
                            <div className='error'>{errors.username}</div>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'>Password</label>
                                <input 
                                    type='password' 
                                    name='password' 
                                    id='password' 
                                    onInput={handleInputChange}
                                    onFocus={cleanErrors}
                                />
                            <div className='error'>{errors.password}</div>
                            </div>
                            <div className='button-container'>
                                <button type='submit'>Login</button>
                                <Link to={'/register'} className='link-button'>Sign Up</Link>
                                <ToastContainer/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    export default LoginForm;