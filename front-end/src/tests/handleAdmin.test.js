import axios from 'axios';
import { PATH_ADMIN, PATH_MANAGE, URL_BASE } from '../constants';
import { getUsers, postUser, deleteUser } from '../services/handleAdmin';

jest.mock('axios');
const errorMessage = 'Error message';

describe('User Functionss', () => {
  const token = 'testToken';
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getUsers', () => {
    it('should call axios.get with the correct endpoint and headers', async () => {
      const expectedEndpoint = `${URL_BASE}/${PATH_ADMIN}/${PATH_MANAGE}`;
      const expectedHeaders = { authorization: token };
      const expectedData = { data: [], status: 200 };
      axios.get.mockResolvedValue(expectedData);

      const result = await getUsers(token);

      expect(axios.get)
        .toHaveBeenCalledWith(expectedEndpoint, { headers: expectedHeaders });
      expect(result).toEqual(expectedData);
    });

    it('retornar a mensagem de erro e o status', async () => {
      const expectedEndpoint = `${URL_BASE}/${PATH_ADMIN}/${PATH_MANAGE}`;
      const expectedHeaders = { authorization: token };
      const expectedErrorMessage = errorMessage;
      const expectedStatus = 500;
      axios.get.mockRejectedValue({ response:
         { data: { message: expectedErrorMessage }, status: expectedStatus } });

      const result = await getUsers(token);

      expect(axios.get)
        .toHaveBeenCalledWith(expectedEndpoint, { headers: expectedHeaders });
      expect(result).toEqual({ data: expectedErrorMessage, status: expectedStatus });
    });
  });
});
describe('User Functionsss', () => {
  const token = 'testToken';
  const userData = { name: 'John Doe', email: 'johndoe@example.com' };
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('postUser', () => {
    it('trazer o endpoint correto do post', async () => {
      const expectedEndpoint = `${URL_BASE}/${PATH_ADMIN}/${PATH_MANAGE}`;
      const expectedHeaders = { authorization: token };
      const expectedData = { data: [], status: 200 };
      axios.post.mockResolvedValue(expectedData);

      const result = await postUser(userData, token);

      expect(axios.post)
        .toHaveBeenCalledWith(expectedEndpoint, userData, { headers: expectedHeaders });
      expect(result).toEqual(expectedData);
    });

    it('retornar a mensagem de erro e o status', async () => {
      const expectedEndpoint = `${URL_BASE}/${PATH_ADMIN}/${PATH_MANAGE}`;
      const expectedHeaders = { authorization: token };
      const expectedErrorMessage = errorMessage;
      const expectedStatus = 500;
      axios.post.mockRejectedValue({ response:
        { data: { message: expectedErrorMessage },
          status: expectedStatus } });

      const result = await postUser(userData, token);

      expect(axios.post)
        .toHaveBeenCalledWith(expectedEndpoint, userData, { headers: expectedHeaders });
      expect(result).toEqual({ data: expectedErrorMessage, status: expectedStatus });
    });
  });
});
describe('User Functions', () => {
  const token = 'testToken';
  const id = '123';

  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('deleteUser', () => {
    it('should call axios.delete with the correct endpoint and headers', async () => {
      const expectedEndpoint = `${URL_BASE}/${PATH_ADMIN}/${PATH_MANAGE}/${id}`;
      const expectedHeaders = { authorization: token };
      const expectedData = { status: 200 };
      axios.delete.mockResolvedValue(expectedData);

      const result = await deleteUser(id, token);

      expect(axios.delete)
        .toHaveBeenCalledWith(expectedEndpoint, { headers: expectedHeaders });
      expect(result).toEqual(expectedData);
    });

    it('retornar mensagem de erro', async () => {
      const expectedEndpoint = `${URL_BASE}/${PATH_ADMIN}/${PATH_MANAGE}/${id}`;
      const expectedHeaders = { authorization: token };
      const expectedErrorMessage = errorMessage;
      const expectedStatus = 500;
      axios.delete.mockRejectedValue({ response:
        { data: { message: expectedErrorMessage },
          status: expectedStatus } });

      const result = await deleteUser(id, token);

      expect(axios.delete)
        .toHaveBeenCalledWith(expectedEndpoint, { headers: expectedHeaders });
      expect(result).toEqual({ data: expectedErrorMessage, status: expectedStatus });
    });
  });
});
