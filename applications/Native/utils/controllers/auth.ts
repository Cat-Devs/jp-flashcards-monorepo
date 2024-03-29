import axios from 'axios';

const API_URL = process.env.API_URL;

export const auth = async (userData: { username: string; password: string }) => {
  try {
    const res = await axios.post(`${API_URL}/api/v1/auth`, userData);

    return res.data;
  } catch (err: any) {
    console.log(err?.message || 'Error');

    return null;
  }
};
