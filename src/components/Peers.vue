<template>
    <div>
    <b-table class="text-center" bordered show-empty hover :items="peers" :fields="tableFields" :empty-text="noPeersText"
             sort-by="peerInfo.ID" no-sort-reset tbodyTrClass="peers-table-row" style="font-size: 0.75em;">
        <template slot="latency" slot-scope="data">
            <div v-if="data.item.latency != null">{{Number(data.item.latency).toFixed(3)}}</div>
            <div v-else>&mdash;</div>
        </template>
        <template slot="addresses" slot-scope="data">
            <b-list-group v-for="(value, key) in data.item.peerInfo.Addrs" :key="key">
                <b-list-group-item>{{value}}</b-list-group-item>
            </b-list-group>
        </template>
    </b-table>
    </div>
</template>

<script>
    import {BTable, BListGroup, BListGroupItem} from 'bootstrap-vue/es/components'

    export default {
        name: "Peers",
        components: {
            BTable, BListGroup, BListGroupItem
        },
        props: {
            peers: Array
        },
        data() {
            return {
                noPeersText: "No connected peers.",
                tableFields: [
                    {
                        key: "peerInfo.ID",
                        label: "ID",
                        sortable: true,
                        thClass: "peers-table-header-id"
                    },
                    {
                        key: "addresses",
                        label: "Addresses",
                        thClass: "peers-table-header-addr"
                    },
                    {
                        key: "latency",
                        label: "Latency (ms)",
                        sortable: true,
                        thClass: "peers-table-header-latency"
                    }
                ]
            }
        }
    }
</script>

<style>
    .peers-table-header-id {
        width: 33%;
    }
    .peers-table-header-addr {
        width: 33%;
    }
    .peers-table-header-latency {
        width: 33%;
    }
</style>