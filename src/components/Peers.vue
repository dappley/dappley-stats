<template>
    <div>
    <b-table class="text-center" bordered show-empty hover :items="peers" :fields="tableFields" :empty-text="noPeersText"
             tbodyTrClass="peers-table-row" style="font-size: 0.75em;">
        <template slot="id" slot-scope="data">
            {{data.item.info.ID}}
        </template>
        <template slot="addresses" slot-scope="data">
            <b-list-group v-for="(value, key) in data.item.info.Addrs" :key="key">
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
                        key: "id",
                        label: "ID",
                        sortable: true,
                        thClass: "peers-table-header-id"
                    },
                    {
                        key: "latency",
                        label: "Latency",
                        thClass: "peers-table-header-latency"
                    },
                    {
                        key: "addresses",
                        label: "Addresses",
                        thClass: "peers-table-header-addr"
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