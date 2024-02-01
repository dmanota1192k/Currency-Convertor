const Base_Url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const FromCurr = document.querySelector(".from select");
const ToCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for( let select of dropdown){
    for (currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name==="from" && currcode==="USD"){
            newOption.selected = "selected";
        }else if(select.name==="To" && currcode==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }    
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if(amountVal==="" || amountVal < 1){
        amountVal = 1;
        amount.value = "1";
    }

    const Url = `${Base_Url}/${FromCurr.value.toLowerCase()}/${ToCurr.value.toLowerCase()}.json`;
    let respone = await fetch(Url);
    let data = await respone.json();
    let rate = data[ToCurr.value.toLowerCase()];

    let finalamount = amountVal * rate;
    msg.innerText = `${amountVal} ${FromCurr.value} = ${finalamount} ${ToCurr.value}`;

}


const updateFlag = (element) =>{
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


window.addEventListener("load",() =>{
    updateExchangeRate();
})


btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});


