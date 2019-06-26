import {render} from "@vue/server-test-utils";
import Peers from "../../../src/components/Peers";
import TestHelper from "../TestHelper";

describe("Peers Component Test Suite", () => {
    it("Should display message when there are no connected peers", async () => {
        const wrapper = await render(Peers, {
            propsData: {
                peers: []
            }
        });
        expect(wrapper.find(".b-table-empty-row [role='alert']").text()).toBe("No connected peers.");
    });

    it("Should display the correct number of connected peers", async () => {
        const wrapper = await render(Peers, {propsData: {peers: [TestHelper.NewPeerInfo("id0", ["address"], 0)]}});
        expect(wrapper.find(".peers-table-row").length).toEqual(1);
    });
});
