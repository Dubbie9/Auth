const pop_up = document.querySelector('.pop-up');
const customAlert = document.querySelector('.alert');
let alert_theme = document.querySelector("html").getAttribute("alert-theme");
let alertType = document.querySelector(".alertType");
const alertMessage = document.querySelector(".message");   

// using function constructor
function toggleAlert(message, type, theme){
    alertMessage.textContent = message
    alertType.textContent = type
    alert_theme = theme
    customAlert.classList.add("animate")
    setTimeout(()=>{
        customAlert.classList.remove("animate")
    }, 5000)
}


function random () {
    //generate 4 random numbers
    let numbers = [];
    for (let i = 0; i < 4; i++) {
        numbers.push(Math.floor(Math.random() * 10));
    }
    return numbers;
}

let inputs = document.querySelectorAll('input');//[input, input, input, input]
//focus on the first input
inputs[0].focus();

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', ()=>{
        if(isNaN(inputs[i].value)){
            inputs[i].value = '';
        }
        if(inputs[i].value.length == 1){
            inputs[i+1].focus();
        }
        if(inputs[i].value.length <1){
            inputs[i-1].focus();
        }            
    });
}

const submit = document.querySelector(".submit")

submit.addEventListener('click', function(){
    if(this.textContent == "Get Code"){
        this.textContent = "Submit Code"
        inputs[0].focus()
        let code = random().join("-")
        pop_up.querySelector('.code2').textContent = code;
        pop_up.classList.add("animate")
        document.querySelector('.code1').textContent = code;

        //timer for 15 secs timer removal
        let timer = 15
        let interval = setInterval(()=>{
            timer--;
            document.querySelector('.exp_note').textContent = `Code expires in ${timer} secs`

            if(timer <= 0){
                clearInterval(interval) // Corrected
                pop_up.classList.remove('animate') // Corrected
                pop_up.querySelector('.code2').textContent = ''
                document.querySelector('.code1').textContent = ''
                document.querySelector('.exp_note').textContent = 'Code Expired'
                this.textContent = "Get Code"
            }
        }, 1000)
    } else {
        for (let i = 0; i < inputs.length; i++){
            if(inputs[i].value == ''){
                toggleAlert("Please fill in all fields", "Error", "error")  
                break;
            }
        }
    }
});
