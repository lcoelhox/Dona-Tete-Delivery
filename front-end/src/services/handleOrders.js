import axios from 'axios';
import { PATH_ORDERS, PATH_SALES, URL_BASE } from '../constants';

export const getOrders = async (token) => {
  const endpoint = `${URL_BASE}/${PATH_SALES}/${PATH_ORDERS}`;
  try {
    const { data, status } = await axios.get(endpoint, {
      headers: { authorization: token },
    });
    // console.log(data);
    return { data, status };
  } catch ({ response: { data, status } }) {
    console.log(data);
    return { data: data.message, status };
  }
};

export const getOrderById = async (id, token) => {
  const endpoint = `${URL_BASE}/${PATH_SALES}/${PATH_ORDERS}/${id}`;
  try {
    const { data, status } = await axios.get(endpoint, {
      headers: { authorization: token },
    });
    return { data, status };
  } catch ({ response: { data, status } }) {
    return { data: data.message, status };
  }
};

export const changeStatus = async (body, id, token) => {
  const endpoint = `${URL_BASE}/${PATH_SALES}/${PATH_ORDERS}/${id}`;
  try {
    const { data, status } = await axios.patch(endpoint, body, {
      headers: { authorization: token },
    });
    return { data, status };
  } catch ({ response: { data, status } }) {
    return { data: data.message, status };
  }
};
