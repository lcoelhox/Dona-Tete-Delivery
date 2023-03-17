import axios from 'axios';
import { PATH_LOGIN, URL_BASE } from '../constants';

const postLogin = async (request) => {
  const loginUrl = `${URL_BASE}/${PATH_LOGIN}`;
  try {
    const { data, status } = await axios.post(loginUrl, request);
    return { userData: data, status };
  } catch ({ response: { data, status } }) {
    return { data: data.message, status };
  }
};

export default postLogin;
