const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.result')
const width = 20
const invadersRemoved = []
let spaceshipindex = 369
let invadersId
let isGoingright = true
let direction = 1
let result = 0


for (let i=0; i< width*width; i++){
    const squares = document.createElement('div')
    squares.id = i
    grid.appendChild(squares)
}

const squaresArray = Array.from(document.querySelectorAll('.grid div'))
console.log(squaresArray);

const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,10,11,
    20,21,22,23,24,25,26,27,28,29,30,31,
    40,41,42,43,44,45,46,47,48,49,50,51
]
function draw(){
    for (let i=0; i < alienInvaders.length; i++){
        if (!invadersRemoved.includes(i)){
            squaresArray[alienInvaders[i]].classList.add('invader')
        }
    }
}
draw()


squaresArray[spaceshipindex].classList.add('spaceship')

function shipMovement(e){
    squaresArray[spaceshipindex].classList.remove('spaceship')
    switch(e.key){
        case 'ArrowLeft':
            if (spaceshipindex % width !== 0) spaceshipindex -=1
            break;
        case 'ArrowRight':
            if (spaceshipindex % width < width -1) spaceshipindex += 1
            break;
    }
    squaresArray[spaceshipindex].classList.add('spaceship')
}

document.addEventListener('keydown', shipMovement)


function remove(){
    for (let i =0; i < alienInvaders.length; i++){
        squaresArray[alienInvaders[i]].classList.remove('invader')
    }
}


function invadersMovements(){
    const left = alienInvaders[0] % width === 0;
    const rigth = alienInvaders[alienInvaders.length-1] % width === width-1;
    remove()

    if (rigth && isGoingright){
        for (let i =0; i < alienInvaders.length; i++){
            alienInvaders[i] += width + 1
            direction = -1
            isGoingright = false
        }

    }
    if (left && !isGoingright){
        for (let i =0; i < alienInvaders.length; i++){
            alienInvaders[i] += width -1
            direction = 1
            isGoingright = true
        }
    }

    for (let i =0; i < alienInvaders.length; i++){
        alienInvaders[i] += direction
    }
    draw()

    if (squaresArray[spaceshipindex].classList.contains('invader')){
        resultDisplay.innerHTML = 'GAME OVER'
        clearInterval(invadersId)
    }

    if (invadersRemoved.length === alienInvaders.length){
        resultDisplay,innerHTML = 'YOU WIN'
        clearInterval(invadersId)
    }
}

invadersId = setInterval(invadersMovements, 600)


function Shoot(e){
    let laserId
    let currentlaserIndex = spaceshipindex

    function moveLaser(){
        squaresArray[currentlaserIndex].classList.remove('fire')
        currentlaserIndex -= width

        squaresArray[currentlaserIndex].classList.add('fire')

        if (squaresArray[currentlaserIndex].classList.contains('invader')){
            squaresArray[currentlaserIndex].classList.remove('invader')
            squaresArray[currentlaserIndex].classList.remove('fire')
            squaresArray[currentlaserIndex].classList.add('explosion')

            setTimeout(() => {
                squaresArray[currentlaserIndex].classList.remove('explosion')
            }, 300)
            clearInterval(laserId)

            const invadersiliminat = alienInvaders.indexOf(currentlaserIndex)
            invadersRemoved.push(invadersiliminat)
            result++
            resultDisplay.innerHTML = result
        }
    }

    if (e.key === 'ArrowUp'){
        laserId = setInterval(moveLaser, 60)
    }

}

document.addEventListener('keydown', Shoot)