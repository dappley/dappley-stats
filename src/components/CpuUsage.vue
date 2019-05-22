<template>
    <div class="row m-3">
        <b-card class="col m-3" title="CPU Usage">
            <b-card-text style="font-size: 1.25em">{{percent}}</b-card-text>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: "CpuUsage",
        components: {
        },
        props: {
            percentage: Number
        },
        computed: {
            percent: {
                get() {
                    return Number(this.percentage).toFixed(2) + " %";
                }
            }
        }
    }
</script>

<style scoped>

</style>