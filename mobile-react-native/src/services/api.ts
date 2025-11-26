import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANTE: Altere para o IP do seu computador se estiver testando no Android
// Para iOS: use 'localhost'
// Para Android: use o IP da sua máquina (ex: '192.168.1.100')
// const BASE_URL = 'http://127.0.0.1:8000';
// const BASE_URL = 'http://192.168.18.6';
const BASE_URL = 'http://10.0.2.2:8000';

const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor para adicionar token
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export default api;
