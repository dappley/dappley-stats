import {shallowMount} from "@vue/test-utils";
import ForkInfo from '../../../src/components/ForkInfo'

describe("Fork Info Component Test Suite", () => {
    it("Should retrieve the current longest fork", () => {
        const wrapper = shallowMount(ForkInfo, {
            propsData: { graphData : [
                    { timestamp: 0, value: { longestFork: 1, numForks: 1} },
                    { timestamp: 1, value: { longestFork: 2, numForks: 2} }
                ] }
        });

        expect(wrapper.vm.currentLongestFork).toBe(2);
    });
});