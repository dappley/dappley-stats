import {shallowMount} from "@vue/test-utils";
import ForkInfo from '../../../src/components/ForkInfo'

describe("Fork Info Component Test Suite", () => {
    it("Should retrieve the current longest fork", () => {
        const wrapper = shallowMount(ForkInfo, {
            propsData: { graphData : [
                    { timestamp: 0, value: { longestFork: 1, numForks: 2} },
                    { timestamp: 1, value: { longestFork: 3, numForks: 4} }
                ] }
        });

        expect(wrapper.vm.currentLongestFork).toBe(3);
    });
});