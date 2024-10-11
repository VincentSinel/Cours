
function StopWatch()
{

}

function Timer(time)
{
	if (time == -1)
	{
		time = document.getElementById("customTime").value
	}
	target_time = time * 1000;
	if (time < 3600)
	{
		document.getElementById("hour").classList.add("hidden");
		document.getElementById("hour-separator").classList.add("hidden");
	}
	else
	{
		document.getElementById("hour").classList.remove("hidden");
		document.getElementById("hour-separator").classList.remove("hidden");
	}
	document.getElementById("play").style.display = "";
	document.getElementById("pause").style.display = "none";
	current = "pause";
	
	let s = time % 60;
	let m = Math.floor(time / 60) % 60;
	let h = Math.floor(time / 3600);
	document.getElementById("hour").innerText = h.toString();
	document.getElementById("minute").innerText = m.toString().padStart(2, "0");
	document.getElementById("second").innerText = s.toString().padStart(2, "0");
	document.getElementById("millisecond").innerText = "0".toString().padStart(3, "0");
	
}

var target_time = 0;
var last_update = 0;
var current = "pause";
var audio = new Audio('Bip.mp3');

function Running()
{
	target_time += last_update - Date.now()
	let h, m, s, ms;
	if (target_time <= 0)
	{
		h = 0; m = 0; s = 0; ms = 0;
	}
	else
	{
		ms = target_time % 1000;
		s = Math.floor(target_time / 1000) % 60;
		m = Math.floor(target_time / 60000) % 60;
		h = Math.floor(target_time / 3600000);
	}
	document.getElementById("hour").innerText = h.toString();
	document.getElementById("minute").innerText = m.toString().padStart(2, "0");
	document.getElementById("second").innerText = s.toString().padStart(2, "0");
	document.getElementById("millisecond").innerText = ms.toString().padStart(3, "0");
	last_update = Date.now();
	if (target_time > 0 && current == "play")
		window.requestAnimationFrame(Running);
  else if (target_time <= 0)
	{
		if (document.getElementById("sound").checked)
			audio.play();
	}
}


function Play_Pause()
{
	if (current == "pause" && target_time > 0)
	{
		document.getElementById("play").style.display = "none";
		document.getElementById("pause").style.display = "";
		document.getElementById("maincontainer").classList.add("maincontainer-hide");
		last_update = Date.now();
		window.requestAnimationFrame(Running);
		current = "play"
	}
	else if (current == "play")
	{
		document.getElementById("play").style.display = "";
		document.getElementById("pause").style.display = "none";
		document.getElementById("maincontainer").classList.remove("maincontainer-hide");
		current = "pause"
	}
}

function Stop()
{
	document.getElementById("play").style.display = "";
	document.getElementById("pause").style.display = "none";
	document.getElementById("maincontainer").classList.remove("maincontainer-hide");
	document.getElementById("hour").innerText = "0";
	document.getElementById("minute").innerText = "00";
	document.getElementById("second").innerText = "00";
	document.getElementById("millisecond").innerText = "000";
	if (current == "play")
		window.requestAnimationFrame(Stop);
	current = "pause"
	target_time = 0;
}