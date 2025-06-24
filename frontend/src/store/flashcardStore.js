import {create} from 'zustand';
import axios from 'axios';
import { getDecks } from '../../../backend/controllers/flashCardController';
import { useAuthStore } from './authStore';

const API_URL = 'http://localhost:5000/api/decks'; 
axios.defaults.withCredentials = true;

export const useFlashcardStore = create((set) => ({
    decks: [],
    deck: [],

    getDecks: async () => {
        set({isLoading:true, error:null});
        try {
            const response = await axios.get(`${API_URL}/`)
            set({decks:response.data.decks});

        } catch (error) {
            set({error:error.response.data.message || 'error in getDeck', isLoading:false,})
            throw error;
        }
    },
    createDeck: async (topic, cards) => {
        useAuthStore.setState({isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/create-deck`, {topic, cards})
            useAuthStore.setState({user: response.data.user});
            set({decks: response.data.decks});
        } catch (error) {
            set({error:error.response.data.message || 'createDeck', isLoading:false,})
            throw error;
        }
    
    },
    viewDeck: async (deckId) => {
        useAuthStore.setState({isLoading: true, error:null});
        try {
            const response = await axios.get(`${API_URL}/:userName/:deckId`, {deckId})
            set({deck: response.data.deck});
        } catch (error) {
            set({error:error.response.data.message || 'viewDeck', isLoading:false,})
            throw error;
        }
    }
}))
