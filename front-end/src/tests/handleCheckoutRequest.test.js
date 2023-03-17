import axios from 'axios';
import { getSellers, postOrder } from '../services/handleCheckoutRequests';

jest.mock('axios');

describe('API functions', () => {
  const token = 'testToken';
  const sellerURL = 'http://localhost:3001/customer/seller';
  const data = { message: 'testMessage' };
  const status = 200;

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getSellers', () => {
    it('retornar userdata e status quando der sucesso', async () => {
      axios.get.mockResolvedValueOnce({ data, status });

      const result = await getSellers(token);

      expect(axios.get).toHaveBeenCalledWith(sellerURL, {
        headers: { authorization: token },
      });
      expect(result).toEqual({ userData: data, status });
    });

    it('retornar erro quando falhar', async () => {
      const errorMessage = 'testError';
      axios.get.mockRejectedValueOnce({
        response: { data: { message: errorMessage }, status } });

      const result = await getSellers(token);

      expect(axios.get).toHaveBeenCalledWith(sellerURL, {
        headers: { authorization: token },
      });
      expect(result).toEqual({ data: errorMessage, status });
    });
  });
});
describe('API functions', () => {
  const token = 'testToken';
  const postOrderUrl = 'http://localhost:3001/customer/checkout';
  const body = { item: 'testItem' };
  const data = { message: 'testMessage' };
  const status = 200;

  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('postOrder', () => {
    it('retornar o status e user data quando receber resposta', async () => {
      axios.post.mockResolvedValueOnce({ data, status });

      const result = await postOrder(token, body);

      expect(axios.post).toHaveBeenCalledWith(postOrderUrl, body, {
        headers: { authorization: token },
      });
      expect(result).toEqual({ userData: data, status });
    });

    it('retornar erro quando falhar', async () => {
      const errorMessage = 'testError';
      axios.post.mockRejectedValueOnce({ response:
         { data: { message: errorMessage }, status } });

      const result = await postOrder(token, body);

      expect(axios.post).toHaveBeenCalledWith(postOrderUrl, body, {
        headers: { authorization: token },
      });
      expect(result).toEqual({ data: errorMessage, status });
    });
  });
});
