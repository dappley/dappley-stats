import Helper from "../../../src/js/Helper";

describe("Helper Test Suite", () => {
    it("Should be able to map the last value", () => {
        expect(Helper.mapLast([], (x) => x)).toBeUndefined();
        expect(Helper.mapLast([1], (x) => 2 * x)).toEqual(2);
        expect(Helper.mapLast([1, 2, 3], (x) => 2 * x)).toEqual(6);
    });

    it("Should be able to convert unix timestamp in seconds to a date", () => {
        // Mon Jun 24, 2019
        expect(Helper.unixTimestampToDate(1561417471).getUTCFullYear()).toEqual(2019);
    })
});
