var Definitions = {};


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
}

function SetDefinitions()
{
	document.querySelectorAll(".definition").forEach(def => {
		var name = def.getAttribute("definition");
		if (name != null && name in Definitions)
		{
			var id = parseInt(def.getAttribute("objids"));
			def.innerHTML = Definitions[name].definitions[id];
		}
	});
	document.querySelectorAll(".propriete").forEach(def => {
		var name = def.getAttribute("definition");
		if (name != null && name in Definitions)
		{
			if ("proprietes" in Definitions[name])
			{
				let ids = def.getAttribute("objids").split(" ")
				if (ids.length == 1)
				{
					def.innerHTML = "<b><u>Propriété :</u></b><br>" + Definitions[name].proprietes[parseInt(ids[0])];
				}
				else
				{
					let result = "<b><u>Propriétés :</u></b><br><ul>"
					ids.forEach(id => {
						let int_id = parseInt(id)
						result += "<li>" + Definitions[name].proprietes[int_id]; + "</li>"
					})
					def.innerHTML = result + "</ul>";
				}
			}
		}
	});
	
	MathJax.typesetPromise();
}