var Definitions = {};
const definitionsLoaded = new CustomEvent("definitionsLoaded");

window.addEventListener("load", LoadData);


function LoadData()
{
    var client = new XMLHttpRequest();
		client.open('GET', '/Cours/Definitions.json');
		client.onreadystatechange = function() {
			if (client.readyState === 4 && client.status === 200) { 
				End_load(client.responseText);
			}
		}
		client.send();
}

function End_load(json)
{
	Definitions = JSON.parse(json);
	SetDefinitions()
	document.dispatchEvent(definitionsLoaded);
}

function SetDefinitions()
{
	document.querySelectorAll(".definition").forEach(def => {
		SetDefinition(def);
	});
	document.querySelectorAll(".propriete").forEach(holder => {
		SetPropriete(holder);
	});
	document.querySelectorAll(".exemple").forEach(holder => {
		SetExemple(holder);
	});
	document.querySelectorAll(".remarque").forEach(holder => {
		SetRemarque(holder);
	});
	document.querySelectorAll(".info").forEach(holder => {
		SetInfo(holder);
	});
	
	MathJax.typesetPromise();
}

function SetDefinition(holder)
{
	var name = holder.getAttribute("definition");
	if (name != null && name in Definitions)
	{
		if ("definitions" in Definitions[name])
		{
			let ids = holder.getAttribute("objids").split(" ")
			if (ids.length == 1)
			{
				holder.innerHTML = Definitions[name].definitions[parseInt(ids[0])];
			}
			else
			{
				let result = "<ul>"
				ids.forEach(id => {
					let int_id = parseInt(id)
					result += "<li>" + Definitions[name].definitions[int_id]; + "</li>"
				})
				holder.innerHTML = result + "</ul>";
			}
		}
	}
}

function SetPropriete(holder)
{
	var name = holder.getAttribute("definition");
	if (name != null && name in Definitions)
	{
		if ("proprietes" in Definitions[name])
		{
			let ids = holder.getAttribute("objids").split(" ")
			if (ids.length == 1)
			{
				if (holder.getAttribute("notitle") != null)
					holder.innerHTML = Definitions[name].proprietes[parseInt(ids[0])];
				else
					holder.innerHTML = "<b><u>Propriété :</u></b><br>" + Definitions[name].proprietes[parseInt(ids[0])];
			}
			else
			{
				let result = "<b><u>Propriétés :</u></b><br><ul>"
				ids.forEach(id => {
					let int_id = parseInt(id)
					result += "<li>" + Definitions[name].proprietes[int_id]; + "</li>"
				})
				holder.innerHTML = result + "</ul>";
			}
		}
	}
}

function SetExemple(holder)
{
	var names = holder.getAttribute("definition");
	if (names != null)
	{
		let count = 0;
		let div = document.createElement("div");
		names.split(";").forEach(definition => {
			let name_id = definition.split(":");
			let name = name_id[0];
			let ids = name_id[1].split(" ");

			if (name in Definitions && "exemples" in Definitions[name])
			{
				ids.forEach(id => {
					if (id == "") return;
					let int_id = parseInt(id)
					let div2 = document.createElement("div");
					div2.innerHTML += Definitions[name].exemples[int_id];
					div.appendChild(div2);
					count++;
				})
			}
		});
		if (count == 0) return;
		let p = document.createElement("p")
		if (count == 1)
			p.innerHTML = "Exemple :";
		else
			p.innerHTML = "Exemples :";
		holder.appendChild(p);
		holder.appendChild(div);
	}
}

function SetRemarque(holder)
{
	var names = holder.getAttribute("definition");
	if (names != null)
	{
		let count = 0;
		let ul = document.createElement("ul");
		names.split(";").forEach(definition => {
			let name_id = definition.split(":");
			let name = name_id[0];
			let ids = name_id[1].split(" ");

			if (name in Definitions && "remarques" in Definitions[name])
			{
				ids.forEach(id => {
					if (id == "") return;
					let int_id = parseInt(id)
					let li = document.createElement("li");
					li.innerHTML += Definitions[name].remarques[int_id];
					ul.appendChild(li);
					count++;
				})
			}
		});
		if (count == 0) return;
		let p = document.createElement("p")
		if (count == 1)
			p.innerHTML = "Remarque :";
		else
			p.innerHTML = "Remarques :";
		holder.appendChild(p);
		holder.appendChild(ul);
	}
}

function SetInfo(holder)
{
	var names = holder.getAttribute("definition");
	if (names != null)
	{
		let count = 0;
		let div = document.createElement("div");
		names.split(";").forEach(definition => {
			let name_id = definition.split(":");
			let name = name_id[0];
			let ids = name_id[1].split(" ");

			if (name in Definitions && "autres" in Definitions[name])
			{
				ids.forEach(id => {
					if (id == "") return;
					let int_id = parseInt(id)
					let p = document.createElement("p");
					p.innerHTML += Definitions[name].autres[int_id];
					div.appendChild(p);
					count++;
				})
			}
		});
		if (count == 0) return;
		holder.appendChild(div);
	}
}