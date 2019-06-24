import {shallowMount} from "@vue/test-utils";
import BlockStats from "../../../src/components/BlockStats.vue";
import TestHelper from "../TestHelper";

describe("BlockStats Component Test Suite", () => {
    it("Should be able to generate graph data for chart.js bar chart", () => {
        const wrapper = shallowMount(BlockStats, {
            propsData: {
                graphData: [
                    TestHelper.NewBlockStat(0, 1),
                    TestHelper.NewBlockStat(1, 2)
                ]
            }
        });

        expect(wrapper.vm.chartData).toEqual({"datasets": [{"data": [0, 1]}], "labels": [1, 2]});
    });
});
