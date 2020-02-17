/* --------------------------------Readline------------------------------------*/
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);
function ask(questionText) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, resolve);
    });
}
/*---------------------------------Functions-------------------------------------*/
function cleanWords(word) {
    let steralize = word.toString().trim().toLowerCase()
    return steralize
}
function healthGain(word) {
    if (player.inventory.includes(word) && word === 'roast') {
        currentHealth = 25
        console.log("You restored all your health")
    } else if (player.inventory.includes(word) && word === 'snickers') {
        currentHealth = currentHealth + 5
        console.log("You gained 5 points of health, but time is still running out!")
    } else if (player.inventory.includes(word) && word === 'garlic') {
        currentHealth = currentHealth + 1
        console.log("You have gained 1 point of health, but at what cost?")
    } else if (player.inventory.includes(word) && word === 'candycorn') {
        currentHealth = currentHealth + 1
        console.log("You pop in some of the original candycorn, circa 1922. Although your integrity is questioned, you gain 1 point of health")
    } else {
        console.log("You cant eat that!")
    }
}
function takeStuff(word) {
    let canITakeIt = itemLookUp[word]
    if (canITakeIt.takeable === true && player.location.inv.includes(word)) {
        player.location.inv.splice(player.location.inv.indexOf(word), 1)
        player.inventory.push(word)
        console.log("You have now picked up " + word)
    }
    else {
        console.log("This is not your to take!")
    }
}
function unlock(word) {
    if (player.inventory.includes('key')) {
        currentState.locked = false
        console.log("You place the key in the lock and turn it. *click* The door opens and you can now escape!")
    } else {
        console.log("You don\'t have a key, keep looking around the house for one")
    }
}
function examine(word) {
    let lookAt = itemLookUp[word]
    if (player.location.inv.includes(word)) {
        console.log(lookAt.desc)
    }
}
/*---------------------------------Player----------------------------------------*/
const player = {
    inventory: [],
    currentHealth: 13,
    location: null
}
function healthLoss() {
    if (player.currentHealth >= 0) {
        player.currentHealth = player.currentHealth - 1
        if (player.currentHealth === 12) {
            console.log("Your starting to feel a bit hungry, Maybe you should get some food")
        } if (player.currentHealth <= 6 && player.currentHealth > 0) {
            console.log("Your stomach growls and you start to feel a bit woozey. Food is a necessity")
        } if (player.currentHealth === 0) {
            console.log("You have starved to death, you are now one of us. better luck next time.")
            process.exit()
        }
    }
}
/*---------------------------------Rooms-----------------------------------------*/
class Room {
    constructor(name, desc, inv) {
        this.name = name
        this.desc = desc
        this.inv = inv
        this.locked = false
    }
}
const outside = new Room('Outside', 'Freedom! You can breath a sign of relief as you have escaped the Haunted Brown House', [])
const foyer = new Room('Foyer', 'You stand in the middle of a small room with peeling, yellowed wallpaper. The front door is to the south. North of you sits a door that leads into what looks like the lounge.', [])
const lounge = new Room('Lounge', 'Entering the lounge, you see furniture draped in sheets that are covered in dust and mold. The air is thick and stagnant and the little light that shines through the film on the windows casts a brown tint throughout the room. To the east of the room are two sets of stairs, one going up and one going down. To the north of you is a door that leads to the Kitchen. South of you is the door back to the Foyer.', ['newspaper'])
const kitchen = new Room('Kitchen', 'The kitchen is filthy. The countertop against the wall in front of you is covered in a brown sticky film. Six cabinets sit underneath the countertop but only two have doors, the rest lay bare. Above the countertop sit another four cabinets all with doors intact. A refrigerator sits against the west wall and appears to be running. The oven against the east wall also seems to be in working condition as well. The door to the lounge is behind you.', ['roast', 'garlic', 'wood steak', 'candycorn'])
const hallway = new Room('Hallway', 'Once you reach the top of the stairs you turn west and see a small hallway with a filthy window at the end. There are two doors on either side of the hallway, one to the north and the other to the south.', [])
const bedchamber = new Room("Bedchamber", 'Once you enter the master bedroom, you see a huge king-sized bed to the north. On each side sits an end table, each with a lamp. Above the lamps on both sides of the bed are two framed pictures, one of a man in his early 30s in a black suit that looks dated. The other picture features a woman in her late 20\'s in a shimmering gold dress with black trim that seems to match with the era of the other picture. To the east wall sits a long dresser with two columns of four drawers. On top the the dresser sits a pristine, silver jewelry box with pearl trim that appears untouched by time. To the west wall is a large vanity with cracked mirror. The drawers sit open with nothing in them. The door back into the hallway remains open.', ['key'])
const bedroom = new Room("Bedroom", 'This room has a dingy pale pink wallpaper that is almost peeling off. In the middle of the room is a small metal framed bed and with a stained mattress and small pillow. Against the east wall is a small dresser with three drawers. To the west wall sits rocking horse that is continuously rocking. The way back into the hallway is behind you', ['doorknob'])
const basement = new Room('Basement', 'The dark and dreery basement smells of dirt and mold. The flight of stairs back up to the lounge remains illuminated by the light coming in throught the windows. The dingy light shows cobblestone walls and a dirt floor, huddle in the corner is a black figure that looks at you menacingly', [])
outside.locked = true

let roomLookUp = {
    'outside': outside,
    'foyer': foyer,
    'lounge': lounge,
    'kitchen': kitchen,
    'hallway': hallway,
    'bedchamber': bedchamber,
    'bedroom': bedroom,
    'basement': basement,
}
/* ------------------------------Look up Tables----------------------------------*/
class Item {
    constructor(name, desc, takeable, action) {
        this.name = name,
            this.desc = desc,
            this.takeable = takeable,
            this.action = action
    }
}
const newspaper = new Item('News Paper', 'An old, deteriorating newspaper', false, () => { console.log('As your fingers start to touch the paper, it instantly turns to dust. You think better of trying to take it.') })
const key = new Item('Key', 'An old brass key, you think this is important', true, () => {/*need to write a function here that will allow key use*/ })
const doorknob = new Item('Door Knob', 'An ornate doorknob', true, () => {/*need to write a function that will allow doorknob use, same as key use*/ })
const garlic = new Item('Garlic', 'A bulb of garlic that looks strangely fresh', true, () => {/*need to write a function that will allow use of garlic to kill vampire*/ })
const woodSteak = new Item('Wood Steak', 'A wooden steak, it looks like it might have once been a broom handle', true, () => {/*need to write a function that will allow use of steak to kill vampire*/ })
const candyCorn = new Item('CandyCorn', 'A bag of old candycorn, It looks like there\'s one piece left in it', true, () => {/*need to write a function that will allow player to eat and gain a few health*/ })
const roast = new Item('Roast', 'A roast that has been sitting in the oven, it still is hot. Strangely it smells good.', true, () => {/*need to write a function that will allow player to eat and gain all their health back*/ })
const snickersBar = new Item('Snickers Bar', 'A Snickers Bar sitting in an unopened wrapper.', true, () => {/*need to write a function that will allow player to eat and gain a few health back*/ })
const tbCure = new Item('The Cure to Tuberculosis', 'A strange vial that looks like medicine, reading the label you see it\'s a cure for Tuberculosis', true, () => {/*need to figure out what happens if you try to use this*/ })

let itemLookUp = {
    'newspaper': newspaper,
    'key': key,
    'doorknob': doorknob,
    'garlic': garlic,
    'wood steak': woodSteak,
    'candycorn': candyCorn,
    'roast': roast,
    'snickers bar': snickersBar,
    'tb cure': tbCure
}
const actions = {
    move: ['move', 'go', 'walk', 'run',],
    consume: ['eat', 'consume'],
    grab: ['grab', 'take',],
    unlock: ['unlock', 'use'],
    examine: ['examine', 'read']
}
//use "steal" command if statement as "cheat code" of sorts
/*---------------------------------State Changes------------------------------------*/
let houseRooms = {
    'outside': { canChangeTo: ['foyer'] },
    'foyer': { canChangeTo: ['lounge', 'outside'] },
    'lounge': { canChangeTo: ['foyer', 'kitchen', 'hallway', 'basement'] },
    'kitchen': { canChangeTo: ['lounge'] },
    'hallway': { canChangeTo: ['bedchamber', 'bedroom', 'lounge'] },
    'bedchamber': { canChangeTo: ['hallway'] },
    'bedroom': { canChangeTo: ['hallway'] },
    'basement': { canChangeTo: ['lounge'] }
};
let currentState = 'foyer'
function enterState(newState) {
    let validTransitions = houseRooms[currentState].canChangeTo;
    if (validTransitions.includes(newState) && roomLookUp[newState].locked === true) {
        console.log('The door before you is locked. You can not pass through a locked door.')
    } else if (validTransitions.includes(newState) && roomLookUp[newState].locked === false) {
        currentState = newState;
        let stateForTable = roomLookUp[currentState]
        console.log(stateForTable.desc)
        healthLoss()
        console.log('Player\'s current health is: ' + player.currentHealth)
        return
    } else {
        console.log('That doesn\'t seem to be a place I know about. Care to try again?')
    }
    player.location = roomLookUp[currentState]
}


/*----------------------------------Story--------------------------------------------*/
async function intro() {
    const introMessage = `Welcome Risk Seeker! You are about to embark on a scary adventure! Please word your actions in a [action] + [Item/Room] format`
    let startPrompt = await ask(introMessage + '\n' + 'Do you understand?\n>_')
    let cleanStart = cleanWords(startPrompt)
    if (cleanStart === 'yes') {
        start();
    } else {
        console.log("Probably best to try a different game then. Good Bye.")
        process.exit();
    }
}
intro()
async function start() {
    const welcomeMessage = `You heard about a haunted house in the next town over. Curiosity got the best of you so you decided to go check it out on your day off. As you arrive you see a rundown, two story house. You notice the windows are covered in filth and no longer allow the light through. The overgrowth of plant life indicates that nobody has lived here for years. You approach a creepy red door that's stained with irt and mold. As you reach for the handle you notice that it appears to be heavily used, even to this day. You think nothing of it. As you walk through the door, a chill runs down your spine. Before you realize it the door closes behind you with an audible *click*. You start to panic. In front of you appears the ghost of a little girl. Her skin is pale and her dress that was once blue is now stained and tattered. Her jet black hair covers her face. As she raises her head slowly you notice her lifeless eyes looking at you and you hear her say "I love making new friends. Did you come here to play with me? If not you better find a way out fast!" She slowly fades out of sight. You're in the front entrance. There's the door you came in behind you and a door into what looks like a lounge in front of you. 
  
  What would you like to do?`;
    console.log(welcomeMessage);
    player.location = foyer
    while (player.currentHealth > 0) {
        let dirtyInput = await ask('>_')
        let cleanInput = cleanWords(dirtyInput)
        let cleanArray = cleanInput.split(' ')
        let command = cleanArray[0]
        let activity = cleanArray[cleanArray.length - 1]
        if (cleanInput === 'i') {
            if (player.location.inv.length === 0) {
                console.log("There is nothing here...")
            } else {
                player.location.inv.forEach(function (obj) {
                    console.log(obj)
                })
            }
        } else if (cleanInput === 'c') {
            if (player.inventory.length === 0) {
                console.log("You don\'t seem to be carrying anything. Would you like to pick something up?")
            } else {
                player.inventory.forEach(function (obj) {
                    console.log(obj)
                })
            }
        } else if (actions.move.includes(command)) {
            enterState(activity)
        } else if (actions.grab.includes(command)) {
            takeStuff(activity)
        } else if (actions.consume.includes(command)) {
            healthGain(activity)
        } else if (actions.unlock.includes(command)) {
            unlock(activity)
        } else if (actions.examine.includes(command)) {
            examine(activity)
        }
        else {
            console.log("I'm not too sure how to do " + cleanInput + ". Care to try again?")
        }
    }
}
//a good place to start is to just launch the game and look at what it is that we want to do. we want to move? gotta write a move function
//if we want to interact with something? we need to write that function, we want to eat something? we need to write it. and go step by step until all of the actions are covered in terms of what we want people to be able to do.