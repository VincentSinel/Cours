const page_content_loaded = new CustomEvent("page_content_loaded");

window.addEventListener("load", LoadPage);
window.addEventListener("hashchange", () => { LoadPage(); });

var load_count = 0;
var script_load_count = 0;
var json_location = "";

var JSON_definitions = {};
var JSON_page = {};

var AddedHeader = []

function LoadPage()
{
		load_count = 0;
		script_load_count = 0;
		let tag = document.location.hash;
		json_location = '/Cours/' + tag.split('#')[1] + "/"
    var client = new XMLHttpRequest();
		client.open('GET', json_location + 'Cours.json');
		client.onreadystatechange = function() {
			if (client.readyState === 4 && client.status === 200) {
				End_load(client.responseText, "page");
			}
		}
		client.send();
		
    var client_def = new XMLHttpRequest();
		client_def.open('GET', '/Cours/Definitions.json');
		client_def.onreadystatechange = function() {
			if (client_def.readyState === 4 && client_def.status === 200) { 
				End_load(client_def.responseText, "definitions");
			}
		}
		client_def.send();
}

function End_load(json, name)
{
	if (name === "definitions")
		JSON_definitions = JSON.parse(json);
	else if (name === "page")
		JSON_page = JSON.parse(json);

	load_count++;
	
	// Wait for all data to be loaded
	if (load_count != 2) return;

	script_load_count = 1

	ClearPage()

	// Add custom styles
	if ("styles" in JSON_page)
	{
		let style = document.createElement("style")
		style.innerHTML = JSON_page.styles
		document.head.appendChild(style);
		AddedHeader.push(style);
	}

	// Create Activity
	if ("activité" in JSON_page)
	{
		document.getElementById("activite").classList.remove("hidden");
		document.getElementById("activite_content").innerHTML += JSON_page["activité"];
	}

	// Create Content
	JSON_page.content.forEach(element => {
		CreateElement(element, document.getElementById("page_content"));
	});

	// Load scripts
	if ("scripts" in JSON_page)
	{
		JSON_page.scripts.forEach(script => {
			LoadScript(script)
		})
	}
	script_load_count--;
	EndLoadScript();
	MathJax.typesetPromise();
}

function ClearPage()
{
	AddedHeader.forEach( element => {
		element.remove()
	})
	document.getElementById("activite").classList.add("hidden");
	document.getElementById("activite_content").innerHTML = "";
	document.getElementById("page_content").innerHTML = "";
}

function LoadScript(script)
{
	let name = script.name;
	let after = [];
	if ("after" in script)
		after = script.after;
	script_load_count++
	let script_node = document.createElement("script");
	if (name.startsWith("http") || name.startsWith("/"))
		script_node.src = name;
	else
		script_node.src = json_location + name;
	script_node.async = false;
	script_node.onload = (e) => { 
		if (after.length > 0)
		{
			after.forEach(dep => {
				LoadScript(dep);
			});
		}
		else
		{
			script_load_count--; 
			EndLoadScript() 
		}
	}
	document.head.appendChild(script_node)
	AddedHeader.push(script_node);
}


function EndLoadScript()
{
	if (script_load_count <= 0)
	{
		window.dispatchEvent(page_content_loaded);
		document.dispatchEvent(page_content_loaded);
		document.body.dispatchEvent(page_content_loaded);
	}
}


function CreateElement(element, parent, depth = 1)
{
	if (element.type == "title")
	{
		let title = document.createElement("h" + depth);
		title.innerHTML = element.name + " :";
		parent.appendChild(title);

		let content = document.createElement("div");

		if (element.hasOwnProperty("style"))
		{
			content.style.cssText = element.style;
		}

		element.content.forEach(el => {
			CreateElement(el, content, depth + 1);
		});
		parent.appendChild(content);
		return;
	}
	if (element.type == "container")
	{
		let container = document.createElement("div");

		if (element.hasOwnProperty("style"))
		{
			container.style.cssText = element.style;
		}
		if (element.hasOwnProperty("class"))
		{
			container.className = element.class;
		}

		element.content.forEach(el => {
			CreateElement(el, container, depth);
		});
		parent.appendChild(container);
		return;
	}
	if (element.type == "definition")
	{
		return SetDefinition(element.source, parent, element.hasOwnProperty("style") ? element.style : null);
	}
	if (element.type == "propriete")
	{
		return SetPropriete(element.source, parent, element.hasOwnProperty("style") ? element.style : null);
	}
	if (element.type == "exemple")
	{
		return SetExemple(element.source, parent, element.hasOwnProperty("style") ? element.style : null);
	}
	if (element.type == "remarque")
	{
		return SetRemarque(element.source, parent, element.hasOwnProperty("style") ? element.style : null);
	}
	if (element.type == "info")
	{
		return SetInfo(element.source, parent, element.hasOwnProperty("style") ? element.style : null);
	}
	if (element.type == "autre")
	{
		return SetAutre(element.source, parent, element.hasOwnProperty("style") ? element.style : null);
	}
	let div = document.createElement("div");
}


function CountSources(data)
{
	if ("multiple" in data) return 2;
	let count = 0;
	data.forEach(def => {
		if ("multiple" in def) count += 2;
		count += def.indexes.length;
	});
	return count;
}

function SetDefinition(data, parent, style = null)
{
	let count = CountSources(data);
	if (count == 0) return;
	
	let holder;
	if (count == 1)
	{
		holder = document.createElement("div");
		holder.classList.add("definition");
		parent.appendChild(holder);
	}
	else if (count > 1)
	{
		let content = document.createElement("div");
		content.classList.add("definition");
		parent.appendChild(content);

		holder = document.createElement("ul");
		content.appendChild(holder);
	}

	holder.style.cssText = style;

	data.forEach(def => {
		console.log(JSON_definitions[def.name], def.name)
		if (!("definitions" in JSON_definitions[def.name])) {console.log("no definition with name " + def.name); return;}
		def.indexes.forEach(index => {
			let def_div = document.createElement(count > 1 ? "li" : "div");
			if (def.hasOwnProperty("style"))
			{
				def_div.style.cssText = def.style;
			}
			def_div.innerHTML = JSON_definitions[def.name].definitions[index];
			holder.appendChild(def_div);
		});
	});
}

function SetPropriete(data, parent, style = null)
{
	let count = CountSources(data);
	if (count == 0) return;
	
	let holder;
	let content = document.createElement("div");
	content.classList.add("definition");
	parent.appendChild(content);
	let div_title = document.createElement("div");
	div_title.innerHTML = "<b><u>Propriété" + (count == 1 ? "" : "s") + " :</u></b><br>";
	content.appendChild(div_title);
	if (count == 1)
	{
		holder = document.createElement("div");
		content.appendChild(holder);
	}
	else if (count > 1)
	{
		holder = document.createElement("ul");
		content.appendChild(holder);
	}

	holder.style.cssText = style;
	
	data.forEach(def => {
		def.indexes.forEach(index => {
			let def_div = document.createElement(count > 1 ? "li" : "div");
			if (def.hasOwnProperty("style"))
			{
				def_div.style.cssText = def.style;
			}
			def_div.innerHTML = JSON_definitions[def.name].proprietes[index];
			holder.appendChild(def_div);
		});
	});
}

function SetExemple(data, parent, style = null)
{
	let count = CountSources(data);
	if (count == 0) return;
	
	let content = document.createElement("div");
	content.classList.add("exemple");
	parent.appendChild(content);
	let div_title = document.createElement("p");
	div_title.innerHTML = "Exemple" + (count == 1 ? "" : "s") + " :";
	content.appendChild(div_title);
	let holder = document.createElement("div");
	content.appendChild(holder);

	content.style.cssText = style;
	
	data.forEach(def => {
		def.indexes.forEach(index => {
			let def_div = document.createElement("div");
			if (def.hasOwnProperty("style"))
			{
				def_div.style.cssText = def.style;
			}
			def_div.innerHTML = JSON_definitions[def.name].exemples[index];
			holder.appendChild(def_div);
		});
	});
}

function SetRemarque(data, parent, style = null)
{
	let count = CountSources(data);
	if (count == 0) return;
	
	let content = document.createElement("div");
	content.classList.add("remarque");
	parent.appendChild(content);
	let div_title = document.createElement("p");
	div_title.innerHTML = "Remarque" + (count == 1 ? "" : "s") + " :";
	content.appendChild(div_title);
	let holder = document.createElement("ul");
	content.appendChild(holder);

	content.style.cssText = style;
	
	data.forEach(def => {
		def.indexes.forEach(index => {
			let def_div = document.createElement("li");
			if (def.hasOwnProperty("style"))
			{
				def_div.style.cssText = def.style;
			}
			def_div.innerHTML = JSON_definitions[def.name].remarques[index];
			holder.appendChild(def_div);
		});
	});
}

function SetInfo(data, parent, style = null)
{
	let count = CountSources(data);
	if (count == 0) return;
	
	let holder = document.createElement("div");
	holder.classList.add("info");
	parent.appendChild(holder);

	holder.style.cssText = style;

	data.forEach(def => {
		def.indexes.forEach(index => {
			let def_div = document.createElement("p");
			if (def.hasOwnProperty("style"))
			{
				def_div.style.cssText = def.style;
			}
			def_div.innerHTML = JSON_definitions[def.name].infos[index];
			holder.appendChild(def_div);
		});
	});
}

function SetAutre(data, parent, style = null)
{
	let holder = document.createElement("div");
	holder.classList.add("autre");
	parent.appendChild(holder);

	holder.style.cssText = style;

	data.forEach(def => {
		let def_div = document.createElement("div");
		if (def.hasOwnProperty("style"))
		{
			def_div.style.cssText = def.style;
		}
		def_div.innerHTML = def.data;
		holder.appendChild(def_div);
	});
}