import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { login, register } from "../endpoints";


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
      console.log("login data >> ", data);
      const response = await axios.post(login, data);
      console.log("login res >> ", response.data);
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

  async registerDoctor(newDrData) {
    try {
      console.log("newDrData >> ", newDrData)
      const response = await axios.post(register, newDrData);
      console.log("register res >> ", response.data);
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
