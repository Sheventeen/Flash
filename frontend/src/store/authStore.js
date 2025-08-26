import {create} from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5000/api/auth' : '/api/auth';
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,
    messsage:null,
    
    signup: async (email, password, password2, lastName, firstName) => {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/signup`, {email, password, password2, lastName, firstName})
            set({user:response.data.newUser, isAuthenticated: true, isLoading:false});

        } catch (error) {
            set({error:error.response.data.message || 'error signing up', isLoading:false})
            throw error;
        }
    },
    verifyEmail: async (code) => {
        set({isLoading: true, error:null});
        try {
            const response = await axios.post(`${API_URL}/verify-email`, {code});
            set({isAuthenticated:true, isLoading:false, user: response.data.user});
        } catch (error) {
            set({error:error.response.data.message || 'error verifying email', isLoading:false})
            throw error;
        }
    },
    login: async (email, password) => {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/login`, {email, password});
            set({isLoading:false, isAuthenticated: true, user: response.data.user})
        } catch (error) {
            set({error:error.response.data.message || 'error login', isLoading:false})
            throw error;
        }
    },
    logout: async (email, password) => {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/logout`);
            set({isLoading:false, isAuthenticated: false, user: null})
        } catch (error) {
            set({error:error.response.data.message || 'error logout', isLoading:false})
            throw error;
        }
    },
    checkAuth: async () => {
        set({isCheckingAuth: true, error: null});
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({isCheckingAuth:false, isAuthenticated:true, user: response.data.user}) ;         
        } catch (error) {
            set({error:null, isCheckingAuth:false})
        }
    },
    forgotPassword: async (email) => {
        set({error:null, isLoading: true});
        try {
            const response = await axios.post(`${API_URL}/forgot-password`,{email});
            const token = response.data.resetPasswordToken
            console.log('TOKEN FROM RESPONSE:', token);
            set({isLoading:false, message: response.data.message}) ;
            return token
        } catch (error) {
            set({error:'error verifying email', isLoading:false})
            throw error;
        }
    },
    resetPassword: async(resetToken, password, password2) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/reset-password/${resetToken}`,{password, password2});
            set({isLoading:false, message: response.data.message})
        } catch (error) {
            set({error:'error resetting password', isLoading:false})
            throw error;
        }
    },
}))