import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: { "city": 
            (mpg_data
            .map(p => p.city_mpg)
            .reduce((x, y) => x +y))
            / mpg_data.length,
             "highway":
            (mpg_data
            .map(p => p.highway_mpg)
            .reduce((x, y) => x +y))
            / mpg_data.length,
            },
       
    allYearStats: getStatistics(mpg_data.reduce((acc, val) => {
        acc.push(val.year);
        return acc;
        }, [])),

    ratioHybrids: mpg_data.filter(p => p.hybrid === true).length / (mpg_data.length),
};



// console.log(allCarStats.avgMpg);
// console.log(allCarStats.allYearStats);
// console.log(allCarStats.ratioHybrids);
/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: hybrids(),
    avgMpgByYearAndHybrid: yearsNHybs()
};

export function hybrids(){
    let h = mpg_data
    .filter(p => p.hybrid === true)
    
    .map(p => {
        let h_obj = {make: p.make, model: p.id};
        return h_obj;
    });

    let makes = h
    .map(p => p.make)
    .reduce((a, b) => {
        if (!a.includes(b)) a.push(b);
        return a
    }, [])
    .sort((a, b) => (a > b) ? 1: -1)
    .map(p => {
        let ok = h
        .filter(b => (b.make === p))
        .map(b => b.model);
        let maybe = {make: p, hybrids: ok};
        return maybe;
    })
    .sort((a,b) => b.hybrids.length - a.hybrids.length);

   return makes;    
    
}



export function yearsNHybs(){
    let years = mpg_data
    .map(p => p.year)
    .reduce((a, b) => {
        if (!a.includes(b)) a.push(b);
        return a;
    }, [])
    .sort((a,b) => a-b);
    
    
        
        let finalProd = years
        .map(b => {
            let hybC = mpg_data
            .filter(q => q.year === b)
            .filter(q => q.hybrid === true);
            let numHyb = hybC.length;


            let cit_hyb = mpg_data
            .filter(q => q.year === b)
            .filter(q => q.hybrid === true)
            .map(p => p.city_mpg)
            .reduce((x, y) => x +y);
            let city = cit_hyb/numHyb;

            let high_hyb = mpg_data
            .filter(q => q.year === b)
            .filter(q => q.hybrid === true)
            .map(p => p.highway_mpg)
            .reduce((x, y) => x +y);
            let highway = high_hyb/numHyb;
            


            let nHybC = mpg_data
            .filter(q => q.year === b)
            .filter(q => q.hybrid === false);
            let numNHyb = nHybC.length;

            
            let cit_nhyb = mpg_data
            .filter(q => q.year === b)
            .filter(q => q.hybrid === false)
            .map(p => p.city_mpg)
            .reduce((x, y) => x +y);
            let ncity = cit_nhyb/numNHyb;

            let high_nhyb = mpg_data
            .filter(q => q.year === b)
            .filter(q => q.hybrid === false)
            .map(p => p.highway_mpg)
            .reduce((x, y) => x +y);
            let nhighway = high_nhyb/numNHyb;

            // let obj = {[b]: { hybrid: city, notHybrid: ncity} };
            let hyb = {hybrid: {"city": city, "highway": highway}};
            let nothyb = {notHybrid: {"city": ncity, "highway": nhighway}};

            let obj = { hybrid: { "city": city, "highway": highway }, notHybrid: { "city": ncity, "highway": nhighway } };
            return obj;

        }, {});

    let final = {[years[0]]: finalProd[0],
                [years[1]]: finalProd[1],
                [years[2]]: finalProd[2],
                [years[3]]: finalProd[3]};
        
        return final;
}
console.log(yearsNHybs());

// let obj = { [p]: { hybrid: {city: 0, highway: 0}, notHybrid: {city: 0, highway: 0}} };