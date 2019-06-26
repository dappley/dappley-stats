import {shallowMount} from "@vue/test-utils";
import ForkInfo from "../../../src/components/ForkInfo";
import TestHelper from "../TestHelper";

describe("Fork Info Component Test Suite", () => {
    it("Should retrieve the current longest fork", () => {
        const wrapper = shallowMount(ForkInfo, {
            propsData: {
                graphData: [
                    TestHelper.NewForkStat(0, 1, 2),
                    TestHelper.NewForkStat(1, 3, 4)
                ]
            }
        });

        expect(wrapper.vm.currentLongestFork).toBe(3);
    });
});