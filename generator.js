function generateTimer(id){
	var container = document.getElementById("timerContainer");
	
	var timer = document.createElement("tbody");
	timer.className = "timer";
	timer.id = "timer" + id;
	container.appendChild(timer);
	
	generateTop(timer, id);
	generateBottom(timer, id);
	
	return timer;
}

function generateTop(container, id){
	var timertop = document.createElement("tr");
	timertop.className = "timertop"
	timertop.id = "t" + id + "top"
	container.appendChild(timertop);
	
	var clock = document.createElement("div");
	clock.className = "clock"
	clock.id = "t" + id + "clock";
	clock.textContent = "00:00:00";
	var temp = document.createElement("td");
	timertop.appendChild(temp);
	temp.appendChild(clock);
	
	temp = document.createElement("td");
	timertop.appendChild(temp);
	createButton(temp, "t" + id + "start", "startTimer(" + id + ")", "Start");
	
	temp = document.createElement("td");
	timertop.appendChild(temp);
	createButton(temp, "t" + id + "stop", "stopTimer(" + id + ")", "Stop");
	
	temp = document.createElement("td");
	timertop.appendChild(temp);
	createButton(temp, "t" + id + "reset", "resetTimer(" + id + ")", "Reset");
}

function generateBottom(container, id){
	var timerbottom = document.createElement("tr");
	timerbottom.className = "timerbottom"
	timerbottom.id = "t" + id + "bottom"
	container.appendChild(timerbottom);
	
	var alarm = document.createElement("div");
	alarm.className = "alarm"
	alarm.id = "t" + id + "alarm";
	alarm.textContent = "00:00:00";
	var temp = document.createElement("td");
	timerbottom.appendChild(temp);
	temp.appendChild(alarm);
	
	temp = document.createElement("td");
	timerbottom.appendChild(temp);
	createButton(temp, "t" + id + "h+", "adjustAlarm(" + id + ", 3600)", "H+");
	createButton(temp, "t" + id + "h-", "adjustAlarm(" + id + ", -3600)", "H-");
	
	temp = document.createElement("td");
	timerbottom.appendChild(temp);
	createButton(temp, "t" + id + "m+", "adjustAlarm(" + id + ", 60)", "M+");
	createButton(temp, "t" + id + "m-", "adjustAlarm(" + id + ", -60)", "M-");
	
	temp = document.createElement("td");
	timerbottom.appendChild(temp);
	createButton(temp, "t" + id + "s+", "adjustAlarm(" + id + ", 1)", "S+");
	createButton(temp, "t" + id + "s-", "adjustAlarm(" + id + ", -1)", "S-");
	
	temp = document.createElement("td");
	timerbottom.appendChild(temp);
	createButton(temp, "t" + id + "alarmtoggle", "toggleAlarm(event," + id + ")", "Alarm is OFF");
}

function createButton(container, id, func, txt){
	var btn = document.createElement("button");
	btn.id = id;
	btn.setAttribute("onclick", func);
	btn.textContent = txt;
	container.appendChild(btn);
}