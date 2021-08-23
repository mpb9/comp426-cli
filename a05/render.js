/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */

export function dateAdjust(month) {
    let monArr = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
    return monArr[month];
};

export const renderHeroCard = function(hero) {
    // TODO: Copy your code from a04 to render the hero card
    return (`
    <div class="heroCard" data-id="${hero.id}">
        <article class="container is-child" style="color:${hero.backgroundColor}">
            <figure class="image is-square">
                <img class="is-square" alt="Hero Img" src="${hero.img}">
            </figure>
            <p class="title has-text-centered is-family-monospace"><span style="color:${hero.color}">${hero.name}</span></p>
            <p class="subtitle is-bold has-text-centered is-family-monospace"><span>${hero.subtitle}</span></p>
            <p class="is-family-monospace"><strong>Alter ego:</strong> ${hero.first} ${hero.last}</p>
            <p class="is-family-monospace"><strong>First appearance:</strong> ${hero.firstSeen.toISOString().slice(0,10)}</p>
            <p class="is-family-monospace">${hero.description}</p>

            <button class="edit"  >Edit</button>
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
    return (`
    <div class="heroEditForm" data-id="${hero.id}">
        <form>
            <div class="field">
                <label class="label">Hero Name</label>
                <div class="control">
                    <input id="name" class="input" type="text" value="${hero.name}">
                </div>
            </div>
            <div class="field">
                <label class="label">First Name</label>
                <div class="control">
                    <input id="first" class="input" type="text" value="${hero.first}">
                </div>
            </div>
            <div class="field">
                <label class="label">Last Name</label>
                <div class="control">
                    <input id="last" class="input" type="text" value="${hero.last}">
                </div>
            </div>
            <div class="field">
                <label class="label">Subtitle</label>
                <div class="control">
                    <input id="subtitle" class="input" type="text" value="${hero.subtitle}">
                </div>
            </div>
            <div class="field">
                <label class="label">Hero Description</label>
                <div class="control">
                    <textarea id="description" class="textarea">${hero.description}</textarea>
                </div>
            </div>
            <div class="field">
                <label class="label">Hero First Seen</label>
                <div class="control">
                    <input id="firstSeen" class="input" type="date" value="${hero.firstSeen.toISOString().slice(0,10)}">
                </div>
            </div>
            <button class="cancel" type!="submit">Cancel</button>
            <button class="submit" type="submit">Save</button>
        </form>
    </div>
    `);
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    let hero = heroicData.find(h => h.id === $(event.target).closest(".heroCard").data("id"));
    $((event.target).closest(".heroCard")).replaceWith(renderHeroEditForm(hero));
    
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    
    event.preventDefault();
    let hero = heroicData.find(h => h.id === $(event.target).closest(".heroEditForm").data("id"));
    $((event.target).closest(".heroEditForm")).replaceWith(renderHeroCard(hero));
    return false;
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    event.preventDefault();

    let hero = heroicData.find(h => h.id == $(event.target).closest(".heroEditForm").data("id"));
    hero.name = $('#name').val();
    hero.first = $('#first').val();
    hero.last = $('#last').val();
    hero.subtitle = $('#subtitle').val();
    hero.description = $('#description').val();
    // hero.firstSeen = new Date($('#firstSeen').val());

    let tempVar = $('#firstSeen').val();
    hero.firstSeen = new Date(tempVar.split('-')[0], tempVar.split('-')[1]-1, tempVar.split('-')[2]);
    
    $((event.target).closest(".heroEditForm")).replaceWith(renderHeroCard(hero));
    return false;
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part
    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part
    for(let i = 0; i < heroes.length; i++) {
        $root.append(renderHeroCard(heroes[i]));
    }

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button
    $root.on('click', '.edit', handleEditButtonPress);

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form
    $root.on('click', '.submit', handleEditFormSubmit);
    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
    $root.on('click', '.cancel', handleCancelButtonPress);
    
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
