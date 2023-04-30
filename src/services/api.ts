import axios from 'axios';

const apiBack = axios.create({ baseURL: "localhost:8080" });

export default apiBack;