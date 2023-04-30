import axios from 'axios';

const apiBack = axios.create({ baseURL: "http://localhost:8080" });

export default apiBack;