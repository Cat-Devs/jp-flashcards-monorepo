import { API_URL } from '@env';
import axios from 'axios';

export const createDeck = async (category: string) => {
  try {
    const res = await axios.post(`${API_URL}/deck`, { category });
    console.log('res.data', res.data);

    return res.data;
  } catch (_err) {
    console.log('_err', _err);

    return null;
  }
};
