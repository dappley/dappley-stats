import {shallowMount} from "@vue/test-utils";
import BlockStats from "../../../src/components/BlockStats.vue";

describe("BlockStats Component Test Suite", () => {
    it("Should be able to generate graph data for chart.js bar chart", () => {
        const wrapper = shallowMount(BlockStats, {
            propsData: {
                graphData: [
                    {
                        numTransactions: 0,
                        height: 1
                    },
                    {
                        numTransactions: 1,
                        height: 2
                    }
                ]
            }
        });

        expect(wrapper.vm.chartData).toEqual({"datasets": [{"data": [0, 1]}], "labels": [1, 2]});
    });
});
