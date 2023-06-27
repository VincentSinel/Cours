function Menu()
{
	//window.open("Annales Brevet.html");
	window.location = "/";
	window.location.href = "/";
}

function Cours()
{
	//window.open("Annales Brevet.html");
	window.location = "/";
	window.location.href = "/";
}

function Outils()
{
	//window.open("Annales Brevet.html");
	window.location = "/Generateurs/Formes.html";
	window.location.href = "/Generateurs/Formes.html";
}

function Annales_brevets()
{
	//window.open("Annales Brevet.html");
	window.location = "/Brevet/Annales Brevet.html";
	window.location.href = "/Brevet/Annales Brevet.html";
}



function CodeEnter(event) {
	if (event.key == "Enter") {
		let a = document.getElementById("secret").children[0].value
		if (parseInt(a,36) == 4660164328303140000)
		{
			window.location = "/hiddenmenu.html";
			window.location.href = "/hiddenmenu.html";
		}
			
	}
}