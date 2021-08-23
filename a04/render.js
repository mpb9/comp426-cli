/**
 * Course: COMP 426
 * Assignment: a04
 * Author: Michael Beebe
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
    return (`
    <div class="section is-parent is-vertical">
        <article class="container is-child" style="color:${hero.backgroundColor}">
            <figure class="image is-square">
                <img class="is-square" alt="Hero Img" src="${hero.img}">
            </figure>
            <p class="title has-text-centered is-family-monospace"><span style="color:${hero.color}">${hero.name}</span></p>
            <p class="subtitle is-bold has-text-centered is-family-monospace"><span>${hero.subtitle}</span></p>
            <p class="is-family-monospace"><strong>Alter ego:</strong> ${hero.first} ${hero.last}</p>
            <p class="is-family-monospace"><strong>First appearance:</strong> ${hero.firstSeen}</p>
            <p class="is-family-monospace">${hero.description}</p>

            <button class="button is-dark is-right has-text-grey-lighter">Edit</button>
        </article>
    </div>
    `);

};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;

    return (`
    <form class="section has-background-warning-light">
        <div class="field">
            <label class="label">Hero Name</label>
            <div class="control">
                <input class="input is-italic" type="text" value=${hero.name}>
            </div>
        </div>
        <div class="field">
            <label class="label">First Name</label>
            <div class="control">
                <input class="input is-italic" type="text" value=${hero.first}>
            </div>
        </div>
        <div class="field">
            <label class="label">Last Name</label>
            <div class="control">
                <input class="input is-italic" type="text" value=${hero.last}>
            </div>
        </div>
        <div class="field">
            <label class="label">Subtitle</label>
            <div class="control">
                <input class="input is-italic" type="text" value=${hero.subtitle}>
            </div>
        </div>
        <div class="field">
            <label class="label">Hero Description</label>
            <div class="control">
                <textarea class="textarea is-italic">${hero.description}</textarea>
            </div>
        </div>
        <div class="field">
            <label class="label">Hero First Seen</label>
            <div class="control">
                <input class="input is-italic" type="date" value="${hero.firstSeen.getFullYear()}-${("0" + hero.firstSeen.getMonth())}-${("0" + hero.firstSeen.getDate())}">
            </div>
        </div>
        <button class="button is-danger is-right">Cancel</button>
        <button class="button is-dark is-right" type="submit">Save</button>
    </form>
    `);
};



/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()

    // TODO: Append the hero cards to the $root element
    for(let i = 0; i < heroes.length; i++) {
        $root.append(renderHeroCard(heroes[i]));
    }
    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];

    // TODO: Generate the hero edit form using renderHeroEditForm()

    // TODO: Append the hero edit form to the $root element
    $root.append(renderHeroEditForm(randomHero));
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
