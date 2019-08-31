import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import config from "../../config.json";

Vue.use(Vuex);

const BASE_URL = `http://${config.authServerHost}:${config.authServerPort}`;
const HTTP_BAD_REQUEST = 400;
const REFRESH_TKN = "refreshTkn";
const ACCESS_TKN = "accessTkn";

const MUTATIONS = {
    AUTHENTICATE: "authenticate",
    UNAUTHENTICATE: "unauthenticate",
    SET_ACCESS_TKN: "setAccessTkn",
    SET_REFRESH_TKN: "setRefreshTkn"
};

export const ACTIONS = {
    LOGIN: "login",
    REFRESH_TOKENS: "refreshTokens"
}

export default new Vuex.Store({
    state: {
        authenticated: !!sessionStorage.getItem(ACCESS_TKN) &&
         !!sessionStorage.getItem(REFRESH_TKN)
    },
    getters: {
        /* using method style access to prevent caching of properties;
        https://vuex.vuejs.org/guide/getters.html#method-style-access */
        refreshTkn: () => () => { return sessionStorage.getItem(REFRESH_TKN) },
        accessTkn: () => () => { return sessionStorage.getItem(ACCESS_TKN) }
    },
    mutations: {
        [MUTATIONS.AUTHENTICATE] (state) {
            state.authenticated = true;
        },
        [MUTATIONS.UNAUTHENTICATE] (state) {
            state.authenticated = false;
        },
        [MUTATIONS.SET_ACCESS_TKN] (_, tkn) {
            sessionStorage.setItem(ACCESS_TKN, tkn);
        },
        [MUTATIONS.SET_REFRESH_TKN] (_, tkn) {
            sessionStorage.setItem(REFRESH_TKN, tkn);
        }
    },
    actions: {
        async [ACTIONS.LOGIN] ({commit}, {username, password}) {
            try {
                const res = await axios.post("/login", {username, password},
                    {
                        baseURL: BASE_URL,
                        headers: {"Content-Type": "application/json"}
                    });
                commit(MUTATIONS.SET_ACCESS_TKN, res.data.accessTkn);
                commit(MUTATIONS.SET_REFRESH_TKN, res.data.refreshTkn);
                commit(MUTATIONS.AUTHENTICATE);
            } catch (e) {
                commit(MUTATIONS.UNAUTHENTICATE);
                throw e;
            }
        },
        async [ACTIONS.REFRESH_TOKENS] ({commit, getters}) {
            try {
                const res = await axios.post(`/refresh?tkn=${getters.refreshTkn()}`, {}, {baseURL: BASE_URL});
                commit(MUTATIONS.SET_ACCESS_TKN, res.data.accessTkn);
                commit(MUTATIONS.SET_REFRESH_TKN, res.data.refreshTkn);
            } catch (err) {
                if (err.response && err.response.status === HTTP_BAD_REQUEST) {
                    commit(MUTATIONS.UNAUTHENTICATE);
                    commit(MUTATIONS.SET_ACCESS_TKN, "");
                    commit(MUTATIONS.SET_REFRESH_TKN, "");
                }
                throw err;
            }
        }
    }
});