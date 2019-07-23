
var date = new Date();
let dateText = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
document.getElementById("date").innerHTML = dateText;  // display date 


//head icon select
const addBtn = document.querySelector(".fa-plus-circle")
const historyIcon = document.querySelector(".history")
//to do list content 
const list = document.getElementById("list");



const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const lineThrough  = "lineThrough";

// open popup trash history page;
historyIcon.addEventListener("click", function(){
document.querySelector(".popup").classList.toggle(display)
})



let LIST ,id ;
let data = localStorage.getItem("todo");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST)  
}  else {
        LIST = [];
        id = 0;
    }


  //LIST is a array, use forEach function to every array  function below'
    
function loadList (array){
        array.forEach(function(item){
                    addItem(item.name, item.id, item.done, item.trash);
        });
    }

//classlists for insert html content use and later toggle the classlist when click icons


function addItem (toDo,id,done,trash){
    
    if (trash){ return;}  // if the LIST array objects "trash" value is "true" , no execute it, return                                blank.                     

const line = done?lineThrough:"";
const checkIcon = done?CHECK:UNCHECK;
const itemContent = `<li class="item"  >
                        <i class="check far ${checkIcon}" id=${id} job ="complete"></i>
                        <p class="text ${line}">${toDo}</p>
                        <i class="float-right delete far fa-trash-alt" id=${id} job = "delete"></i>
                    </li>`
    
    const position = "beforeEnd"
    list.insertAdjacentHTML(position,itemContent)

}

const input = document.getElementById("item");



input.addEventListener("keyup",inputHandle);  // USE keyboard "Enter" to add item on to do list.
function inputHandle(event){
            //keycode "13"  is the "enter" key on keyboard
    if (event.keyCode == 13 && event.target.value!= ""){
        
        const toDo = input.value;
        addItem(toDo,id,false,false)
        LIST.push({
            name: toDo,
            id: id,
            done: false,
            date:dateText,  // just for popup-history use to add the date for every list.
            historyDisplay: false,// just for popup-history use to the LIST in popup history or not
            trash: false
        })
        localStorage.setItem("todo", JSON.stringify(LIST));  //upload and update the storage
        id++;
        input.value= ""  //set the input value blank after  pressing enter.
}}


document.querySelector(".fa-plus-circle").addEventListener("click",function(){
    if(input.value){                        // click the add-icon to add item on to do list.
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

//click the circle ICON to complete the task and click the trash ICON to remove the task,

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(lineThrough);
    LIST[element.id].done =LIST[element.id].done?false:true;
    LIST[element.id].date = dateText;
    LIST[element.id].historyDisplay = false;


}
//
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


// below code for popup-history content display, get the arrays on local storage and decide which list to display on it through the value "trash"is true and the "historyDisplay" is true;

var localdata =localStorage.getItem("todo")
var localdataArray=(JSON.parse(localdata))

for( var k in localdataArray){
    
        if(localdataArray[k].trash && localdataArray[k].historyDisplay){
         var popupText =
            `<li class="item">
                <p class="text popup-text-li">${localdataArray[k].name}</p>
                <p class="text popup-date"> ${localdataArray[k].date}</p>
                <i class="float-right fa fa-copy" id = ${localdataArray[k].id}></i>
                <i class="history-trash delete far fa-trash-alt" id = ${localdataArray[k].id}></i>
                </p>
            </li>`;

document.querySelector(".popup-ul").insertAdjacentHTML("beforeEnd",popupText)

    }
}



// close Icon to close the POPup history page by the toggle the classlist style display none or block;
const display = "display";  
document.querySelector(".close").addEventListener("click", function(){
    document.querySelector(".popup").classList.toggle(display)
})

//remove the List in PopupHistory
document.querySelectorAll(".history-trash").forEach(function(item){
    item.addEventListener("click",function(e){
        e.target.parentNode.parentNode.removeChild(e.target.parentNode)
        LIST[(e.target.id)].historyDisplay = false;
        localStorage.setItem("todo", JSON.stringify(LIST))
        

    })

})

// copy Icon to copy the text

document.querySelectorAll(".fa-copy").forEach(function(copyIcon){
    copyIcon.addEventListener("click", function(event){

        const range = document.createRange();
        range.selectNode(event.target.parentNode.childNodes[1])
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range)
        document.execCommand("copy")

    })
})





const clear = document.querySelector(".fa-sync-alt");
clear.addEventListener("click", function(){
    
    if(confirm("Are You Sure to cancle all To do lists ??")){
    localStorage.removeItem("todo")
    location.reload()
    }
})



// document.querySelector(".popup-ul").addEventListener("click",function(event){
//     if(event.target.parentNode){
//     event.target.parentNode.parentNode.removeChild(event.target.parentNode)
//     }


//     localStorage.setItem("todo",JSON.stringify(LIST));
//     console.log(LIST)



// })
