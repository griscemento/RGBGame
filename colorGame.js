//tiene el 6 porque es la cantidad de rectangulos que tenemos para elegir
//si fueran 3 rectangulos seria '3'
let colors = randomizeColors(6);

//we randomize the colors 
let rectangle = document.querySelectorAll(".rectangle");
let pickedColor = pickColor();

console.log("picked color: " + pickedColor);
let colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent= pickedColor;
let answerDisplay = document.querySelector("#answer");
let youLoseColor = "rgb(26, 28, 27)";
let headerWinner = document.querySelector(".header");
let resetButton = document.querySelector("#reset");
let difficulty = 6;
let selectedButton = document.querySelector(".selected");
let originalColor = "rgb(232, 114, 152)";

//all difficulty buttons selected
let difficultyMode = document.querySelectorAll(".modo");

init();

function init(){
    setDifficultyButtons();
    setRectangleInitialColors();   
}

function setDifficultyButtons(){
    for(let i = 0; i< difficultyMode.length; i++){
    difficultyMode[i].addEventListener("click", function(){
    //remove selected class from all buttons
    difficultyMode[0].classList.remove("selected");
    difficultyMode[1].classList.remove("selected");
    //add it to this button
    this.classList.add("selected");
    //select the difficulty

    if(this.textContent === "Fácil"){
        difficulty = 3;
        generateColors(difficulty);
    } else{
        difficulty = 6;
        generateColors(difficulty);
        }
    })
}
}

//display rectangle blocks 
function setRectangleInitialColors(){
    for(let i = 0; i< rectangle.length; i++){
        //add colors to the rectangles
        rectangle[i].style.backgroundColor = colors[i];
        //add logic to compare rectangle to the picked color!
        rectangle[i].addEventListener("click", function(){
            //grab color of the clicked rectangle
            let clickedColor = this.style.backgroundColor;
            console.log(clickedColor);
            //compare to the pickedColor
            if(clickedColor === pickedColor){
                answerDisplay.style.display = "block";
                answerDisplay.textContent = "Ganaste!";
                headerWinner.style.backgroundColor = clickedColor;
                makeAllRectsLikeWinner();
                resetButton.textContent = "Jugar de nuevo?"
                
    
            }else {
                answerDisplay.style.display = "block";
                answerDisplay.textContent = "Tratá de nuevo";
                this.style.backgroundColor = youLoseColor; 
            } 
            }
        )}}

//reset button 
resetButton.addEventListener("click", function(){
    //generamos nuevos colores para el array
    if(difficulty === 3){
        generateColors(3);
        } else {
            generateColors(6);
        }
    headerWinner.style.backgroundColor = originalColor;
    resetButton.textContent = "Nuevos Colores";
    answerDisplay.style.display= "none";
});


function generateColors(num){
    colors = randomizeColors(num);
    pickedColor = pickColor();
    //mostrar el nuevo color a adivinar
    colorDisplay.textContent = pickedColor;
    //los seteamos para que se vean
    
    for(let i = 0; i < rectangle.length; i++){
        if(colors[i]){
        rectangle[i].style.backgroundColor = colors[i];
        rectangle[i].style.display = "block";
        } else if(colors[i] === 3) {
            rectangle[i].style.backgroundColor = colors[i];
            rectangle[i].style.display = "block";            
        } 
        else {
            rectangle[i].style.display = "none";
        
        }
    }
    randomizeColors(num);
    headerWinner.style.backgroundColor = originalColor;
    resetButton.textContent = "Nuevos Colores";
}

//hace que el color a adivinar sea un random y no hardcodeado
//elige entre 6 porque tenemos 6 rectangulos
function pickColor(){
    let cualquiera = Math.floor(Math.random() * 6 +1);
    return colors[cualquiera];
}

//hacemos que se elijan colores al azar entre todos los rgb
function randomizeColors(num){
    //se hace un array, se agrega num cantidad de colores al array
    //devolvemos el array
    let arr = [];
    for(let i = 0; i < num; i++){
        arr.push(randomColor());
    }
    return arr;
}

function randomColor(){
    let rojo = Math.floor(Math.random() * 256);
    let verde = Math.floor(Math.random() * 256);
    let azul = Math.floor(Math.random() * 256);
    let hiloColores =  "rgb(" + rojo + ", " + verde + ", " + azul + ")"
    return hiloColores;
}

function makeAllRectsLikeWinner(){
    for(let i = 0; i< rectangle.length; i++){
    rectangle[i].style.backgroundColor = pickedColor;
    }
}