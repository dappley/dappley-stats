import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import config from "../../config.json";

Vue.use(Vuex);

const BASE_URL = `http://${config.authServerHost}:${config.authServerPort}`;
const HTTP_BAD_REQUEST = 400;

export default new Vuex.Store({
    state: {
        authenticated: !!sessionStorage.getItem("accessTkn") &&
         !!sessionStorage.getItem("refreshTkn")
    },
    getters: {
        /* using method style access to prevent caching of properties;
        https://vuex.vuejs.org/guide/getters.html#method-style-access */
        refreshTkn: () => () => { return sessionStorage.getItem("refreshTkn") },
        accessTkn: () => () => { return sessionStorage.getItem("accessTkn") }
    },
    mutations: {
        authenticate(state) {
            state.authenticated = true;
        },
        unauthenticate(state) {
            state.authenticated = false;
        },
        setAccessTkn(_, tkn) {
            sessionStorage.setItem("accessTkn", tkn);
        },
        setRefreshTkn(_, tkn) {
            sessionStorage.setItem("refreshTkn", tkn);
        }
    },
    actions: {
        async login({commit}, {username, password}) {
            try {
                const res = await axios.post("/login", {username, password},
                    {
                        baseURL: BASE_URL,
                        headers: {"Content-Type": "application/json"}
                    });
                commit("setAccessTkn", res.data.accessTkn);
                commit("setRefreshTkn", res.data.refreshTkn);
                commit("authenticate");
            } catch (e) {
                commit("unauthenticate");
                throw e;
            }
        },
        async refreshTokens({commit, getters}) {
            try {
                const res = await axios.post(`/refresh?tkn=${getters.refreshTkn()}`, {}, {baseURL: BASE_URL});
                commit("setAccessTkn", res.data.accessTkn);
                commit("setRefreshTkn", res.data.refreshTkn);
            } catch (err) {
                if (err.response && err.response.status === HTTP_BAD_REQUEST) {
                    commit("unauthenticate");
                    commit("setAccessTkn", "");
                    commit("setRefreshTkn", "");
                }
                throw err;
            }
        }
    }
});