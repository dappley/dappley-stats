<template>
    <div class="row m-3">
        <b-card v-if="attrs && attrs.cpu" class="col m-3" :title="name">
            <b-card-text class="cpu-usage-percent">{{usedPercent}}</b-card-text>
        </b-card>
    </div>
</template>

<script>
    import {BCard, BCardText} from 'bootstrap-vue/es/components'
    export default {
        name: "CpuUsageItem",
        components: {
            BCard, BCardText
        },
        props: {
            attrs: {
                // metrics reported in jiffies, typically hundredth of a second
                cpu: String,
                user: Number,
                system: Number,
                idle: Number,
                nice: Number,
                iowait: Number,
                irq: Number,
                softirq: Number,
                steal: Number
            }
        },
        computed: {
            name: {
                get() {
                   return String(this.attrs.cpu).toUpperCase() + " Usage";
                }
            },
            usedPercent: {
                get() {
                    let _ = this.attrs;
                    const totalTime = _.user + _.idle + _.iowait + _.irq + _.nice + _.softirq + _.steal + _.system;
                    const idleTime = _.idle + _.iowait;
                    const percent = Number((totalTime - idleTime) / totalTime * 100).toFixed(2);
                    return isNaN(percent) ? "" : percent + " %";
                }
            }
        }
    }
</script>

<style scoped>

</style>