import Helper from '../../../src/js/Helper'

describe("Helper Test Suite", () => {
    it("Should be able to transform stats into chart.js format", () => {
        const graphData = [
            {
                timestamp: 1,
                value: {
                    heapInUse: 2,
                    heapSys: 3
                }
            }
        ];
        expect(Helper.transformToChartJSData(graphData, ["timestamp"], ["value", "heapInUse"]))
            .toEqual([{x : Helper.unixTimestampToDate(1), y: 2}]);
        expect(Helper.transformToChartJSData(graphData, ["timestamp"], ["value", "heapSys"]))
            .toEqual([{x : Helper.unixTimestampToDate(1), y: 3}]);
    })
});
