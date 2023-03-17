import axios from 'axios';
import { getOrders, getOrderById, changeStatus } from '../services/handleOrders';

jest.mock('axios');

const token = 'mocked-token';

describe('getOrders', () => {
  it('Testando retorno de sucesso de getOrders', async () => {
    const expectedResponse = {
      data: [{ id: 1, name: 'order 1' }, { id: 2, name: 'order 2' }],
      status: 200,
    };
    axios.get.mockResolvedValue(expectedResponse);
    const response = await getOrders(token);
    expect(response).toEqual(expectedResponse);
  });

  it('should return error message and status when API call fails', async () => {
    const expectedResponse = {
      data: 'error message',
      status: 500,
    };
    await axios.get.mockRejectedValue({ response: expectedResponse });
    const response = await getOrders(token);
    expect(response.status).toEqual(expectedResponse.status);
  });
});

describe('getOrderById', () => {
  it('Testando retorno de sucesso de getOrderById', async () => {
    const id = 1;
    const expectedResponse = {
      data: { id: 1, name: 'order 1' },
      status: 200,
    };
    axios.get.mockResolvedValue(expectedResponse);
    const response = await getOrderById(id, token);
    expect(response).toEqual(expectedResponse);
  });
});

describe('changeStatus', () => {
  it('Testando retorno de sucesso de changeStatus', async () => {
    const id = 1;
    const body = { status: 'completed' };
    const expectedResponse = {
      data: { id: 1, status: 'completed' },
      status: 200,
    };
    axios.patch.mockResolvedValue(expectedResponse);
    const response = await changeStatus(body, id, token);
    expect(response).toEqual(expectedResponse);
  });
});
