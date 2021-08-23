import mpg_data from "./data/mpg_data.js";

/*
mpg_data is imported for you but that is for testing purposes only. All of the functions should use
a car_data param that is supplied as the first parameter.

As you write these functions notice how they could possibly be chained together to solve more complicated
queries.
 */

/**
 * @param {array} car_data - an instance of mpg_data that should be used for filtering.
 * @param minHorsepower {number}
 * @param minTorque {number}
 *
 * @return {array} An array of car objects with horsepower >= minHorsePower and torque >= minTorque
 * sorted by horsepower in descending order.
 *
 */
export function searchHighPower(car_data, minHorsepower, minTorque) {
    let conner = car_data
        .filter(p => p.horsepower >= minHorsepower)
        .filter(p => p.torque >= minTorque)
        .sort((a, b) => b.horsepower - a.horsepower);
    return conner;
}
// console.log(searchHighPower(mpg_data, 300, 300));

/**
 * @param {array} car_data
 * @param minCity
 * @param minHighway
 *
 *
 * @return {array} An array of car objects with highway_mpg >= minHighway and city_mpg >= minCity
 * sorted by highway_mpg in descending order
 *
 */
export function searchMpg(car_data, minCity, minHighway) {
    let conner = car_data
    .filter(p => p.highway_mpg >= minHighway)
    .filter(p => p.city_mpg >= minCity)
    .sort((a, b) => b.highway_mpg - a.highway_mpg);
    return conner;
}


/**
 * Find all cars where 'id' contains the search term below.
 * Sort the results so that if the term appears earlier in the string
 * it will appear earlier in the list. Make sure searching and sorting ignores case.
 * @param car_data
 * @param searchTerm A string to that is used for searching
 * @returns {[]} array of cars
 */
export function searchName(car_data, searchTerm) {
    let cars = car_data
    .filter(p => p.id.includes(searchTerm) ||
    p.id.includes(searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase()) ||
    p.id.includes(searchTerm.toUpperCase()) ||
    p.id.includes(searchTerm.toLowerCase()))

    .sort((a, b) => {
        if ( b.id.indexOf(searchTerm) > a.id.indexOf(searchTerm)) a - b;
    })
    return cars;
}

// console.log(searchName(mpg_data, "mw"));
/**
 * Find all cars made in the years asked for.
 * Sort the results by year in descending order.
 *
 * @param car_data
 * @param {number[]} years - array of years to be included in the results e.g. [2010, 2012]
 * @returns {[]} an array of car objects
 */
export function searchByYear(car_data, years) {
   
    
    let c = car_data
    .filter(p => years.includes(p.year))
    .sort((a, b) => b.year - a.year);
    
    return c;
}
console.log(searchByYear(mpg_data, [2011, 2009]));