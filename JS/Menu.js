function Menu()
{
	window.location = "/";
	window.location.href = "/";
}

function Cours()
{
	window.location = "/Cours/Menu.html";
	window.location.href = "/Cours/Menu.html";
}

function Outils()
{
	window.location = "/Generateurs/Formes.html";
	window.location.href = "/Generateurs/Formes.html";
}

function Documents()
{
	window.location = "/Documents/Recherche.html";
	window.location.href = "/Documents/Recherche.html";
}

function Applications()
{
	window.location = "/Apps/AppContainer.html";
	window.location.href = "/Apps/AppContainer.html";
}



function CodeEnter(event) {
	if (event.key == "Enter") {
		let a = document.getElementById("secret").children[0].value
		if (parseInt(a,36) == 4660164328303140000)
		{
			window.location = "/Test/hiddenmenu.html";
			window.location.href = "/Test/hiddenmenu.html";
		}
			
	}
}


function ShowConnection()
{
	document.getElementById("secret").style.display = "block";
	document.getElementById("secret").children[0].focus()
}
function HideConnection()
{
	document.getElementById("secret").style.display = "none";
}