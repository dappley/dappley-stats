import {render} from '@vue/server-test-utils'
import Peers from "../../../src/components/Peers"

describe("Peers Component Test Suite", () => {
    it("Should display message when there are no connected peers", async () => {
        const wrapper = await render(Peers, {
            peers : []
        });
        expect(wrapper.find(".b-table-empty-row [role='alert']").text()).toBe("No connected peers.");
    });

    it("Should display the correct number of connected peers", async () => {
        const wrapper = await render(Peers, {
            peers: [
                { ID: "id0", Addrs: [ "address" ] }
            ]
        });
        expect(wrapper.find(".peers-table-row").length).toEqual(1);
    });
});
