import axios from "axios";

const BASE_URL = 'http://127.0.0.1:3001/cards';

axios.defaults.baseURL = BASE_URL;

interface ICard {
    text: string,
    description: string | null,
    status: string,
    _id: string | number,
}

export const getCards = async () => {
    return await axios.get('/');
}

export const addCard = async (text: string, description: string | null, status: string) => {
    return axios.post<ICard>('/', { text: text, description: description, status: status });
} 

export const deleteCard = async (id: number | string) => {
    return axios.delete(`/${id}`);
} 

export const editCard = async (id: number | string, text: string, description: string | null, status: string) => {
    return axios.patch<ICard>(`/${id}`, { text: text, description: description, status: status });
} 