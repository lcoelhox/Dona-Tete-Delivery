import axios from 'axios';
import { PATH_PRODUCTS, PATH_CUSTOMER, URL_BASE } from '../constants';

const getProducts = async (token) => {
  const productsUrl = `${URL_BASE}/${PATH_CUSTOMER}/${PATH_PRODUCTS}`;
  try {
    const { data, status } = await axios.get(productsUrl, {
      headers: { authorization: token },
    });
    return { userData: data, status };
  } catch ({ response: { data, status } }) {
    return { data: data.message, status };
  }
};

export default getProducts;
