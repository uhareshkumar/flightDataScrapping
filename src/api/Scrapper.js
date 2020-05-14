import axios from 'axios';

export default axios.create({
    baseURL: 'https://8b901e3b.ngrok.io',
    headers: {'Content-Type': 'application/json'}
});