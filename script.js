const buttons = document.querySelectorAll('button');
let topLeftText = document.getElementById('output-area');
let equalButton = document.getElementById('equals-sign');
let clear = document.getElementById('clear');
let remove = document.getElementsByClassName('remove');
let bottomRightText = document.getElementById('answer-screen')

let equation = ""
let answer = ""
let temp = "";
let equationArray = []
let pressedEqual = false;
let pressedRemoved = false;
let numberClickedEqual = 0;

/*If a button besides CLEAR AND DELETE are clicked, the text from that button is appended to the equation 
which shows on top left of screen.*/
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if ((button.innerText != "CLEAR") && (button.innerText !="DELETE")){
            if (pressedEqual == true) {
                if (button.innerText != '÷' && button.innerText != 'x' && button.innerText != '-' && button.innerText != '+' ) {
                    topLeftText.innerText = "";
                    bottomRightText.innerText = "";
                    equation = "";
                    answer = "";
                    equationArray = [];

            }}
            if (button.innerText != '÷' && button.innerText != 'x' && button.innerText != '-' && button.innerText != '+' && button.innerText != '=' ) {
                temp += button.innerText;
                bottomRightText.innerText = temp;
                numberClickedEqual ++
            }
            else if (button.innerText == '÷' || button.innerText == 'x' || button.innerText == '-' || button.innerText == '+' ) {
                bottomRightText.innerText = temp;
                temp = ""
            }
            else if (button.innerText == '='){
                temp = ""
            }

            equation += button.innerText;
            equationArray.push(button.innerText);
            topLeftText.innerText = equation;
            console.log(equation);
            pressedEqual = false;
            pressedRemoved = false;            
        }
    });
});


//If the equal button is clicked, the answer shows on screen. The equation and the calculation array are reset.
equalButton.addEventListener('click', () => {
    pressedRemoved = false;
    pressedEqual = true

    if (pressedEqual) {
        if (numberClickedEqual == 0) {
            answer += calculate(equationArray);
            if (answer > 1000000000){
                answer = answer / 100
            }
            equation += answer;
        }
        else {
            answer += calculate(equationArray);
            equation += answer;
            console.log(equationArray)

        }

        equationArray.push(answer)
        console.log(answer);
        //Answer to the equation shows up on the bottom right
        bottomRightText.innerText = answer;
        //Full equation with answer shows on top left
        topLeftText.innerText = equation;
        //This is so future calculations can be done
        equation = answer;
        answer = "";
        numberClickedEqual += 1;

    }
})


//If CLEAR or DELETE are clicked, the topleft and bottomright of screen are reset.
for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener('click',() => {
        topLeftText.innerText = "";
        bottomRightText.innerText = "";
        temp = ""
        equation = "";
        answer = ""
        equationArray = [];
        pressedRemoved = true;
        pressedEqual = false;
    });
}

/*Used to join adjacent elements together if they are both numbers 
in order to perform calculations for numbers with more than 1 digit. */
function format(arr){
    for (let j = arr.length - 1; j >= 0; --j){
        if (Number.isInteger(parseInt(arr[j])) && Number.isInteger(parseInt(arr[j-1]))) {
            arr[j-1] += arr[j];
            arr.splice(j, 1)
        }
        else if (arr[j] == '.') {
            arr[j-1] = arr[j-1] + '.' + arr[j+1];
            arr.splice(j+1, 1)
            arr.splice(j, 1)
        }
    }
}

function calculate(arr) {
    
    format(arr);
  
    // console.log(arr)
    // console.log(newArr)

    //Performs the actual calculations by looping through the array and rounding to 8 decimal points
    for (let i = 0; i < arr.length; i++){
        if (arr[i] == "+") {
            return Math.round((parseFloat(arr[i-1]) + parseFloat(arr[i+1]) + Number.EPSILON)* 100000000) / 100000000;
        }
        else if (arr[i] == "-") {
            return Math.round((parseFloat(arr[i-1]) - parseFloat(arr[i+1]) + Number.EPSILON)* 100000000) / 100000000;
        }
        else if (arr[i] == "x") {
            return Math.round((parseFloat(arr[i-1]) * parseFloat(arr[i+1]) + Number.EPSILON)* 100000000) / 100000000;
        }
        else if (arr[i] == "÷") {
            return Math.round((parseFloat(arr[i-1]) / parseFloat(arr[i+1]) + Number.EPSILON)* 100000000) / 100000000;
        }
    }
}


//Need to work on allowing for multiple operations in one line. Ex 2+3+4+5-14. Can only do 2+3=5
//Need to work on calculations after = sign
