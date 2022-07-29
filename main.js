// crear juego//

const grid = document.querySelector(".grid")
const resultDisplay = document.querySelector(".resultados")
let currentTiradorIndex = 202
let width = 15
let direccion = 1
let invasoresId
let goingRight = true

for (let i = 0; i < 255 ; i++) {
    const cuadros = document.createElement("div") 
     grid.appendChild(cuadros)
}

const cuadros = Array.from(document.querySelectorAll(".grid div"))

const alienInvasores = [
    0,1,2,3,4,5,6,7,8,9,
    ,15,16,17,18,19,20,21,22,23,24
    ,30,31,32,33,34,35,36,37,38,39
]
//Crear naves aliens//

function draw() {
    for (let i = 0; i < alienInvasores.length; i++) {
        cuadros [alienInvasores[i]].classList.add('invadir')      
    }
}

draw ()

function remove() {
    for (let i = 0; i < alienInvasores.length; i++) {
        cuadros [alienInvasores[i]].classList.remove("invadir")
    }
}
//Crear funcion para Mover tirador//
cuadros [currentTiradorIndex].classList.add("tirador")

function moverTirador(e) {
    cuadros[currentTiradorIndex].classList.remove("tirador")
    switch(e.key) {
        case "ArrowLeft":
            if (currentTiradorIndex % width !== 0) currentTiradorIndex -=1
            break
        case "ArrowRight":
            if (currentTiradorIndex % width < width -1) currentTiradorIndex +=1
             break
    }
    cuadros [currentTiradorIndex].classList.add("tirador")

}



//Crear funcion para naves invadir//

document.addEventListener("keydown", moverTirador)

function moverInvasores () {
    const leftEdge = alienInvasores[0] % width === 0
    const rightEdge = alienInvasores[alienInvasores.length -1] % width === width -1
    remove()

    if (rightEdge && goingRight){
        for (let i = 0; i < alienInvasores.length; i++) {
            alienInvasores[i] += width +1
            direccion = -1 
            goingRight = false
        }
    }
    if (leftEdge && !goingRight){
        for (let i = 0; i < alienInvasores.length; i++) {
            alienInvasores[i] += width -1
            direccion = 1 
            goingRight = true
        }
    }

    for(let i = 0; i < alienInvasores.length; i++) {
        alienInvasores[i] += direccion
    }
    /// Crear Mensaje de GameOver//
    draw()
     
     if (cuadros[currentTiradorIndex].classList.contains("invadir","tirador")){
        resultDisplay.innerHTML = "Game Over"
        clearInterval(invasoresId)
     }
      
     for (let i = 0; i < alienInvasores.length; i++){
        if(alienInvasores[i] > (cuadros.length)){
            resultDisplay.innerHTML = "Game Over"
            clearInterval(invasoresId)
        }
     }

    }
    
    invasoresId = setInterval(moverInvasores,100)
