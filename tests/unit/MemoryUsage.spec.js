import {shallowMount} from '@vue/test-utils'
import MemoryUsage from '../../src/components/MemoryUsage.vue'
import Helper from '../../src/js/Helper'

describe("Memory Usage Component Test Suite", () => {

    it("Missing property", () => {
        const wrapper = shallowMount(MemoryUsage, {
            propsData: { }
        });

        expect(wrapper.find(".memory-usage").exists()).toBe(false);
    });

    it("Sanity test", () => {
        const wrapper = shallowMount(MemoryUsage, {
            propsData: { stats: { HeapInuse : 1, HeapSys: 2}}
        });
        expect(wrapper.find(".memory-usage").text()).toBe("1/2");
    });

    it("Should be able to transform stats into chart.js format", function () {
        const wrapper = shallowMount(MemoryUsage, {
            propsData: {
                data: [
                    {
                        timestamp: 0,
                        value: {
                            heapInUse: 1,
                            HeapSys: 2
                        }
                    }
                ]
            }
        });

        expect(wrapper.vm.transformStats("heapInUse"))
            .toEqual([{x : Helper.unixTimestampToDate(0), y: 1}])
    });
});
