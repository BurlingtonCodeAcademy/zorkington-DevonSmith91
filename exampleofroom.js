// class Room{
//     constructor(name, desc, inv){ 
//         this.name = name
//         this.desc = desc
//         this.inv = inv
//         this.locked = false
//     }
// }

// // function outsideRoom(inventory) {
// //     return new Room('You are outside', inventory, false)
// // }

// // let outsideOne = outsideRoom([])
// // let outisdeTwo = outsideRoom(['stick', 'rock', 'bug'])
// let entreance = new Room('You are now inside', [], true)

// console.log(entreance)

const player = {
    currentHealth: 25
}

console.log(player.currentHealth)

function healthLoss() {
    while (player.currentHealth >= 0) {
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

healthLoss();