<template>
    <div>
        <b-modal centered ref="loginModal" title="Dappley Stats" ok-only ok-title="Login"
                 @ok="attemptLogin" no-close-on-backdrop no-close-on-esc hide-header-close>
            <b-form-group label="Username:">
                <b-form-input v-model="username"></b-form-input>
            </b-form-group>
            <b-form-group label="Password:">
                <b-form-input v-model="password" type="password" :state="passwordState"
                              @update="updatePasswordState"></b-form-input>
            </b-form-group>
        </b-modal>
        <div v-if="authenticated">
            <div v-if="stats">
                <div class="row m-3">
                    <b-card class="col m-3" title="Last Response Time">
                        <b-card-text>{{lastResponseTime}}</b-card-text>
                    </b-card>
                    <node-config class="m-3"></node-config>
                </div>
                <div class="row m-3">
                    <memory-usage class="col m-3"
                                  :graph-data="stats.getDataStore().getMetricsMap().get('dapp.memstats').getStatsList()">
                    </memory-usage>
                    <cpu-usage class="col m-3"
                               :graph-data="stats.getDataStore().getMetricsMap().get('dapp.cpu.percent').getStatsList()">
                    </cpu-usage>
                </div>
                <div class="row m-3">
                    <transaction-pool class="col m-3"
                                      :graph-data="stats.getDataStore().getMetricsMap().get('dapp.txpool.size').getStatsList()">
                    </transaction-pool>
                    <fork-info class="col m-3"
                               :graph-data="stats.getDataStore().getMetricsMap().get('dapp.fork.info').getStatsList()">
                    </fork-info>
                    <block-stats class="col m-3" :graph-data="stats.getBlockStatsList()">
                    </block-stats>
                </div>
                <div class="row m-3">
                    <peers class="col" :peers="stats.getPeersList()"></peers>
                </div>
            </div>
            <div v-else>
                <div class="center">
                    <b-spinner style="width: 25vmin; height: 25vmin; border-width: 2.5vmin;"></b-spinner>
                    <strong style="position: absolute; font-size: 2.5vmin;">Loading...</strong>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TransactionPool from "./components/TransactionPool";
    import config from "../config.json";
    import CpuUsage from "./components/CpuUsage";
    import MemoryUsage from "./components/MemoryUsage";
    import Peers from "./components/Peers";
    import ForkInfo from "./components/ForkInfo";
    import BlockStats from "./components/BlockStats";
    import MetricServiceClient from "./js/MetricServiceClient";
    import NodeConfig from "./components/NodeConfig";
    import Store from "./js/State";
    import {BCard, BCardText, BModal, BFormInput, BFormGroup, BSpinner} from "bootstrap-vue";

    export default {
        name: "App",
        store: Store,
        components: {
            BlockStats,
            ForkInfo,
            Peers,
            MemoryUsage,
            CpuUsage,
            TransactionPool,
            NodeConfig,
            BCard,
            BCardText,
            BModal,
            BFormInput,
            BFormGroup,
            BSpinner
        },
        data() {
            return {
                stats: null,
                lastResponseTime: null,
                passwordState: null,
                password: "",
                username: "",
                polling: null,
            };
        },
        computed: {
            authenticated() {
                return this.$store.state.authenticated;
            },
        },
        watch: {
            authenticated: function(val) {
                if (!val) {
                    clearInterval(this.polling);
                    this.$refs.loginModal.show();
                    this.passwordState = null;
                }
            }
        },
        methods: {
            startPolling() {
                clearInterval(this.polling);
                this.getStats();
                this.polling = setInterval(() => {
                    this.getStats();
                }, config.pollingInterval);
            },
            async getStats() {
                try {
                    const res = await MetricServiceClient.getStats();
                    this.stats = res.getStats();
                    this.lastResponseTime = new Date();
                } catch (err) {
                    // eslint-disable-next-line
                    console.error(err);
                }
            },
            async attemptLogin(loginModal) {
                loginModal.preventDefault(); /* prevent closing of login modal */
                try {
                    await this.$store.dispatch({
                        type: "login",
                        username: this.username,
                        password: this.password});
                    this.passwordState = true;
                    this.$nextTick(() => {
                        this.$refs.loginModal.hide();
                        this.startPolling();
                    });
                } catch (err) {
                    // eslint-disable-next-line
                    console.error(err);
                    this.passwordState = false;
                    this.password = "";
                }
            },
            updatePasswordState() {
                if (this.password.length > 0)
                    this.passwordState = null;
            }
        },
        mounted() {
            if (!this.authenticated) {
                this.$refs.loginModal.show();
            } else {
                this.startPolling();
            }
        }
    };
</script>

<style scoped>
    .center {
        display: flex;
        text-align: center;
        min-height: 100vh;
        align-items: center;
        justify-content: center;
    }
</style>
