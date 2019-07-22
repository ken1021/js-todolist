
var date=new Date();
let dateText = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
document.getElementById("date").innerHTML = dateText;
const addBtn = document.querySelector(".fa-plus-circle")
const clear = document.querySelector(".fa-sync-alt")
//addBtn.addEventListener("click",addItem)
const historyIcon = document.querySelector(".history")

const list = document.getElementById("list");
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const lineThrough  = "lineThrough"
const display ="display"

historyIcon.addEventListener("click",function(){

document.querySelector(".popup").classList.toggle(display)

})



let LIST ,id ;

let data = localStorage.getItem("todo")

if(data){
LIST = JSON.parse(data)
id=LIST.length}
//loadList(LIST)
else{
    LIST = [];
    id= 0;
}
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST)
}  else {
        LIST = [];
        id = 0;

    }
clear.addEventListener("click",function(){
    
    if(confirm("refresh all ??")){
    localStorage.removeItem("todo")
    location.reload()
    }
})
    function loadList (array){
        array.forEach(function(item){
            addItem(item.name, item.id, item.done, item.trash);
        });
    }

function addItem (toDo,id,done,trash){
    if (trash){ return;}

    const line = done?lineThrough:"";
    const checkIcon = done?CHECK:UNCHECK;
const itemContent =`<li class="item"  >
                    <i class="check far ${checkIcon}" id=${id} job ="complete"></i>
                    <p class="text ${line}">${toDo}</p>
                    <i class="float-right delete far fa-trash-alt" id=${id} job = "delete"></i>
                </li>`
    
    const position = "beforeEnd"
        list.insertAdjacentHTML(position,itemContent)




}


const input = document.getElementById("item");

input.addEventListener("keyup",fInput);
function fInput(event){
    if (event.keyCode ==13 && event.target.value!=""){
        const toDo = input.value
        addItem(toDo,id,false,false)
        LIST.push({
            name: toDo,
            id: id,
            done: false,
            date:dateText,
            historyDisplay: false,
            trash: false
        })
        localStorage.setItem("todo", JSON.stringify(LIST));
        id++;
        input.value= ""

    }

}

document.querySelector(".fa-plus-circle").addEventListener("click",function(){
    if(input.value){
    const toDo = input.value
        addItem(toDo,id,false,false)
        LIST.push({
            name: toDo,
            id: id,
            done: false,
            date: dateText,
            historyDisplay: false,
            trash: false
        })
        localStorage.setItem("todo",JSON.stringify(LIST));
        id++;
        input.value= ""}

})


function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(lineThrough);
    LIST[element.id].done =LIST[element.id].done?false:true;
    LIST[element.id].date = dateText;
    LIST[element.id].historyDisplay = false;


}
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].trash = true;
    LIST[element.id].date = dateText;
    LIST[element.id].historyDisplay = true;    

}

list.addEventListener("click", function(event){

    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob =="complete"){
        completeToDo(element)
    }else if(elmentJob ="delete"){
        removeToDo(element)
        location.reload();
    }
    localStorage.setItem("todo", JSON.stringify(LIST));




})

var localdata =localStorage.getItem("todo")
var localdataArray=(JSON.parse(localdata))


for( var k in localdataArray){
    
        if(localdataArray[k].trash && localdataArray[k].historyDisplay){
         var popupText =
            `<li class="item">
                <p class="text popup-text-li">${localdataArray[k].name}</p>
                <p class="text popup-date"> ${localdataArray[k].date}</p>
                <i class="float-right fa fa-copy" id=${localdataArray[k].id}></i>
                <i class="history-trash delete far fa-trash-alt" id=${localdataArray[k].id}></i>
                </p>
            </li>`;

document.querySelector(".popup-ul").insertAdjacentHTML("beforeEnd",popupText)

    }
}

document.querySelector(".close").addEventListener("click",function(){
    document.querySelector(".popup").classList.toggle(display)
})


document.querySelectorAll(".history-trash").forEach(function(item){
    item.addEventListener("click",function(e){
        e.target.parentNode.parentNode.removeChild(e.target.parentNode)
        LIST[(e.target.id)].historyDisplay = false;
        localStorage.setItem("todo",JSON.stringify(LIST))
        

    })
    // item.historyDisplay=false;

    //  localStorage.setItem("todo",JSON.stringify(LIST));
    // console.log(LIST)

})



// document.querySelector(".popup-ul").addEventListener("click",function(event){
//     if(event.target.parentNode){
//     event.target.parentNode.parentNode.removeChild(event.target.parentNode)
//     }


//     localStorage.setItem("todo",JSON.stringify(LIST));
//     console.log(LIST)



// })
