import { userLogoutAction } from '../redux/actions';
import { deleteUserDataOnLocalStorage } from '../services/handleLocalStorage';

export const executeLogout = (history, dispatch) => {
  deleteUserDataOnLocalStorage();
  dispatch(userLogoutAction());
  history.push('/login');
};

export const placeholder = 'placeholder';
