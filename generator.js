/*Generates the HTML elements needed to display a timer
param id	The identification number of the timer to be displayed. Used to link the HTML and the timer's state data.*/
function generateTimer(id){
	var container = document.getElementById("timerContainer");
	
	//Create the containing tbody element
	var timer = document.createElement("tbody");
	timer.className = "timer";
	timer.id = "timer" + id;
	container.appendChild(timer);
	
	//Create the contents
	generateDivider(timer);	
	generateTop(timer);
	generateBottom(timer);
	
	return timer;
	
	//---Helper functions---
	
	/*Creates the elements in the top half of the timer
	param container		The tbody containing the timer
	*/
	function generateTop(container){
		//create the containing table row
		var timertop = document.createElement("tr");
		timertop.className = "timertop"
		timertop.id = "t" + id + "top"
		container.appendChild(timertop);
		
		//create the clock display
		var clock = document.createElement("div");
		clock.className = "clock"
		clock.id = "t" + id + "clock";
		clock.textContent = "00:00:00";
		var temp = document.createElement("td");
		timertop.appendChild(temp);
		temp.appendChild(clock);
		
		//start timer button
		temp = document.createElement("td");
		timertop.appendChild(temp);
		createButton(temp, "t" + id + "start", "startTimer(" + id + ")", "Start");
		
		//stop timer button
		temp = document.createElement("td");
		timertop.appendChild(temp);
		createButton(temp, "t" + id + "stop", "stopTimer(" + id + ")", "Stop");
		
		//reset timer button
		temp = document.createElement("td");
		timertop.appendChild(temp);
		createButton(temp, "t" + id + "reset", "resetTimer(" + id + ")", "Reset");
		
		//delete timer button
		temp = document.createElement("td");
		timertop.appendChild(temp);
		createButton(temp, "t" + id + "delete", "removeTimer(" + id + ")", "Delete");
	}

	/*Creates the elements in the bottom half of the timer
	param container		The tbody containing the timer
	*/
	function generateBottom(container){
		//Create the containing table row
		var timerbottom = document.createElement("tr");
		timerbottom.className = "timerbottom"
		timerbottom.id = "t" + id + "bottom"
		container.appendChild(timerbottom);
		
		//Create the alarm display
		var alarm = document.createElement("div");
		alarm.className = "alarm"
		alarm.id = "t" + id + "alarm";
		alarm.textContent = "00:00:00";
		var temp = document.createElement("td");
		timerbottom.appendChild(temp);
		temp.appendChild(alarm);
		
		//Hour+- buttons
		temp = document.createElement("td");
		timerbottom.appendChild(temp);
		createButton(temp, "t" + id + "h+", "adjustAlarm(" + id + ", 3600)", "H+");
		createButton(temp, "t" + id + "h-", "adjustAlarm(" + id + ", -3600)", "H-");
		
		//minute+- buttons
		temp = document.createElement("td");
		timerbottom.appendChild(temp);
		createButton(temp, "t" + id + "m+", "adjustAlarm(" + id + ", 60)", "M+");
		createButton(temp, "t" + id + "m-", "adjustAlarm(" + id + ", -60)", "M-");
		
		//second+- buttons
		temp = document.createElement("td");
		timerbottom.appendChild(temp);
		createButton(temp, "t" + id + "s+", "adjustAlarm(" + id + ", 1)", "S+");
		createButton(temp, "t" + id + "s-", "adjustAlarm(" + id + ", -1)", "S-");
		
		//alarm toggle button
		temp = document.createElement("td");
		timerbottom.appendChild(temp);
		createButton(temp, "t" + id + "alarmtoggle", "toggleAlarm(event," + id + ")", "Alarm is OFF");
	}

	/*Adds an HTML button to the document
	param container 	The HTML element holding the button
	param id			The button's id attribute
	param func			A text representation of the button's onclick callback function
	param txt			The text displayed on the button
	*/
	function createButton(container, id, func, txt){
		var btn = document.createElement("button");
		btn.id = id;
		//set the onclick with setAttribute since otherwise passing events to the callback gets weird
		btn.setAttribute("onclick", func);
		btn.textContent = txt;
		container.appendChild(btn);
	}

	/*Adds a horizontal dividing line to the page
	param container		The HTML element that contains the line*/
	function generateDivider(container){
		var tr = document.createElement("tr");
		container.appendChild(tr);
		var td = document.createElement("td");
		//Make the line span the entire table
		td.setAttribute("colspan", "5");
		tr.appendChild(td);
		var hr = document.createElement("hr");
		td.appendChild(hr);
	}
}