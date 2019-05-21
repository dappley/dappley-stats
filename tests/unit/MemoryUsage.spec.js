import {shallowMount} from '@vue/test-utils'
import MemoryUsage from "../../src/components/MemoryUsage";

describe("Memory Usage Component Test Suite", () => {
    it("Missing used percentage", () => {
        const wrapper = shallowMount(MemoryUsage, {
            propsData: { stats: {}}
        });
        expect(wrapper.find(".memory-usage-percent").text()).toBe("");
    });
});
