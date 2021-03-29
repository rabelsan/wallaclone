import client from './client';
import storage from '../utils/storage';

export const login = ({ remember, ...credentials }) =>
  client.login(credentials).then(auth => {
    if (remember) {
      storage.set('auth', auth.token);
    }
    return auth;
  });

export const signup = credentials =>
  client.signup(credentials).then(sign => 
    sign
  );

export const logout = () =>
  client.logout().then(() => {
    storage.remove('auth');
  });

