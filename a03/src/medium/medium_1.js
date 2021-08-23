
import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let sum = 0;
    let i;
    for (i = 1; i <= array.length; i++){
        sum = sum + array[array.length-i];
    }
    return sum;
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    let length = array.length;
    let median = 0;
    if (length % 2 == 1){
        median = array[((length+1)/2)-1];
    } else {
        let low = array[((length)/2)-1];
        let high = array[(length)/2];
        median = (low+high)/2;
    }
    return median;
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    const arr = array;
    
    let length = arr.length;
    
    let sum = getSum(arr);

    let mean = sum/length;

    let median = getMedian(arr);
    
    let min = Math.min(...arr);
    let max = Math.max(...arr);

    let v = variance(arr, mean);

    let standard_deviation = Math.sqrt(v);
    
    return { min, median, max, variance: v, mean, length, sum, standard_deviation }
}

console.log(getStatistics([1, 3, 12, 15, 41, 54]));
