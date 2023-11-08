import { API_URL } from '@env';
import axios from 'axios';

export const auth = async (userData: { username: string; password: string }) => {
  try {
    const res = await axios.post(`${API_URL}/auth`, userData);
    return res.data;
  } catch (_err) {
    return null;
  }
};
