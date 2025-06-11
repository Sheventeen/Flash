import {create} from 'zustand';
import axios from 'axios';
import { getDecks } from '../../../backend/controllers/flashCardController';

const API_URL = 'http://localhost:5000/api/deck'; 
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    decks: [],

    getDecks: async () => {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/`)
            set({decks:response.data.decks});

        } catch (error) {
            set({error:error.response.data.message || 'error signing up', isLoading:false,})
            throw error;
        }
    },
}))
