<template>
    <div style="width: 10%">
        <b-button class="node-config-button" @click="getNodeConfig">Node Configuration</b-button>
        <b-modal centered ref="nodeConfigModal" title="Node Configuration" id="node-config-modal" ok-title="Apply"
                 @ok="handleApply">
            <div v-if="config">
                <div v-for="(item, key) in configuration" :key="key">
                    <b-form-group :label="`${item.label}:`" label-class="font-weight-bold pt-0">
                        <div v-if="Array.isArray(model[item.modelKey])">
                            <div v-for="(v, i) in model[item.modelKey]" :key="i" style="display: flex;">
                                <b-button v-if="!item.readonly" class="m-1"
                                          @click="model[item.modelKey].splice(i, 1)">-
                                </b-button>
                                <b-form-input :readonly="item.readonly" class="m-1"
                                              v-model="model[item.modelKey][i]"></b-form-input>
                            </div>
                            <div class="m-1">
                                <b-button v-if="!item.readonly" style="width: 100%;"
                                          @click="model[item.modelKey].push('')">+
                                </b-button>
                            </div>
                        </div>
                        <b-form-input v-else v-model="model[item.modelKey]" :readonly="item.readonly"
                                      :number="item.number"></b-form-input>
                    </b-form-group>
                </div>
            </div>
        </b-modal>
        <b-toast ref="setNodeConfigToast" :title="toasterProps.title" :variant="toasterProps.variant"
                 class="b-toaster-top-full" toaster="b-toaster-bottom-right" append-toast>
            {{toasterProps.message}}
        </b-toast>
    </div>
</template>

<script>
    import {BButton, BModal, BFormGroup, BFormInput, BToast} from "bootstrap-vue";
    import {MetricsServiceClient, MetricsServiceRequest, SetNodeConfigRequest} from "../js/MetricsServiceClient";
    import _ from "lodash";

    const ConfigType = SetNodeConfigRequest.ConfigType;

    export default {
        name: "NodeConfig",
        components: {
            BButton,
            BModal,
            BFormGroup,
            BFormInput,
            BToast
        },
        data() {
            return {
                config: null,
                model: {
                    txPoolLimit: null,
                    blkSizeLimit: null,
                    maxConnectionOut: null,
                    maxConnectionIn: null,
                    producerAddress: null,
                    producersList: null,
                    maxProducers: null,
                    ipfsAddressesList: null,
                    rpcPort: null
                },
                toasterProps: {
                    title: null,
                    variant: null,
                    message: null
                }
            };
        },
        methods: {
            getNodeConfig() {
                MetricsServiceClient.rpcGetNodeConfig(new MetricsServiceRequest(), {})
                    .then(resp => {
                        this.config = resp;
                        this.model = _.cloneDeep(this.config.toObject());
                        this.$refs.nodeConfigModal.show();
                    })
                    .catch(err => {
                        // eslint-disable-next-line
                        console.error(err);
                    });
            },
            makeSetNodeConfigRequest() {
                const req = new SetNodeConfigRequest();
                const updatedConfigs = [];
                for (const v of this.configuration)
                    if (!v.readonly)
                        v.addToRequest(req, updatedConfigs);

                req.setUpdatedConfigsList(updatedConfigs);
                return req
            },
            handleApply() {
                const req = this.makeSetNodeConfigRequest();
                if (req.getUpdatedConfigsList().length > 0) {
                    MetricsServiceClient.rpcSetNodeConfig(req, {})
                        .then(() => {
                            this.toasterProps = {title: "Successfully updated node configuration.", variant: "info", message: null};
                            this.$refs.setNodeConfigToast.show();
                        })
                        .catch(err => {
                            this.toasterProps = {title: "Unable to update node configuration.", variant: "warning", message: err.message};
                            this.$refs.setNodeConfigToast.show();
                            // eslint-disable-next-line
                            console.log(err);
                        });
                }
            },
            genericAddToRequest(req, oldValue, newValue, setFunc, configList, configType) {
                if (!_.isEqual(oldValue, newValue)) {
                    req[setFunc](newValue);
                    configList.push(configType);
                }
            }
        },
        computed: {
            configuration() {
                return [
                    {
                        modelKey: "txPoolLimit",
                        label: "Transaction Pool Limit (KB)",
                        number: true,
                        addToRequest:
                            (req, configList) => this.genericAddToRequest(req,
                                this.config.getTxPoolLimit(),
                                this.model.txPoolLimit,
                                "setTxPoolLimit",
                                configList,
                                ConfigType.TX_POOL_LIMIT
                            )
                    },
                    {
                        modelKey: "blkSizeLimit",
                        label: "Block Size Limit (KB)",
                        number: true,
                        addToRequest: (req, configList) => this.genericAddToRequest(req,
                            this.config.getBlkSizeLimit(),
                            this.model.blkSizeLimit,
                            "setBlkSizeLimit",
                            configList,
                            ConfigType.BLK_SIZE_LIMIT
                        )
                    },
                    {
                        modelKey: "maxConnectionOut",
                        label: "Max Outgoing Connections",
                        number: true,
                        addToRequest: (req, configList) => this.genericAddToRequest(req,
                            this.config.getMaxConnectionOut(),
                            this.model.maxConnectionOut,
                            "setMaxConnectionOut",
                            configList,
                            ConfigType.MAX_CONN_OUT
                        )
                    },
                    {
                        modelKey: "maxConnectionIn",
                        label: "Max Incoming Connections",
                        number: true,
                        addToRequest: (req, configList) => this.genericAddToRequest(req,
                            this.config.getMaxConnectionIn(),
                            this.model.maxConnectionIn,
                            "setMaxConnectionIn",
                            configList,
                            ConfigType.MAX_CONN_IN
                        )
                    },
                    {
                        modelKey: "producerAddress",
                        label: "Producer Address",
                        readonly: true
                    },
                    {
                        modelKey: "producersList",
                        label: "Producers",
                        addToRequest: (req, configList) => this.genericAddToRequest(req,
                            this.config.getProducersList(),
                            this.model.producersList,
                            "setProducersList",
                            configList,
                            ConfigType.PRODUCERS
                        )
                    },
                    {
                        modelKey: "maxProducers",
                        label: "Max Producers",
                        addToRequest: (req, configList) => this.genericAddToRequest(req,
                            this.config.getMaxProducers(),
                            this.model.maxProducers,
                            "setMaxProducers",
                            configList,
                            ConfigType.MAX_PRODUCERS
                        ),
                        configType: ConfigType.MAX_PRODUCERS
                    },
                    {
                        modelKey: "ipfsAddressesList",
                        label: "IPFS Addresses",
                        readonly: true
                    },
                    {
                        modelKey: "rpcPort",
                        label: "RPC Port",
                        number: true,
                        readonly: true
                    }
                ];
            }
        }
    };
</script>

<style scoped>
    .node-config-button {
        height: 100%;
        width: 100%;
        font-size: 1.2rem;
        word-wrap: break-word;
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>
