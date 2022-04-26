var hours = ["5:00AM","6:00AM","7:00AM","8:00AM","9:00AM","10:00AM","11:00AM","12:00PM","1:00PM","2:00PM","3:00PM","4:00PM","5:00PM","6:00PM","7:00PM","8:00PM","9:00PM","10:00PM","11:00PM","12:00AM","1:00AM","2:00AM","3:00AM","4:00AM"];
var currentDateObj = new Date();
var currentTime = document.getElementById("#currentDay")
var numberOfMlSeconds = currentDateObj.getTime();
var addMlSeconds = 60 * 60 * 1000;
var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);

var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  document.getElementById("currentDay").innerHTML = date;

setInterval(function(){
  var time = moment().format("h:mm:ss a")
  document.getElementById("currentTime").innerHTML = time;
}, 1000) 


function addHoursToDate(objDate, intHours) {
  var numberOfMlSeconds = objDate.getTime();
  var addMlSeconds = (intHours * 60) * 60 * 1000;
  var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);

  return newDateObj;
  addHoursToDate(Date.now(), 24)
}

function makeTimeblocks(hour, existingTodo = "") {
  //build some additional logic for if time is past present or future;
  var currentHour = new Date().getHours() - 10;
  var presentPastOrFuture = "future";
  if (currentHour > hour + 9) presentPastOrFuture = "past";
  if (currentHour === hour + 9) presentPastOrFuture = "present";
  var hourName = hours[hour];
  var existingTodo = localStorage.getItem(hourName);
  // if (!existingTodo) existingTodo = "";
  console.log("SAVED TODO for ", hourName, existingTodo);
  $(".container").append(
    $(`
    <div class="row time-block">
        <div class="hour col-1">${hourName}</div>
        <textarea name="" id="${hourName}" cols="30" rows="3" class="description col-9 ${presentPastOrFuture}">${
      existingTodo || ""
    }</textarea>
        <button class="btn saveBtn col-2">Save</button>
    </div>`)
  );

  //free feel to do the non-jquery equiv.
}

for (var i = 0; i < 9; i++) {
  makeTimeblocks(i);
}

//still need to add click event listeners so when a block is clicked, grabs the value from that textarea, and saves it in localStorage.
var btns = document.querySelectorAll(".saveBtn");
console.log(btns); //ONLY SELECTS THE FIRST ELEMENT THAT MATCHES SELECTOR
btns.localStorage
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", functionToHandleClickOnSaveBtn);
}

function functionToHandleClickOnSaveBtn(event) {
  //do some logic here

  var todoValue = event.target.parentNode.children[1].value;
  var todoKey = event.target.parentNode.children[1].id;

  console.log("key values ", todoKey, todoValue);
  //store the keyval pair in localStorage
  localStorage.setItem(todoKey, todoValue);
}
//when app first loads, need to grab all existing todos and show on the page
