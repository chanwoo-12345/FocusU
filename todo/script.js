const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('monthYear');
let currentDate = new Date();
let selectedDate = null;
let selectedTime = null;
function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date(); today.setHours(0,0,0,0);
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month+1, 0).getDate();
  calendar.innerHTML = '';
  monthYear.innerText = `${year}년 ${month+1}월`;
  ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(w=>{
    const d=document.createElement('div'); d.className='weekday'; d.innerText=w; calendar.appendChild(d);
  });
  for (let i=0;i<firstDay;i++) calendar.innerHTML += '<div></div>';
  for (let day=1; day<=lastDate; day++){
    const dateStr = `${year}-${month+1}-${day}`;
    const saved = JSON.parse(localStorage.getItem(dateStr) || "{}");
    const div=document.createElement('div'); div.className='day';
    div.innerHTML=`${day}<span class="emoji">${Object.keys(saved).length?"📝":""}</span>`;
    div.onclick = ()=> openSchedule(dateStr);
    calendar.appendChild(div);
  }
}
renderCalendar();

// Scheduler
const schedulePanel=document.getElementById("schedulePanel");
const scheduleList=document.getElementById("scheduleList");
const scheduleDate=document.getElementById("scheduleDate");

function openSchedule(dateStr){
  selectedDate=dateStr;
  scheduleDate.innerText=dateStr;
  scheduleList.innerHTML="";
  const data=JSON.parse(localStorage.getItem(dateStr)||"{}");
  for(let h=0;h<24;h++){
    const time=String(h).padStart(2,"0")+":00";
    const div=document.createElement("div"); div.className="time-slot";
    if(data[time]){ div.classList.add("time-filled"); div.innerText=`${time} | ${data[time]}`; }
    else div.innerText=`${time} |`;
    div.onclick=()=>openTimeModal(time);
    scheduleList.appendChild(div);
  }
  schedulePanel.style.bottom="0";
}
function closeSchedule(){ schedulePanel.style.bottom="-100%"; }

// Time modal
const timeModal=document.getElementById("timeModal");
const modalTime=document.getElementById("modalTime");
const timeInput=document.getElementById("timeInput");

function openTimeModal(time){
  selectedTime=time;
  modalTime.innerText=`${selectedDate} / ${time}`;
  const stored=JSON.parse(localStorage.getItem(selectedDate)||"{}");
  timeInput.value=stored[time]||"";
  timeModal.style.display="flex";
}
function closeTimeModal(){ timeModal.style.display="none"; }

function saveTime(){
  let data=JSON.parse(localStorage.getItem(selectedDate)||"{}");
  data[selectedTime]=timeInput.value;
  localStorage.setItem(selectedDate, JSON.stringify(data));
  closeTimeModal(); openSchedule(selectedDate); renderCalendar();
}
function deleteTime(){
  let data=JSON.parse(localStorage.getItem(selectedDate)||"{}");
  delete data[selectedTime];
  localStorage.setItem(selectedDate, JSON.stringify(data));
  closeTimeModal(); openSchedule(selectedDate); renderCalendar();
}

// Month navigation
function prevMonth(){ currentDate.setMonth(currentDate.getMonth()-1); renderCalendar(); }
function nextMonth(){ currentDate.setMonth(currentDate.getMonth()+1); renderCalendar(); }
