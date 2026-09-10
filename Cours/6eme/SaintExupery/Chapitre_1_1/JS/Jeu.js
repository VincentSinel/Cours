var Reponse; 
function Regenerer() 
{ 
	document.getElementById("reponse").classList.remove("box_correct"); 
	document.getElementById("reponse").classList.remove("box_incorrect"); 
	var nombre = Math.floor(Math.random() * 10_000_000);
	document.getElementById("valeur").innerText = new Intl.NumberFormat().format(nombre); 
	Reponse = EnLettre(nombre); 
	console.log(nombre, Reponse) 
} 
function TestReponse() 
{ 
	document.getElementById("reponse").classList.remove("box_correct"); 
	document.getElementById("reponse").classList.remove("box_incorrect"); 
	if (document.getElementById("reponse").value == Reponse) 
		document.getElementById("reponse").classList.add("box_correct");
	else
		document.getElementById("reponse").classList.add("box_incorrect"); 
} 
Regenerer();