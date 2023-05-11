import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axios/instance';
import { getCurrentUser, login, registerUser } from "../axios/endpoints";


export default class AuthStore {
  accessToken = null;
  refreshToken = null;
  user = null;

  constructor() {
    makeAutoObservable(this);
    const tokensJson = localStorage.getItem('tokens');
    const tokens = tokensJson ? JSON.parse(tokensJson) : null;
    const userJson = localStorage.getItem('currentUser');
    const currentUser = userJson ? JSON.parse(userJson) : null;

    if (currentUser && tokens.accessToken) {
      this.setTokens(tokens.accessToken, tokens.refreshToken);
      this.user = currentUser;
    }
  }

  get isAuthenticated() {
    return !!this.accessToken;
  }

  setTokens(access, refresh) {
    this.accessToken = access ?? null;
    this.refreshToken = refresh ?? null;
    localStorage.setItem('tokens', JSON.stringify({
      accessToken: access,
      refreshToken: refresh,
    }));
  }

  async login(email, password) {
    try {
      const data = {
        email,
        password,
      };
      const { data: resData } = await axiosInstance.post(login, data);
      localStorage.setItem('tokens', JSON.stringify(resData));
      this.setTokens(resData.access_token, resData.refresh_token);
      await this.getCurrentUser();
      return Promise.resolve();
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  async registerNewUser(newUserData) {
    try {
      const response = await axiosInstance.post(registerUser, newUserData);
      return Promise.resolve(response.data);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  logout() {
    this.setTokens();
    localStorage.removeItem('tokens');
    localStorage.removeItem('currentUser');
    this.user = null;
  }

  async getCurrentUser() {
    const { data } = await axiosInstance.get(getCurrentUser, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    this.user = data.user;
  }
};
