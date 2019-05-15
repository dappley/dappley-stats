
import {shallowMount} from '@vue/test-utils'
import TransactionPool from '@/components/TransactionPool.vue'

describe("Transaction Pool Test Suite", () => {
    it("Simple test", () => {
        const wrapper = shallowMount(TransactionPool, {
            propsData: { size: 0, timeStamp: new Date().toUTCString() }
        });
        expect(wrapper.find(".transaction-pool").exists()).toBe(true)
    });
});
