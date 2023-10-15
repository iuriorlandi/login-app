import API_URL from './config';
import axios from 'axios';
import cookies from 'js-cookies';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const register = async (formData) =>{
    try {
        const api = axios.create({
            baseURL: API_URL
            });

        const response = await api.post('User/register', formData);
    
        if (response.status === 200) {
            toast.success('Registration successful. You can now log in.', {position: 'top-center'});
        }
    } 
    catch (error) {
        if(!error.response || error.response.status === 500){
            console.error('Error during registration:', error.message);
            toast.error('An error occurred during registration. Please check your network connection and try again.', {position: 'top-center'});
        }
        else{
            console.error('Error during registration:', error.message);
            toast.error(`An error occurred during registration. ${extractErrorMessage(error.response.data)}`, {position: 'top-center'});
        }
    }
}

const login = async (formData) =>{
    try{
        const api = axios.create({
            baseURL: API_URL
        });

        const response = await api.post('Auth/login', formData);
    
        const token = response.data.data.token;
        cookies.setItem('auth-token', token);

        if (response.status === 200) {
            toast.success('Login successful.', {position: 'top-center'});
        }
    }
    catch (error) {
        if(!error.response || error.response.status === 500){
            console.error('Error during login:', error.message);
            toast.error('An error occurred during login. Please check your network connection and try again.', {position: 'top-center'});
        }
        else{
            console.error('Error during login:', error.message);
            toast.error(`An error occurred during login. ${extractErrorMessage(error.response.data)}`, {position: 'top-center'});
        }
    }
};

const extractErrorMessage = (errorData) =>{
    if(errorData.hasOwnProperty('message'))
        return errorData.message;
    
    if(errorData.hasOwnProperty('errors')){
        let messages = []
        for (let key in errorData.errors) {
            if (Array.isArray(errorData.errors[key]) && errorData.errors[key].length > 0) {
                messages = messages.concat(errorData.errors[key]);
            }
        }
        
        return messages.join(' ');
    }

    return '';
}

const authAPI = { register, login };

export default authAPI;