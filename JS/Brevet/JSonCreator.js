var selected_line = null;

var current_tags = {};

var Tags = {
	"Arithmétique": [
        "nombres premiers",
        "premiers",
        "diviseur",
        "multiple",
        "decomposition",
        "facteurs"
	],
	"Expressions litterales": [
        "x",
        "developpement",
        "factorisation",
        "reduction",
        "equation"
	],
	"Fonction": [
        "affine",
        "linéaire",
        "graphique",
        "courbe",
        "abscisse",
        "ordonnée",
        "repérage",
        "antécédent",
        "image"
	],
	"Fraction": [
        "division",
        "calcul",
        "nombres"
	],
	"Géométrie": [
        "geometrie",
        "pavage",
        "transformation du plan",
        "homothetie",
        "translation",
        "rotation",
        "symetrie",
        "cercle",
        "aire",
        "perimetre",
        "semblable"
	],
	"Probabilités": [
        "chance",
        "fréquence",
        "aléatoire"
	],
	"Proportionnalité": [
        "tableau",
        "produit en croix",
        "pourcentage",
        "echelle",
        "ratio"
	],
	"QCM": [
        "choix multiples",
        "tableau",
        "Questionnaire"
	],
	"Puissances": [
        "exposant",
        "carrée",
        "cube"
	],
	"Pythagore": [
        "pithagore",
        "triangle rectangle",
        "egalite",
        "pytagore",
        "pitagore"
	],
	"Scratch": [
        "ordinateur",
        "algorithme",
        "programmation",
        "algo"
	],
	"Solide": [
        "volume",
        "sphere",
        "cube",
        "boule",
        "pavé droit",
        "pyramide",
        "prisme",
        "cône",
        "3D"
	],
	"Statistique": [
        "graphique",
        "diagramme",
        "courbe",
        "moyenne",
        "mediane",
        "etendue",
        "frequence",
        "serie"
	],
	"Tâche complexe": [
        "ouvert",
        "problèmes"
	],
	"Tableur": [
        "ordinateur",
        "cellule",
        "formule"
	],
	"Thalès": [
        "tales",
        "agrandissement",
        "reduction",
        "egalite"
	],
	"Trigonométrie": [
        "cosinus",
        "trigo",
        "sinus",
        "tangente",
        "cos",
        "sin",
        "tan",
        "arcsin",
        "arccos",
        "arctan",
        "triangle rectangle"
	],
	"Vrai faux": [
        "vrai faux",
        "affirmation"
	],
}


var save_data = {};


function Load_Data()
{
	var client = new XMLHttpRequest();
	client.open('GET', 'ListeImage.txt');
	client.onreadystatechange = function() {
		if (client.readyState === 4){ 
			End_load(client.responseText, 0);
		}
	}
	client.send();
	var client2 = new XMLHttpRequest();
	client2.open('GET', 'DataBase.json');
	client2.onreadystatechange = function() {
		if (client2.readyState === 4){ 
			End_load(client2.responseText, 1);
		}
	}
	client2.send();
}
var img_list = "";
var jsn_list = "";
function End_load(str, id)
{
	if (id == 0)
		img_list = str
	if (id == 1)
		jsn_list = str
	if (img_list != "" && jsn_list != "")
		End_data_load();
}

function End_data_load()
{
	save_data = JSON.parse(jsn_list);
	var list = document.getElementById("list_img")
	let lines = img_list.split('\n');
	lines.forEach(line => {
		if (line.length != 0)
		{
			line = line.substring(0, line.length - 2);
			var a = document.createElement("li")
			a.innerText = line
			a.onclick = function() {
				Select_exercice(a);
			}
			list.append(a)
			var id = line.replace(/\/\//g, '-')
			id = id.replace(/\//g, '-')
			id = id.replace(/\\\\/g, '-')
			id = id.replace(/\\/g, '-')
			if (save_data.hasOwnProperty(id))
			{
				Validate_exercice(a)
				console.log("OK")
			}
		}
	});
}

function Select_exercice(li)
{
	if (selected_line){
		selected_line.classList.remove("selected")
	}
	li.classList.add("selected")
	selected_line = li;

	var img = document.getElementById("preview")
	img.src = li.innerText

	current_tags = {};
	document.getElementById("Tags_List").innerHTML = ""

	Load();
}

function Validate_exercice(li)
{
	li.classList.add("fait")
	
}

function Add_Tag(value = 100)
{
	var tag = document.getElementById("Tags_input").value
	document.getElementById("Tags_input").value = ""
	if (current_tags.hasOwnProperty(tag)) return;
	current_tags[tag] = 100;

	var tagdiv = document.createElement("div");
	tagdiv.classList.add("tag")
	var lbl = document.createElement("label");
	lbl.innerText = tag;
	tagdiv.appendChild(lbl);
	var inp = document.createElement("input");
	inp.id = "tag_id_" + tag
	inp.type = "number";
	inp.min = 0;
	inp.max = 100;
	inp.value = value;
	inp.step = 5;
	inp.oninput = function() {
		Tag_Value_Changed(tag, inp.valueAsNumber);
	}
	tagdiv.appendChild(inp)
	var but = document.createElement("button")
	but.innerText = "❌"
	but.onclick = function() { Remove_Tag(tag, tagdiv) }
	tagdiv.appendChild(but)

	var list = document.getElementById("Tags_List");
	list.appendChild(tagdiv)
}

function Remove_Tag(name, element)
{
	element.parentNode.removeChild(element);
	delete current_tags[name]
}

function Tag_Value_Changed(name, value)
{
	current_tags[name] = parseInt(value);
}

function Clear(from_previous = false)
{
	document.getElementById("Exercice_Points").value = 15;
	document.getElementById("Exercice_Difficulty").selectedIndex = 2;
	document.getElementById("Tags_List").innerHTML = "";
	current_tags = {};
	if (from_previous)
	{
		let nbr = document.getElementById("Exercice_Number").valueAsNumber
		document.getElementById("Exercice_Number").value = nbr + 1;
		return
	}
	document.getElementById("Exercice_Number").value = 1;
	document.getElementById("Sujet_AN").checked = false;
	document.getElementById("Sujet_AS").checked = false;
	document.getElementById("Sujet_CE").checked = false;
	document.getElementById("Sujet_AG").checked = false;
	document.getElementById("Sujet_R").checked = false;
	document.getElementById("Sujet_M").checked = false;
	document.getElementById("Sujet_P").checked = false;
	document.getElementById("Sujet_NC").checked = false;
	document.getElementById("Sujet_G").checked = false;
	document.getElementById("Sujet_A").checked = false;
	document.getElementById("Sujet_BB").checked = false;
	document.getElementById("Sujet_AU").checked = false;
	document.getElementById("Sujet_Year").value = 2023;
	document.getElementById("Sujet_Periode").selectedIndex = 0;
}

function Save()
{
	if (selected_line === null) return;
	data = {}
	data["Sujet"] = [];
	if (document.getElementById("Sujet_AN").checked) data["Sujet"].push("AN");
	if (document.getElementById("Sujet_AS").checked) data["Sujet"].push("AS");
	if (document.getElementById("Sujet_CE").checked) data["Sujet"].push("CE");
	if (document.getElementById("Sujet_AG").checked) data["Sujet"].push("AG");
	if (document.getElementById("Sujet_R").checked) data["Sujet"].push("R");
	if (document.getElementById("Sujet_M").checked) data["Sujet"].push("M");
	if (document.getElementById("Sujet_P").checked) data["Sujet"].push("P");
	if (document.getElementById("Sujet_NC").checked) data["Sujet"].push("NC");
	if (document.getElementById("Sujet_G").checked) data["Sujet"].push("G");
	if (document.getElementById("Sujet_A").checked) data["Sujet"].push("A");
	if (document.getElementById("Sujet_BB").checked) data["Sujet"].push("BB");
	if (document.getElementById("Sujet_AU").checked) data["Sujet"].push("AU");
	data["Annee"] = document.getElementById("Sujet_Year").valueAsNumber;
	data["Periode"] = document.getElementById("Sujet_Periode").selectedIndex;
	data["Number"] = document.getElementById("Exercice_Number").valueAsNumber;
	data["Points"] = document.getElementById("Exercice_Points").valueAsNumber;
	data["Difficulte"] = document.getElementById("Exercice_Difficulty").selectedIndex;
	data["Tags"] = current_tags;
	data["Image"] = selected_line.innerText
	var id = selected_line.innerText.replace(/\/\//g, '-')
	id = id.replace(/\//g, '-')
	id = id.replace(/\\\\/g, '-')
	id = id.replace(/\\/g, '-')
	console.log(id)
	save_data[id] = data;
	Validate_exercice(selected_line)
}

function Load()
{
	var id = selected_line.innerText.replace(/\/\//g, '-')
	id = id.replace(/\//g, '-')
	id = id.replace(/\\\\/g, '-')
	id = id.replace(/\\/g, '-')
	Clear(save_previous)
	if (save_data.hasOwnProperty(id))
	{
		var data = save_data[id]
		
		if(data["Sujet"].indexOf("AN") != -1) document.getElementById("Sujet_AN").checked = true
		if(data["Sujet"].indexOf("AS") != -1) document.getElementById("Sujet_AS").checked = true
		if(data["Sujet"].indexOf("CE") != -1) document.getElementById("Sujet_CE").checked = true
		if(data["Sujet"].indexOf("AG") != -1) document.getElementById("Sujet_AG").checked = true
		if(data["Sujet"].indexOf("R") != -1) document.getElementById("Sujet_R").checked = true
		if(data["Sujet"].indexOf("M") != -1) document.getElementById("Sujet_M").checked = true
		if(data["Sujet"].indexOf("P") != -1) document.getElementById("Sujet_P").checked = true
		if(data["Sujet"].indexOf("NC") != -1) document.getElementById("Sujet_NC").checked = true
		if(data["Sujet"].indexOf("G") != -1) document.getElementById("Sujet_G").checked = true
		if(data["Sujet"].indexOf("A") != -1) document.getElementById("Sujet_A").checked = true
		if(data["Sujet"].indexOf("BB") != -1) document.getElementById("Sujet_BB").checked = true
		if(data["Sujet"].indexOf("AU") != -1) document.getElementById("Sujet_AU").checked = true

		document.getElementById("Sujet_Year").value = data["Annee"];
		document.getElementById("Sujet_Periode").selectedIndex = data["Periode"];
		document.getElementById("Exercice_Number").value = data["Number"];
		document.getElementById("Exercice_Points").value = data["Points"];
		document.getElementById("Exercice_Difficulty").selectedIndex = data["Difficulte"];

		var tags_names = Object.keys(data["Tags"]);

		tags_names.forEach(tag => {
			document.getElementById("Tags_input").value = tag
			Add_Tag(data["Tags"][tag])
		});
	}

	save_previous = false

}

function Next()
{
	save_previous = true
	Save()
	if (selected_line === null)
	{
		document.getElementById("list_img").firstElementChild.click();
	}
	else
	{
		var id = Array.from(document.getElementById("list_img").children).indexOf(selected_line);
		if (id == document.getElementById("list_img").children.length - 1)
		{
			document.getElementById("list_img").firstElementChild.click();
			return;
		}
		document.getElementById("list_img").children[id +1].click();
	}
}

var save_previous = false

function Previous()
{
	Save()
	if (selected_line === null)
	{
		document.getElementById("list_img").lastElementChild.click();
	}
	else
	{
		var id = Array.from(document.getElementById("list_img").children).indexOf(selected_line);
		if (id == 0)
		{
			document.getElementById("list_img").lastElementChild.click();
			return;
		}
		document.getElementById("list_img").children[id - 1].click();
	}
}

function ExportSave()
{
	Save()
	let jsonData = JSON.stringify(save_data);
	var a = document.createElement("a");
    var file = new Blob([jsonData], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = 'DataBase.json';
    a.click()
}

//Create Autocomplete box on fly

function autocomplete(inp, arr) {
	/*the autocomplete function takes two arguments,
	the text field element and an array of possible autocompleted values:*/
	var currentFocus;
	/*execute a function when someone writes in the text field:*/
	inp.addEventListener("input", function(e) {
		var a, b, i, val = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) { return false;}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode.appendChild(a);
		var count = 0;
		/*for each item in the array...*/
		for (i = 0; i < arr.length; i++) {
		if (count > 5) continue;
		  /*check if the item starts with the same letters as the text field value:*/
		  if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
			/*create a DIV element for each matching element:*/
			b = document.createElement("DIV");
			/*make the matching letters bold:*/
			b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
			b.innerHTML += arr[i].substr(val.length);
			/*insert a input field that will hold the current array item's value:*/
			b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
			/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function(e) {
				/*insert the value for the autocomplete text field:*/
				inp.value = this.getElementsByTagName("input")[0].value;
				Add_Tag();
				/*close the list of autocompleted values,
				(or any other open lists of autocompleted values:*/
				closeAllLists();
				currentFocus = -1;
			});
			a.appendChild(b);
			count += 1;
		  }
		}
	});
	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
		  /*If the arrow DOWN key is pressed,
		  increase the currentFocus variable:*/
		  currentFocus++;
		  /*and and make the current item more visible:*/
		  addActive(x);
		} else if (e.keyCode == 38) { //up
		  /*If the arrow UP key is pressed,
		  decrease the currentFocus variable:*/
		  currentFocus--;
		  /*and and make the current item more visible:*/
		  addActive(x);
		} else if (e.keyCode == 13) {
		  /*If the ENTER key is pressed, prevent the form from being submitted,*/
		  e.preventDefault();
		  if (currentFocus > -1) {
			/*and simulate a click on the "active" item:*/
			if (x) x[currentFocus].click();
		  }
		  else{
			Add_Tag();
		  }
		}
	});
	function addActive(x) {
	  /*a function to classify an item as "active":*/
	  if (!x) return false;
	  /*start by removing the "active" class on all items:*/
	  removeActive(x);
	  if (currentFocus >= x.length) currentFocus = 0;
	  if (currentFocus < 0) currentFocus = (x.length - 1);
	  /*add class "autocomplete-active":*/
	  x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
	  /*a function to remove the "active" class from all autocomplete items:*/
	  for (var i = 0; i < x.length; i++) {
		x[i].classList.remove("autocomplete-active");
	  }
	}
	function closeAllLists(elmnt) {
	  /*close all autocomplete lists in the document,
	  except the one passed as an argument:*/
	  var x = document.getElementsByClassName("autocomplete-items");
	  for (var i = 0; i < x.length; i++) {
		if (elmnt != x[i] && elmnt != inp) {
		x[i].parentNode.removeChild(x[i]);
	  }
	}
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
	  closeAllLists(e.target);
  });
  } 