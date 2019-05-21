<template>
    <div>
        <ul style="list-style: none; padding: 0">
            <li v-for="stat of stats" :key="stat.cpu">
                <cpu-usage-item :attrs="stat"></cpu-usage-item>
            </li>
        </ul>
    </div>
</template>

<script>
    import CpuUsageItem from "./CpuUsageItem";
    export default {
        name: "CpuUsage",
        components: {
            CpuUsageItem
        },
        props: {
            stats: Array
        }
    }
</script>

<style scoped>

</style>