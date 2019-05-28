<template>
    <div>
    <b-table bordered show-empty hover :items="items" :fields="tableFields" :empty-text="noPeersText"
             tbodyTrClass="peers-table-row" style="font-size: 0.75em;">
        <template slot="Addrs" slot-scope="data">
            <b-list-group v-for="(value, key) in data.item.Addrs" :key="key">
                <b-list-group-item>{{value}}</b-list-group-item>
            </b-list-group>
        </template>
    </b-table>
    </div>
</template>

<script>
    import _ from "lodash"
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
                        key: "ID",
                        label: "ID",
                        sortable: true,
                        thClass: "peers-table-header-id"
                    },
                    {
                        key: "Addrs",
                        label: "Addresses",
                        thClass: "peers-table-header-addr"
                    }
                ]
            }
        },
        computed: {
            items: {
                get() {
                    return _.reject(this.peers, { Addrs: null })
                }
            }
        }
    }
</script>

<style>
    .connected-peers-table-header-id {
        width: 40%;
    }
    .connected-peers-table-header-addr {
        width: 60%;
    }
</style>