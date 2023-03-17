import axios from 'axios';
import { PATH_ADMIN, PATH_MANAGE, URL_BASE } from '../constants';

export const getUsers = async (token) => {
  const endpoint = `${URL_BASE}/${PATH_ADMIN}/${PATH_MANAGE}`;
  try {
    const { data, status } = await axios.get(endpoint, {
      headers: { authorization: token },
    });
    return { data, status };
  } catch ({ response: { data, status } }) {
    return { data: data.message, status };
  }
};

export const postUser = async (userData, token) => {
  const endpoint = `${URL_BASE}/${PATH_ADMIN}/${PATH_MANAGE}`;
  try {
    const { data, status } = await axios.post(endpoint, userData, {
      headers: { authorization: token },
    });
    return { data, status };
  } catch ({ response: { data, status } }) {
    return { data: data.message, status };
  }
};

export const deleteUser = async (id, token) => {
  const endpoint = `${URL_BASE}/${PATH_ADMIN}/${PATH_MANAGE}/${id}`;
  try {
    const { status } = await axios.delete(endpoint, {
      headers: { authorization: token },
    });
    return { status };
  } catch ({ response: { data, status } }) {
    return { data: data.message, status };
  }
};
