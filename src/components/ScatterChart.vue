<script>
    import {Scatter, mixins} from 'vue-chartjs'
    import zoom from "chartjs-plugin-zoom"

    const {reactiveProp} = mixins;

    export default {
        extends: Scatter,
        mixins: [reactiveProp],
        props: ['options'],
        mounted() {
            this.addPlugin(zoom);
            this.renderChart(this.chartData, this.options);
        }
    }
</script>