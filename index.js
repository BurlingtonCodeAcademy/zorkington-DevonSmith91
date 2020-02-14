
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
  inventory: [],
  currentHealth: 25
}


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
const foyer = new Room('Foyer', 'You stand in the middle of a small room with peeling, yellowed wallpaper. The front door is to the south. North of you sits a door that leads into what looks like the living room.', [])
const livingRoom = new Room('Living Room', 'Entering the living room, you see furniture draped in sheets that are covered in dust and mold. The air is thick and stagnant and the little light that shines through the film on the windows casts a brown tint throughout the room. To the east of the room are two sets of stairs, one going up and one going down. To the north of you is a door that leads to the Kitchen. South of you is the door back to the Foyer.', [ 'newspaper' ])
const kitchen = new Room('Kitchen', 'The kitchen is filthy. The countertop against the wall in front of you is covered in a brown sticky film. Six cabinets sit underneath the countertop but only two have doors, the rest lay bare. Above the countertop sit another four cabinets all with doors intact. A refrigerator sits against the west wall and appears to be running. The oven against the east wall also seems to be in working condition as well. The door to the living room is behind you.', [ 'roast', 'garlic', 'wood steak', 'candy corn'])
const hallway = new Room('Hallway', 'Once you reach the top of the stairs you turn west and see a small hallway with a filthy window at the end. There are two doors on either side of the hallway, one to the north and the other to the south.', [])
const mansRoom = new Room("Man's Room", 'Once you enter the master bedroom, you see a huge king-sized bed to the north. On each side sits an end table, each with a lamp. Above the lamps on both sides of the bed are two framed pictures, one of a man in his early 30’s in a black suit that looks dated. The other picture features a woman in her late 20’s in a shimmering gold dress with black trim that seems to match with the era of the other picture. To the east wall sits a long dresser with two columns of four drawers. On top the the dresser sits a pristine, silver jewelry box with pearl trim that appears untouched by time. To the west wall is a large vanity with cracked mirror. The drawers sit open with nothing in them. The door back into the hallway remains open.', [ 'key' ])
const girlsRoom = new Room("Girl's Room", 'This room has a dingy pale pink wallpaper that is almost peeling off. In the middle of the room is a small metal framed bed and with a stained mattress and small pillow. Against the east wall is a small dresser with three drawers. To the west wall sits rocking horse that is continuously rocking. The way back into the hallway is behind you', [ 'doorknob' ])
const basement = new Room('Basement', ' *enter description here* The flight of stairs back up to the living room remains illuminated by the light coming in throught the windows.', [])

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
    console.log(currentState)
  } else {
    return 'Invalid state transition attempted - from ' + currentState + ' to ' + newState;
  }
}

enterState('living room')

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

