export default class Helper {
    /**
     *
     * @param timestamp
     * @returns {Date} corresponding to the provided unix timestamp
     */
    static unixTimestampToDate(timestamp) {
        return new Date(timestamp * 1000);
    }
}