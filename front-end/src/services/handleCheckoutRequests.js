import axios from 'axios';
import { PATH_CHECKOUT, PATH_CUSTOMER, PATH_SELLER, URL_BASE } from '../constants';

export const getSellers = async (token) => {
  const sellerURL = `${URL_BASE}/${PATH_CUSTOMER}/${PATH_SELLER}`;
  try {
    const { data, status } = await axios.get(sellerURL, {
      headers: { authorization: token },
    });
    return { userData: data, status };
  } catch ({ response: { data, status } }) {
    return { data: data.message, status };
  }
};

export const postOrder = async (token, body) => {
  const postOrderUrl = `${URL_BASE}/${PATH_CUSTOMER}/${PATH_CHECKOUT}`;
  try {
    const { data, status } = await axios.post(postOrderUrl, body, {
      headers: { authorization: token },
    });
    return { userData: data, status };
  } catch ({ response: { data, status } }) {
    return { data: data.message, status };
  }
};

export const placeholder = 'placeholder';
