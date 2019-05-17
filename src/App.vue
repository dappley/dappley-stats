<template>
    <div>
        <TransactionPool v-if="stats" :size="stats['dap.txPool.currSize']" :timeStamp="stats['lastResponseTimestamp']">
        </TransactionPool>
        <div v-else>
            <div class="center">
                <b-spinner style="width: 25vmin; height: 25vmin; border-width: 2.5vmin;" ></b-spinner>
                <strong style="position: absolute; font-size: 2.5vmin;">Loading...</strong>
            </div>
        </div>
    </div>
</template>

<script>
import TransactionPool from "./components/TransactionPool.vue";
import axios from 'axios';
import config from '../config.json';

export default {
    name: "App",
    components: {
        TransactionPool
    },
    data() {
        return { stats: null }
    },
    methods: {
      fetchData() {
        axios.get(`http://${config.host}:${config.port}/debug/metrics`)
          .then( stats => {
            this.stats = stats.data;
            this.stats['lastResponseTimestamp'] = new Date().toUTCString();
          })
          .catch( err => {
            // eslint-disable-next-line
            console.log(err);
          })
      }
    },
    created() {
      this.fetchData();
      setInterval(() => {
        this.fetchData();
      }, config.pollingInterval);
    }
}
</script>

<style>
    .center {
        display: flex;
        text-align: center;
        min-height: 100vh;
        align-items: center;
        justify-content: center;
    }
</style>