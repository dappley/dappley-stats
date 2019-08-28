import {mount} from "@vue/test-utils";
import NodeConfig from "../../../src/components/NodeConfig.vue";
import {SetNodeConfigRequest} from "../../../src/js/MetricServiceClient";

const ConfigType = SetNodeConfigRequest.ConfigType;

describe("Node Config Component Test Suite", () => {
    it("Should be able to add value to request", () => {
        const wrapper = mount(NodeConfig);

        const req = new SetNodeConfigRequest();
        wrapper.vm.genericAddToRequest(req, 1, 2, "setTxPoolLimit", req.getUpdatedConfigsList(), ConfigType.TX_POOL_LIMIT);

        const expected = new SetNodeConfigRequest();
        expected.setTxPoolLimit(2);
        expected.setUpdatedConfigsList([ConfigType.TX_POOL_LIMIT]);

        expect(req).toEqual(expected);
    });

    it("Should be able to create a request", () => {
        const wrapper = mount(NodeConfig);

        const expected = new SetNodeConfigRequest();
        expected.setTxPoolLimit(1);
        expected.setBlkSizeLimit(2);
        expected.setMaxConnectionOut(3);
        expected.setMaxConnectionIn(4);
        expected.setMaxProducers(5);
        expected.setProducersList(["producer-0", "producer-1"]);
        expected.setUpdatedConfigsList([
            ConfigType.TX_POOL_LIMIT,
            ConfigType.BLK_SIZE_LIMIT,
            ConfigType.MAX_CONN_OUT,
            ConfigType.MAX_CONN_IN,
            ConfigType.PRODUCERS,
            ConfigType.MAX_PRODUCERS
        ]);

        wrapper.setData({
            config: new SetNodeConfigRequest(),
            model: {
                txPoolLimit: expected.getTxPoolLimit(),
                blkSizeLimit: expected.getBlkSizeLimit(),
                maxConnectionOut: expected.getMaxConnectionOut(),
                maxConnectionIn: expected.getMaxConnectionIn(),
                producerAddress: "ignored",
                producersList: expected.getProducersList(),
                maxProducers: expected.getMaxProducers(),
                ipfsAddressesList: "ignored",
                rpcPort: "ignored"
            }
        });

        const req = wrapper.vm.makeSetNodeConfigRequest();
        expect(req).toEqual(expected);
    });
});
