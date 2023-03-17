import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ERROR_INVALID_TOKEN } from '../constants';
import { executeLogout } from '../utils';

const useAuthFetch = (fetchFunction, param) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchAndAuthenticateResults = async () => {
      const { token } = user;
      const result = await fetchFunction(token, param);
      const isTokenInvalid = result.data === ERROR_INVALID_TOKEN;
      if (isTokenInvalid) return executeLogout(history, dispatch);
      return setData(result);
    };

    fetchAndAuthenticateResults();
  }, [user.token, fetchFunction]);

  return [data];
};

export default useAuthFetch;
