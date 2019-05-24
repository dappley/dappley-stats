
import {shallowMount} from '@vue/test-utils'
import TransactionPool from '../../src/components/TransactionPool'

describe("Transaction Pool Test Suite", () => {
    it("Simple test", () => {
        const wrapper = shallowMount(TransactionPool, {
            propsData: { size: 0 }
        });
        expect(wrapper.find(".transaction-pool").exists()).toBe(true)
    });
});
