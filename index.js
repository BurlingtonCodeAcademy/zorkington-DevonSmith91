
/* --------------------------------Readline------------------------------------*/

const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}
/*---------------------------------Player----------------------------------------*/

const player = {
  currentHealth: 25
}

console.log(player.currentHealth)

function healthLoss() {
  if (player.currentHealth >= 0) {
      player.currentHealth = player.currentHealth - 1
      console.log(player.currentHealth)
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

const outside = new Room('Outside', ' ', [])
const foyer = new Room('Foyer', ' ', [])
const livingRoom = new Room('Living Room', ' ', [])
const kitchen = new Room('Kitchen', ' ', [])
const hallway = new Room('Hallway', ' ', [])
const mansRoom = new Room("Man's Room", ' ', [])
const girlsRoom = new Room("Girl's Room", ' ', [])
const basement = new Room('Basement', ' ', [])

mansRoom.locked = true
outside.locked = true

let roomLookUp = {
  'outside': outside,
  'foyer': foyer,
  'living room': livingRoom,
  'kitchen': kitchen,
  'hallway': hallway,
  'mans room': mansRoom,
  'girls room': girlsRoom,
  'basement': basement,
}


/* ------------------------------Look up Tables----------------------------------*/



// let itemLookUp = {
//   'newspaper': newspaper,
//   'key': key,
//   'doorknob': doorknob,
//   'garlic': garlic,
//   'wood steak': woodSteak,
//   'candy corn': candyCorn,
//   'roast': roast,
//   'snickers bar': snickersBar,
//   'tb cure': tbCure
// }

/*---------------------------------State Changes------------------------------------*/

let houseRooms = {
  'outside': { canChangeTo: ['foyer'] },
  'foyer': { canChangeTo: ['living room', 'outside'] },
  'living room': { canChangeTo: ['foyer', 'kitchen', 'hallway', 'basement'] },
  'kitchen': { canChangeTo: ['living room'] },
  'hallway': { canChangeTo: ['mans room', 'girls room', 'living room'] },
  'mans room': { canChangeTo: ['hallway'] },
  'girls room': { canChangeTo: ['hallway'] },
  'basement': { canChangeTo: ['living room'] }
};

let currentState = "foyer";

function enterState(newState) {
  let validTransitions = houseRooms[currentState].canChangeTo;
  if (validTransitions.includes(newState)) {
    currentState = newState;
    console.log('Your current state is: ' + currentState)

  } else {
    return 'Invalid state transition attempted - from ' + currentState + ' to ' + newState;
  }
}

/*----------------------------------Story--------------------------------------------*/

// start();

// async function start() {
//   const welcomeMessage = `You heard about a haunted house in the next town over. Curiosity got the best of 
//   you so you decided to go check it out on your day off. As you arrive you see a rundown, two story house. 
//   You notice the windows are covered in filth and no longer allow the light through. The overgrowth of plant 
//   life indicates that nobody has lived here for years. You approach a creepy red door that’s stained with 
//   dirt and mold. As you reach for the handle you notice that it appears to be heavily used, even to this day. 
//   You think nothing of it. As you walk through the door, a chill runs down your spine. Before you realize it 
//   the door closes behind you with an audible *click*. You start to panic. 

//   In front of you appears the ghost of a little girl. Her skin is pale and her dress that was once blue is now 
//   stained and tattered. Her jet black hair covers her face. As she raises her head slowly you notice her 
//   lifeless eyes looking at you and you hear her say “I love making new friends. Did you come here to play 
//   with me? If not you better find a way out fast!” She slowly fades out of sight.

//   You’re in the front entrance. 
//   There’s the door you came in behind you and a door into what looks like a living room in front of you. 
//   What would you like to do?\n>_`;
//   let answer = await ask(welcomeMessage);
//   console.log("I'm sorry, I dont know how to " + answer);
//   process.exit();
// }

