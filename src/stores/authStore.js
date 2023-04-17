import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axios/instance';
import { login, registerUser } from "../axios/endpoints";


export default class AuthStore {
  accessToken = '';
  refreshToken = '';
  user = '';

  constructor() {
    makeAutoObservable(this);
    const userJson = localStorage.getItem('currentUser');
    const currentUser = userJson ? JSON.parse(userJson) : null;
    if (currentUser && currentUser.accessToken) {
      this.setAccessToken(currentUser.accessToken);
      this.setRefreshToken(currentUser.refreshToken);
      this.user = currentUser.email;
    }
  }

  get isAuthenticated() {
    return !!this.accessToken;
  }

  setAccessToken(token) {
    this.accessToken = token;
    localStorage.setItem('currentUser', JSON.stringify({
      accessToken: token,
      refreshToken: this.refreshToken,
    }));
    console.log("accessToken >> ", this.accessToken)
  }

  setRefreshToken(token) {
    this.refreshToken = token;
    localStorage.setItem('currentUser', JSON.stringify({
      accessToken: this.accessToken,
      refreshToken: token,
    }));
  }

  async login(email, password) {
    try {
      const data = {
        email,
        password,
      };
      const response = await axiosInstance.post(login, data);
      console.log("Logged user in successfully >> ", response.data);
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      this.setAccessToken(response.data.access_token);
      this.setRefreshToken(response.data.refresh_token);
      this.user = response.data.email;
      return Promise.resolve();
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  async registerNewUser(newUserData) {
    try {
      const response = await axiosInstance.post(registerUser, newUserData);
      console.log("Registered user successfully >> ", response.data);
      return Promise.resolve(response.data);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  logout() {
    this.setAccessToken();
    this.setRefreshToken();
    localStorage.removeItem('currentUser');
    this.user = null;
  }
};
