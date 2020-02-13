class Room{
    constructor(name, desc, inv){ 
        this.name = name
        this.desc = desc
        this.inv = inv
        this.locked = false
    }
}

// function outsideRoom(inventory) {
//     return new Room('You are outside', inventory, false)
// }

// let outsideOne = outsideRoom([])
// let outisdeTwo = outsideRoom(['stick', 'rock', 'bug'])
let entreance = new Room('You are now inside', [], true)

console.log(entreance)