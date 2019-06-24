import {shallowMount} from "@vue/test-utils";
import MemoryUsage from "../../../src/components/MemoryUsage.vue";
import TestHelper from "../TestHelper";

describe("Memory Usage Component Test Suite", () => {
    it("Missing property", () => {
        const wrapper = shallowMount(MemoryUsage, {
            propsData: {}
        });

        expect(wrapper.find(".memory-usage").exists()).toBe(false);
    });

    it("Sanity test", () => {
        const wrapper = shallowMount(MemoryUsage, {
            propsData: {graphData: [TestHelper.NewMemStat(0, 1, 2)]}
        });
        expect(wrapper.find(".memory-usage").text()).toBe("1/2");
    });
});
