import axios from 'axios';

const host = import.meta.env.VITE_API_HOST;
const port = import.meta.env.VITE_API_PORT;

const axiosClient = axios.create({
    baseURL: `http://${host}:${port}/`,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export const getRequest = async (URL, headers = {}) => {
    const response = await axiosClient.get(`/${URL}`, headers);
    return response;
};
