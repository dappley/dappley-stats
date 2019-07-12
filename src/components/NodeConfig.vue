<template>
    <div style="width: 10%">
        <b-button class="node-config-button" @click="getNodeConfig">Node Configuration</b-button>
        <b-modal centered title="Node Configuration" id="node-config-modal" ok-only>
            <div v-if="config">
                <div v-for="(value, key) in settings" :key="key">
                    <b-form-group :label="key" label-class="font-weight-bold pt-0">
                        <div v-if="Array.isArray(value)">
                            <div v-for="(v, i) in value" :key="i">
                                <b-form-input readonly style="word-break: break-all;"
                                              :value="v.toString()"></b-form-input>
                            </div>
                        </div>
                        <b-form-input v-else readonly :value="value"></b-form-input>
                    </b-form-group>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import {BButton, BModal, BFormGroup, BFormInput} from "bootstrap-vue";
    import {MetricsServiceClient, MetricsServiceRequest} from "../js/MetricsServiceClient";

    export default {
        name: "NodeConfig",
        components: {
            BButton,
            BModal,
            BFormGroup,
            BFormInput
        },
        data() {
            return {
                config: null
            };
        },
        methods: {
            getNodeConfig() {
                MetricsServiceClient.rpcGetNodeConfig(new MetricsServiceRequest(), {})
                    .then(resp => {
                        this.config = resp;
                        this.$bvModal.show("node-config-modal");
                    })
                    .catch(err => {
                        // eslint-disable-next-line
                        console.error(err);
                    });
            }
        },
        computed: {
            settings() {
                return {
                    "Transaction Pool Limit (KB):": this.config.getTxPoolLimit().toString(),
                    "Block Size Limit (KB):": this.config.getBlkSizeLimit().toString(),
                    "Max Outgoing Connections:": this.config.getMaxConnectionOut().toString(),
                    "Max Incoming Connections:": this.config.getMaxConnectionIn().toString(),
                    "Producer Address:": this.config.getProducerAddress(),
                    "Producers:": this.config.getProducersList(),
                    "Max Producers:": this.config.getMaxProducers().toString(),
                    "IPFS Addresses:": this.config.getIpfsAddressesList(),
                    "RPC Port:": this.config.getRpcPort().toString()
                };
            }
        }
    };
</script>

<style scoped>
    .node-config-button {
        height: 100%;
        width: 100%;
        font-size: 1.2rem;
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>
