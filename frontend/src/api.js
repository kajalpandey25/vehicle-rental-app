import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export const getWheels = () => api.get('/wheels').then(r => r.data);
export const getVehicleTypes = (wheels) => api.get(`/vehicle-types?wheels=${wheels}`).then(r => r.data);
export const getVehicles = (typeId) => api.get(`/vehicles?typeId=${typeId}`).then(r => r.data);
export const submitBooking = (payload) => api.post('/bookings', payload).then(r => r.data);

export default api;
