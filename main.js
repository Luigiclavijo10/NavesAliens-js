// Creamos clases. 

class Persona {
    constructor (nombre, email,password,edad) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.edad = edad;
    }

}

//Creamos un array de objetos. 

const personas = [];


//Creamos las variables necesarias: 

const idFormulario = document.getElementById('formulario');

idFormulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const edad = document.getElementById('edad').value;
    //Creamos el objeto persona
    const persona = new Persona (nombre, email, password,edad);
    //Agregamos los datos en el array
    personas.push(persona);
    //Guardamos los datos en el localStorage. 
    localStorage.setItem('Persona', JSON.stringify(personas));


    //Muestro el resultado con la siguiente función: 
    mostrarInfo(persona);
})


const resultado = document.getElementById('infoUsuarios');

const mostrarInfo = (persona) => {
    resultado(edad)
 
}

//Muestro el localStorage. 

const botonAdmin = document.getElementById('admin');
const datosAdmin = document.getElementById('datosAdmin');



//Condicion ser Mayor de Edad//

/**let edad = 18;
let resultad;


if (edad < 18 ){
    resultado = "menor de edad";
    }else{
        resultado = "mayor de edad";
    }


    console.log(resultado);

    console.log ();

    resultado = edad < 22 ? "menor de edad" : "mayor de edad";

    console.log(resultado)

    console.log();

    resultado = edad <= 12 ? "niño" : edad < 21 ? "adolecente" : "adulto";
    
    console.log(resultado)*/

    
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
      0,1,2,3,4,5,6,7,8,9,10,11,12
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
