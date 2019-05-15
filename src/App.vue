<template>
    <TransactionPool v-if="stats" :size="stats['dap.txPool.currSize']" :timeStamp="stats['lastResponseTimestamp']">
    </TransactionPool>
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


