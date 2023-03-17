import axios from 'axios';
import { PATH_REGISTER, URL_BASE } from '../constants';

const postRegister = async (userData) => {
  const registerUrl = `${URL_BASE}/${PATH_REGISTER}`;
  try {
    const { data, status } = await axios.post(registerUrl, { ...userData });
    return { data, status };
  } catch ({ response: { data, status } }) {
    return { data: data.message, status };
  }
};

export default postRegister;
