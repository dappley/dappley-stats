import {shallowMount} from "@vue/test-utils";
import CpuUsage from "@/components/CpuUsage.vue";
import TestHelper from "../TestHelper";

describe("CPU Usage Component Test Suite", () => {
    it("Missing property", () => {
        const wrapper = shallowMount(CpuUsage, {
            propsData: {}
        });

        expect(wrapper.find(".cpu-usage-percent").exists()).toBe(false);
    });

    it("Sanity test", () => {
        const wrapper = shallowMount(CpuUsage, {
            propsData: {graphData: [TestHelper.NewCPUStat(0, Math.PI)]}
        });
        expect(wrapper.vm.percent).toBe("3.14 %");
        expect(wrapper.find(".cpu-usage-percent").text()).toBe("3.14 %");
    });
});
