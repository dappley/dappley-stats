<template>
    <div v-if="peers">
        <b-table class="text-center" bordered show-empty hover :items="peerData" :fields="tableFields"
                 :empty-text="noPeersText"
                 sort-by="ID" no-sort-reset tbodyTrClass="peers-table-row" style="font-size: 0.75em;">
            <template slot="latency" slot-scope="data">
                <div v-if="data.item.Latency != null">{{Number(data.item.Latency).toFixed(3)}}</div>
                <div v-else>&mdash;</div>
            </template>
            <template slot="addresses" slot-scope="data">
                <b-list-group v-for="(value, key) in data.item.Addresses" :key="key">
                    <b-list-group-item>{{value}}</b-list-group-item>
                </b-list-group>
            </template>
        </b-table>
    </div>
</template>

<script>
    import {BTable, BListGroup, BListGroupItem} from "bootstrap-vue/es/components";

    export default {
        name: "Peers",
        components: {
            BTable, BListGroup, BListGroupItem
        },
        props: {
            peers: Array
        },
        computed: {
            peerData: {
                get() {
                    return this.peers.map((peerInfo) => {
                        return {
                            ID: peerInfo.getId(),
                            Addresses: peerInfo.getAddressList(),
                            Latency: peerInfo.hasLatency() ? peerInfo.getLatency() : null
                        };
                    });
                }
            }
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
            };
        }
    };
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