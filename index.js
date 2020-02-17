/* --------------------------------Readline------------------------------------*/

const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);
function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

/*---------------------------------Functions-------------------------------------*/

function cleanWords(dirtyWord) {
  let steralize = dirtyWord.toString().trim().toLowerCase()
  return steralize
}

function healthGain(food) {
  if (player.inventory.includes(food) && food === 'roast') {
    player.inventory.splice(player.inventory.indexOf(food), 1)
    currentHealth = 10
    console.log("You restored all your health")
  } else if (player.inventory.includes(food) && food === 'snickers') {
    player.inventory.splice(player.inventory.indexOf(food), 1)
    currentHealth = currentHealth + 4
    console.log("You gained 5 points of health, but time is still running out!")
  } else if (player.inventory.includes(food) && food === 'garlic') {
    player.inventory.splice(player.inventory.indexOf(food), 1)
    currentHealth = currentHealth + 1
    console.log("You have gained 1 point of health, but at what cost?")
  } else if (player.inventory.includes(food) && food === 'candycorn') {
    player.inventory.splice(player.inventory.indexOf(food), 1)
    currentHealth = currentHealth + 1
    console.log("You pop in some of the original candycorn, circa 1922. Although your integrity is questioned, you gain 1 point of health")
  } else {
    console.log("You cant eat that!")
  }
}

function takeStuff(thingIWant) { //known bug. take *item that doesnt exist* throws an error and it's due to the takable property
  let canITakeIt = itemLookUp[thingIWant]
  if (canITakeIt.takeable === true && player.location.inv.includes(thingIWant)) {
    player.location.inv.splice(player.location.inv.indexOf(thingIWant), 1)
    player.inventory.push(thingIWant)
    console.log("You have now picked up " + thingIWant)
  } else {
    console.log("This is not your to take!")
  }
}

function dropStuff(trash) {
  if (player.inventory.includes(trash)) {
    player.inventory.splice(player.inventory.indexOf(trash), 1)
    player.location.inv.push(trash)
    console.log("You have now dropped " + trash)
  }
  else {
    console.log("You can\'t drop what you don\'t have!")
  }
}

function examine(thingToSee) {
  let lookAt = itemLookUp[thingToSee]
  if (player.location.inv.includes(thingToSee)) {
    console.log(lookAt.desc)
  } else {
    console.log('I\'m not sure what you\'re trying to do')
  }
}

function healthLoss() {
  if (player.currentHealth >= 0) {
    player.currentHealth = player.currentHealth - 1
    if (player.currentHealth === 5) {
      console.log("Your starting to feel a bit hungry, Maybe you should get some food")
    } if (player.currentHealth <= 3 && player.currentHealth > 0) {
      console.log("Your stomach growls and you start to feel a bit woozey. Food is a necessity")
    } if (player.currentHealth === 0) {
      console.log("You have starved to death, you are now one of us. better luck next time.")
      process.exit()
    }
  }
}

function enterState(newState) {
  let validTransitions = houseRooms[currentState].canChangeTo;
  if (validTransitions.includes(newState) && roomLookUp[newState].locked === true) {
    if (player.inventory.includes('key')) {
      outside.locked = false
      currentState = newState;
      let stateForTable = roomLookUp[currentState]
      console.log(stateForTable.desc)
      healthLoss()
      console.log('Player\'s current health is: ' + player.currentHealth)
    } else {
      console.log('The door before you is locked. Maybe you should find a key.')
    }
  } else if (validTransitions.includes(newState) && roomLookUp[newState].locked === false) {
    currentState = newState;
    let stateForTable = roomLookUp[currentState]
    console.log(stateForTable.desc)
    healthLoss()
    console.log('Player\'s current health is: ' + player.currentHealth)
  } else {
    console.log('That doesn\'t seem to be a place I know about. Care to try again?')
  }
  player.location = roomLookUp[currentState]
}

/*---------------------------------Player----------------------------------------*/

const player = {
  inventory: [],
  currentHealth: 10,
  location: null
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

const outside = new Room('Outside', 'Freedom! You can breath a sign of relief as you have escaped the Haunted Brown House.\nCongratulations on Successfully completing the game! Feel good about yourself, but not too good. It was an easy game.', [])

const foyer = new Room('Foyer', 'You stand in the middle of a small room with peeling, yellowed wallpaper. The front door is to one side and to the other, sits a door that leads into what looks like the lounge.', [])

const lounge = new Room('Lounge', 'Entering the lounge, you see furniture draped in sheets that are covered in dust and mold. The air is thick and stagnant and the little light that shines through the film on the windows casts a brown tint throughout the room. There is a dusty table in front of the couch and on it sits an old newspaper, yellowed by time. To the east of the room are two sets of stairs, one going up and one going down. To the far side of the room is a door that leads to the Kitchen. Behind you is the door back to the Foyer. ', ['newspaper'])

const kitchen = new Room('Kitchen', 'The kitchen is filthy. The countertop against the wall in front of you is covered in a brown sticky film. Six cabinets sit underneath the countertop but only two have doors, the rest lay bare. Above the countertop sit another four cabinets all with doors intact. A refrigerator sits against one wall and appears to be running. The oven against the opposite wall also seems to be in working as well. The smell of dinner fills the air. You seem put off by it but also quite curious. The door to the lounge is behind you.', ['roast', 'garlic', 'wood steak', 'candycorn'])

const hallway = new Room('Hallway', 'Once you reach the top of the stairs you turn west and see a small hallway with a filthy window at the end. There are two doors on either side of the hallway, one looks like the Master Bedchamber and the other looks to be a little girl\s bedroom.', [])

const bedchamber = new Room("Bedchamber", 'Once you enter the master bedroom, you see a huge king-sized bed. On each side sits an end table, each with a lamp. Above the lamps on both sides of the bed are two framed pictures, one of a man in his early 30s in a black suit that looks dated. The other picture features a woman in her late 20\'s in a shimmering gold dress with black trim that seems to match with the era of the other picture. Against one wall sits a long dresser with two columns of four drawers. On top the the dresser sits a pristine, silver jewelry box with pearl trim that appears untouched by time, next to it sits a key. On the opposite wall is a large vanity with cracked mirror. The drawers sit half open with what appears to be nothing in them. The door back into the hallway remains open.', ['key', 'snickers'])

const bedroom = new Room("Bedroom", 'This room has a dingy pale pink wallpaper that is almost peeling off. In the middle of the room is a small metal framed bed and with a stained mattress and small pillow. Against the east wall is a small dresser with three drawers. To the west wall sits rocking horse that is continuously rocking. The way back into the hallway is behind you', ['doorknob'])

const basement = new Room('Basement', 'The dark and dreery basement smells of dirt and mold. The flight of stairs back up to the lounge remains illuminated by the light coming in throught the windows. The dingy light shows cobblestone walls and a dirt floor, huddle in the corner is a black figure that looks at you menacingly', [])

outside.locked = true


/* ----------------------------------Items-------------------------------------------*/

class Item {
  constructor(name, desc, takeable) {
      this.name = name,
      this.desc = desc,
      this.takeable = takeable
  }
}


const newspaper = new Item('News Paper', 'An old, deteriorating newspaper is sitting on the table. As you peer over it you can see the date, it\'s from 1890, You are able to read the headline. It says: "Mercy Brown and Family found dead! Neighbors believe it to be the work of the undead!" You chuckle at the thought of people believing things like this.', false)

const key = new Item('Key', 'An old brass key, you think this is important', true)

const doorknob = new Item('Door Knob', 'An ornate doorknob', true)

const garlic = new Item('Garlic', 'A bulb of garlic that looks strangely fresh', true)

const woodSteak = new Item('Wood Steak', 'A wooden steak, it looks like it might have once been a broom handle', true)

const candyCorn = new Item('CandyCorn', 'A bag of old candycorn, It looks like there\'s one piece left in it', true)

const roast = new Item('Roast', 'A roast that has been sitting in the oven, it still is hot. Strangely it smells good.', true)

const snickersBar = new Item('Snickers', 'A Snickers sitting in an unopened wrapper.', true)

const tbCure = new Item('The Cure to Tuberculosis', 'A strange vial that looks like medicine, reading the label you see it\'s a cure for Tuberculosis', true)

/* ------------------------------Look up Tables----------------------------------*/

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

let itemLookUp = {
  'newspaper': newspaper,
  'key': key,
  'doorknob': doorknob,
  'garlic': garlic,
  'wood steak': woodSteak,
  'candycorn': candyCorn,
  'roast': roast,
  'snickers': snickersBar,
  'tb cure': tbCure
}

const actions = {
  move: ['move', 'go', 'walk', 'run',],
  consume: ['eat', 'consume'],
  grab: ['grab', 'take',],
  examine: ['examine', 'read'],
  drop: ['drop', 'throw', 'leave']
}

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

/*----------------------------------Story--------------------------------------------*/

async function intro() {

  const introMessage = `Welcome Risk Seeker! You are about to embark on a scary adventure! Please word your actions in a [Action] followed by [Item/Room] format. If you would like to look at your inventory you can do this by typing [C] at any time. You can also check on a rooms inventory by typing the letter [I] at any time. Please refer to rooms by their name, and cheaters will be punished to the full extent of my abilities.`

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
  const welcomeMessage = `You heard about a haunted house in the next town over. Curiosity got the best of you so you decided to go check it out on your day off. As you arrive you see a rundown, two story house. You notice the windows are covered in filth and no longer allow the light through. The overgrowth of plant life indicates that nobody has lived here for years. You approach a creepy red door that's stained with dirt and mold. As you reach for the handle you notice that it appears to be heavily used, even to this day. You think nothing of it. As you walk through the door, a chill runs down your spine. Before you realize it the door has closed behind you with an audible *click*. You start to panic. In front of you appears the ghost of a little girl. Her skin is pale and her dress that was once blue is now stained and tattered. Her jet black hair covers her face. As she raises her head slowly you notice her lifeless eyes looking at you and you hear her say "I love making new friends. Did you come here to play with me? If not you better find a way out fast!" She slowly fades out of sight. You're in the front entrance. There's the door you came in behind you and a door into what looks like a lounge in front of you. 
  
  What would you like to do?`;

  console.log(welcomeMessage);

  player.location = foyer
  
  while (player.currentHealth > 0 && player.location !== outside) {
    
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
    } else if (cleanInput === 'xyzzy') {
      console.log('Cheaters never prosper.')
      process.exit();
    } else if (actions.move.includes(command)) {
      enterState(activity)
    } else if (actions.grab.includes(command)) {
      takeStuff(activity)
    } else if (actions.drop.includes(command)) {
      dropStuff(activity)
    } else if (actions.consume.includes(command)) {
      healthGain(activity)
    } else if (actions.examine.includes(command)) {
      examine(activity)
    }else {
      console.log("I'm not too sure how to do " + cleanInput + ". Care to try again?")
    }
  }
  process.exit()
}


//a good place to start is to just launch the game and look at what it is that we want to do. we want to move? gotta write a move function
//if we want to interact with something? we need to write that function, we want to eat something? we need to write it. and go step by step until all of the actions are covered in terms of what we want people to be able to do.