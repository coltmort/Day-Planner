var hourContainer = document.querySelector('.container-lg')
var currentDay = document.querySelector('#currentDay')
var today = dayjs().format('MMM DD, YY [at] h:mm')
var currentHour = dayjs().startOf('hour').format('H')
var timeBlocks = document.querySelectorAll('.time-block')

$(function() {
  hourContainer.addEventListener('click', handleSaveButton)
  
// changes past present and future datasets based on actual time
timeBlocks.forEach(element => {
  var blockHour = element.id.slice(5)
  if(currentHour > blockHour){
    element.dataset.when = 'past'
  } else if (currentHour === blockHour){
    element.dataset.when = 'present'
  } else{
    element.dataset.when = 'future'
  }}
)

//sets time every second 
setInterval(setTime,1000)
});

// sets local storage with textarea value
function handleSaveButton(e){
  if(e.target.matches('button')){
  var clickedSaveHour = e.target.closest('div').id
  var hourText = e.target.previousElementSibling.value
  localStorage.setItem(clickedSaveHour, hourText)
  }
}


function setHourText(){
  for (let i = 7; i <= 18; i++) {
    // prepends single digit hours with 0
    i = leftFillNum(i,2)
    var hourText = localStorage.getItem("hour-" + i)
    var hour = '#hour-' + i
    var hourDiv = document.querySelector(hour)
    hourDiv.querySelector(':scope > textarea').value = hourText
  }
}
setHourText()

function setTime(){
  currentDay.innerText = today
}
setTime()

function leftFillNum(num, targetLength) {
  return num.toString().padStart(targetLength, 0);
}