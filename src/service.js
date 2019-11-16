import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const getClients = () => instance.get(`/clients`);
export const postClients = data => instance.post(`/clients`, data);
export const putClients = (uuid, data) => instance.put(`/clients/${uuid}`, data);
export const deleteClients = uuid => instance.delete(`/clients/${uuid}`);

