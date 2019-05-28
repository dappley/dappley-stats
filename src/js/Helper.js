import _ from 'lodash'
export default class Helper {
    /**
     *
     * @param timestamp
     * @returns {Date} corresponding to the provided unix timestamp
     */
    static unixTimestampToDate(timestamp) {
        return new Date(timestamp * 1000);
    }

    /**
     *
     * @param data is an array of objects
     * @param xKeys keys required to find x value in a data object
     * @param yKeys keys required to find y value in a data object
     * @returns {Array} of 2d coordinates to be plotted on chart.js graph
     */
    static transformToChartJSData(data, xKeys=["timestamp"], yKeys=["value"]) {
        return data.map( (stat) => {
            return { x: this.unixTimestampToDate(_.get(stat, xKeys)), y: _.get(stat, yKeys) }
        })
    }
}