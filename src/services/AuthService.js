import axios from "axios";

const API_URL = "http://localhost:8080/auth/";


class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem(
            "usergamesporgamers",
            JSON.stringify(response.data)
          );
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("usergamesporgamers");
  }

  registerAdmin(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      roles: ["user", "admin"],
    });
  }

  registerUser(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      roles: ["user"],
    });
  }

  registerModerator(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      roles: ["user", "moderator"],
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("usergamesporgamers"));
  }

  isAuthenticated = () => {
    return localStorage.getItem("usergamesporgamers") !== null;
  };
}

export default new AuthService();
