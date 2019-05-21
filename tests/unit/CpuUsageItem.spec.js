import {shallowMount} from '@vue/test-utils'
import CpuUsageItem from "../../src/components/CpuUsageItem";

describe("CPU Usage Component Test Suite", () => {
    it("No attributes", () => {
        const wrapper = shallowMount(CpuUsageItem, {
            propsData: { }
        });
        expect(wrapper.find(".cpu-usage-percent").exists()).toBe(false);
    });

    it("No cpu attribute", () => {
        const wrapper = shallowMount(CpuUsageItem, {
            propsData: { attrs: {} }
        });
        expect(wrapper.find(".cpu-usage-percent").exists()).toBe(false);
    });

    it("Missing and null attributes", () => {
        const wrapper = shallowMount(CpuUsageItem, {
            propsData: { attrs: { cpu: "cpu0", user: null } }
        });
        expect(wrapper.find(".cpu-usage-percent").text()).toBe("");
    });
});
