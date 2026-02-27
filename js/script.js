
const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const modal = document.getElementById("eventModal");

let selectedDate = null;
let currentDate = new Date(2026,0);
let events = JSON.parse(localStorage.getItem("events")) || {};

function renderCalendar() {
    calendar.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const monthNames = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

    monthYear.textContent = monthNames[month] + " " + year;

    for(let i=0;i<firstDay;i++){
        calendar.appendChild(document.createElement("div"));
    }

    for(let day=1; day<=lastDate; day++){
        const cell = document.createElement("div");
        const dateKey = year+"-"+month+"-"+day;

        const number = document.createElement("div");
        number.textContent = day;
        number.classList.add("day-number");
        cell.appendChild(number);

        if(events[dateKey]){
            events[dateKey].forEach(ev=>{
                const evDiv = document.createElement("div");
                evDiv.classList.add("event");
                evDiv.style.background = ev.color;
                evDiv.textContent = ev.title;
                cell.appendChild(evDiv);
            });
        }

        cell.onclick = ()=>openModal(dateKey);

        const today = new Date();
        if(day===today.getDate() && month===today.getMonth() && year===today.getFullYear()){
            cell.classList.add("today");
        }

        calendar.appendChild(cell);
    }
}

function changeMonth(dir){
    currentDate.setMonth(currentDate.getMonth()+dir);
    renderCalendar();
}

function openModal(date){
    selectedDate = date;
    modal.style.display="flex";
}

function closeModal(){
    modal.style.display="none";
}

function saveEvent(){
    const title = document.getElementById("eventTitle").value;
    const color = document.getElementById("eventColor").value;

    if(!events[selectedDate]) events[selectedDate]=[];
    events[selectedDate].push({title,color});

    localStorage.setItem("events", JSON.stringify(events));
    document.getElementById("eventTitle").value="";
    closeModal();
    renderCalendar();
}

renderCalendar();
