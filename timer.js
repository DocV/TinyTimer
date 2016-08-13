/*An array holding the TimerData objects that contain the state of the timers*/
var timers = [];
/*Sound file for notification sounds*/
var notificationAudio = new Audio("Notification.wav");
/*An object that holds the current state of a timer
param contained		The <tbody> element that contains the timer's HTML representation**/
var TimerData = function(container){
	/*The <tbody> element that contains the timer's HTML representation*/
	this.container = container;
	/*Number of seconds that this timer has counted*/
	this.time = 0;
	/*The time when this timer's alarm will go off in seconds*/
	this.alarmTime = 0;
	/*Is this timer ticking?*/
	this.enabled = false;
	/*Is this timer's alarm set?*/
	this.alarmEnabled = false;
	/*Has this timer's alarm already gone off?*/
	this.alarmFired = false;
	/*This timer's time display element*/
	this.clock = container.getElementsByClassName("clock")[0];
	/*This timer's alarm time display element*/
	this.alarm = container.getElementsByClassName("alarm")[0];
}	

/*Tick all timers*/
function increment(){
	timers.forEach(function(current, index, array) {
		if (current != null && current.enabled){
			//increment time and display it
			current.time++;
			current.clock.textContent = formatTime(current.time);
			//check if the alarm needs to go off
			if (current.alarmEnabled && !current.alarmFired){
				checkAlarm(index);
			}
		}
	})
}

/*Write timer seconds into a human-readable format
param time	An int indicating the time to be formatted in seconds*/
function formatTime(time) {
	var hours = Math.floor(time / 3600)
	var output = (hours < 10 ? "0" : "") + hours + ":";
	var minutes = Math.floor((time % 3600) / 60)
	output += (minutes < 10 ? "0" : "") + minutes + ":";
	var seconds = time % 60
	output += (seconds < 10 ? "0" : "") + seconds;
	return output;
}

/*Sets up the initial state of the timer app*/
function initializeTimers(){
	//create first timer
	addTimer();
	
	//set tick function to fire every second
	window.setInterval(increment, 1000)
	//set title notifications to clear when the tab gains focus
	document.onfocus = resetTitle;
}

/*Adds a new timer to the page*/
function addTimer(){
	//use the slot of a deleted timer if possible to avoid memory leaking; else add to the end of the timer array
	var index = timers.length;
	for (i = 0; i < timers.length; i++){
		if (timers[i] == null){
			index = i;
			break;
		}
	}
	//generate timer HTML
	var container = generateTimer(index);
	//generate timer object
	timers[index] = new TimerData(container);
}

/*Deletes a timer
param id	The index number of the timer to be deleted*/
function removeTimer(id){
	//delete data
	timers[id] = null;
	//delete the HTML elements
	var container = document.getElementById("timerContainer");
	var timer = document.getElementById("timer" + id);
	container.removeChild(timer);
}

/*Checks whether an alarm should play and plays it if true
param id	The index number of the timer whose alarm should be checked*/
function checkAlarm(id){
	var timer = timers[id];
	if (timer.time >= timer.alarmTime){
		//change alarm color to red
		timer.alarm.style.color = "red";
		//play notification sound
		notificationAudio.play();
		timer.alarmFired = true;
		//change the page title if the user is looking at another tab/window
		if (!document.hasFocus()){
			document.title = "(!)Tiny Timer";
		}
	}
}

/*Makes a timer start ticking
param id	The index number of the timer to be started*/
function startTimer(id){
	timers[id].enabled = true;
}

/*Makes all timers start ticking*/
function startAll(){
	timers.forEach(function(current, index, array){
		if (current != null){
			startTimer(index);
		}
	});
}

/*Makes a timer stop ticking
param id	The index number of the timer to be stopped*/
function stopTimer(id){
	timers[id].enabled = false;
}

/*Makes all timers stop ticking*/
function stopAll(){
	timers.forEach(function(current, index, array){
		if (current != null){
			stopTimer(index);
		}
	});
}

/*Resets a timer's time to 0
param id	The index number of the timer to be reset*/
function resetTimer(id){
	timers[id].time = 0;
	timers[id].clock.textContent = formatTime(0);
	//reset the alarm state too
	timers[id].alarm.style.color = "black";
	timers[id].alarmFired = false;
}

/*Resets all timers' times to 0*/
function resetAll(){
	timers.forEach(function(current, index, array){
		if (current != null){
			resetTimer(index);
		}
	});
}

/*Changes the alarm time of a timer
param id		The index number of the timer to be adjusted
param amount	The number of seconds to add to the alarm (can be negative)*/
function adjustAlarm(id, amount) {
	timers[id].alarmTime += amount;
	//don't allow negative alarm time
	if (timers[id].alarmTime < 0){
		timers[id].alarmTime = 0;
	}
	timers[id].alarm.textContent = formatTime(timers[id].alarmTime);
	//reset alarm state so that it can fire again
	timers[id].alarm.style.color = "black";
	timers[id].alarmFired = false;
}

/*Toggles a timer's alarm on and off
param event		The event object from clicking the alarm button
param id		The index number of the timer whose alarm should be toggled*/
function toggleAlarm(event, id){
	timers[id].alarmEnabled = !timers[id].alarmEnabled;
	//set the text of the alarm button to match current state
	if (timers[id].alarmEnabled){
		event.target.textContent = "Alarm is ON";
	}
	else {
		event.target.textContent = "Alarm is OFF";
	}
}

/*Reset the page title*/
function resetTitle(){
	document.title = "Tiny Timer";
}