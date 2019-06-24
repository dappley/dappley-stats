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
     * @param array
     * @param fn
     * @returns {undefined|*} Applies fn to the last element of array and returns the result
     */
    static mapLast(array, fn) {
        if (array && array.length > 0) {
            return fn(array[array.length - 1]);
        }
        return undefined;
    }
}