import axios from 'axios';
import api from '../util/apiMetadata';

// Return object with default values for each variable in this module
const getDefaultState = () => ({
  authenticated: false,
  userId: null,
  userName: null,
  userRole: null,
  meetings: [],
});

const initialState = getDefaultState();

export default {
  state: initialState,
  /* eslint-disable no-param-reassign */
  mutations: {
    setAuthenticated(state, val) {
      state.authenticated = val;
    },
    setUserId(state, val) {
      state.userId = val;
    },
    setUserName(state, val) {
      state.userName = val;
    },
    setUserRole(state, val) {
      state.userRole = val;
    },
  },
  actions: {
    /**
     * Sends request to server to confirm authentication status
     * Returns a Promise() that resolves if authenticated (otherwise rejects)
     * Before returning, commits current authentication status to store state
     */
    async requestIsAuth(context) {
      return axios({
        method: 'get',
        url: `${api.url}/login/isAuth`,
        withCredentials: true,
        headers: api.headers,
      })
        .then((res) => {
          if (res.data.auth) {
            console.log(context);
            context.commit('setAuthenticated', true);
            context.commit('setUserId', res.data.userID);
            context.commit('setUserName', res.data.userName);
            context.commit('setUserRole', res.data.userRole);
            return Promise.resolve();
          }
          context.commit('setAuthenticated', false);
          context.commit('setUserId', null);
          context.commit('setUserName', null);
          context.commit('setUserRole', null);
          return Promise.reject(new Error('You are not logged in'));
        })
        .catch((err) => Promise.reject(err));
    },
    async logoutUser(context) {
      return axios({
        method: 'get',
        url: `${api.url}/menu/logout`,
        withCredentials: true,
        headers: api.headers,
      })
        .then(() => {
          context.commit('setAuthenticated', false);
          context.commit('setUserId', null);
          context.commit('setUserName', null);
          context.commit('setUserRole', null);
          return Promise.resolve();
        })
        .catch((err) => Promise.reject(err));
    },
  },
};
