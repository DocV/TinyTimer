var timers = [];
var notificationAudio = new Audio("Notification.wav");

function increment(){
	timers.forEach(function(current, index, array) {
		if (current.enabled){
			current.time++;
			current.clock.textContent = formatTime(current.time);
			if (current.alarmEnabled && !current.alarmFired){
				checkAlarm(index);
			}						
		}
	})
}

function formatTime(time) {
	var hours = Math.floor(time / 3600)
	var output = (hours < 10 ? "0" : "") + hours + ":";
	var minutes = Math.floor((time % 3600) / 60)
	output += (minutes < 10 ? "0" : "") + minutes + ":";
	var seconds = time % 60
	output += (seconds < 10 ? "0" : "") + seconds;
	return output;
}

function loadTimers(){
	var timerElements = document.getElementsByClassName("timer");
	
	Array.from(timerElements).forEach(function(current, index, array) {
		timers[index] = {}
		timers[index].container = current;
		timers[index].time = 0;
		timers[index].alarmTime = 0;
		timers[index].enabled = false;
		timers[index].clock = current.getElementsByClassName("clock")[0];
		timers[index].alarm = current.getElementsByClassName("alarm")[0];
		timers[index].alarmEnabled = false;
		timers[index].alarmFired = false;
	})
	
	window.setInterval(increment, 1000)
	document.onfocus = resetTitle;
}

function checkAlarm(id){
	var timer = timers[id];
	if (timer.time >= timer.alarmTime){
		timer.alarm.style.color = "red";
		notificationAudio.play();
		timer.alarmFired = true;
		if (!document.hasFocus()){
			document.title = "(!)Tiny Timer";
		}
	}
}

function startTimer(id){
	timers[id].enabled = true;
}

function stopTimer(id){
	timers[id].enabled = false;
}

function resetTimer(id){
	timers[id].time = 0;
	timers[id].clock.textContent = formatTime(0);
	timers[id].alarm.style.color = "black";
	timers[id].alarmFired = false;
}

function adjustAlarm(id, amount) {
	timers[id].alarmTime += amount;
	if (timers[id].alarmTime < 0){
		timers[id].alarmTime = 0;
	}
	timers[id].alarm.textContent = formatTime(timers[id].alarmTime);
	timers[id].alarm.style.color = "black";
	timers[id].alarmFired = false;
}

function toggleAlarm(event, id){
	timers[id].alarmEnabled = !timers[id].alarmEnabled;
	if (timers[id].alarmEnabled){
		event.target.textContent = "Alarm is ON";
	}
	else {
		event.target.textContent = "Alarm is OFF";
	}
}

function resetTitle(){
	document.title = "Tiny Timer";
}