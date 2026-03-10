var selected_line = null;


var documents_list = [];
var save_data = {};
var can_save = true;


function Load_Data()
{
	var client = new XMLHttpRequest();
	client.open('GET', '../ListeDocuments.txt');
	client.onreadystatechange = function() {
		if (client.readyState === 4){ 
			End_load(client.responseText, 0);
		}
	}
	client.send();
	var client2 = new XMLHttpRequest();
	client2.open('GET', '../DataBase.json');
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
	
	documents_list = [];
	let lines = img_list.split('\n');
	lines.forEach(line => {
		if (line.length != 0)
		{
			// Remove empty space at the end
			line = line.replace(/[ \t\r]+$/, '')
			// Remove path and extension
			let file_name = line.replace(/^.*[\\/]/, '')
			let name = file_name.replace(/\.\w*$/, '');

			let data = {path: line, name: name, file_name: file_name}
			documents_list.push(data);
		}
	});
	documents_list.sort((a, b) => a.name.localeCompare(b.name));
	documents_list.forEach(doc => {
		var a = document.createElement("li")
		a.innerText = doc.path
		a.onclick = function() {
			Select_doc(a);
		}
		list.append(a)
		doc.li = a;

		
		var id = doc.path.replace(/\/\//g, '-')
		id = id.replace(/\//g, '-')
		id = id.replace(/\\\\/g, '-')
		id = id.replace(/\\/g, '-')
		doc.id = id;
		if (save_data.hasOwnProperty(id))
		{
			if (save_data[id].hasOwnProperty("linked"))
				a.classList.add("linked")
			else
				a.classList.add("fait")
		}

		document.getElementById("preview_file").appendChild(new Option(doc.file_name, doc.id));
	})
}

function Select_doc(li)
{
	if (selected_line){
		selected_line.classList.remove("selected")
	}
	li.classList.add("selected")
	selected_line = li;

	var preview = document.getElementById("preview")
	preview.src = "../" + li.innerText

	current_tags = {};

	Load();
}


function Clear()
{
	document.getElementById("preview_file").selectedIndex = -1	
	document.getElementById("file_name").value = "";
	document.getElementById("list_file").innerHTML = "";
	document.getElementById("list_tag").innerHTML = "";
	can_save = true;
}

function Save()
{
	if (selected_line === null) return;
	
	var id = selected_line.innerText.replace(/\/\//g, '-')
	id = id.replace(/\//g, '-')
	id = id.replace(/\\\\/g, '-')
	id = id.replace(/\\/g, '-')
	data = {}
	
	data.preview_file = documents_list[document.getElementById("preview_file").selectedIndex].id;
	if (id != data.preview_file)
	{
		documents_list[data.preview_file].li.classList.add("linked");
		let doc_list_index = documents_list.findIndex((doc) => { return doc.id == data.preview_file;})
		save_data[data.preview_file] = {linked: true, path: documents_list[doc_list_index].path, file_name: documents_list[doc_list_index].file_name};
	}
	let doc_list_index_c = documents_list.findIndex((doc) => { return doc.id == id;})
	data.name = document.getElementById("file_name").value;
	data.list_file = [];
	data.list_tag = [];
	data.path = documents_list[doc_list_index_c].path;
	data.file_name = documents_list[doc_list_index_c].file_name;

	for (let i = 0; i < document.getElementById("list_file").children.length; i++) {
		let select = document.getElementById("list_file").children[i].getElementsByTagName("select")[0];
		let doc = documents_list[select.selectedIndex];
		doc.li.classList.add("linked");
		let file_id = doc.id;
		data.list_file.push(file_id);
		let doc_list_index = documents_list.findIndex((doc) => { return doc.id == file_id;})
		save_data[file_id] = {linked: true, path: documents_list[doc_list_index].path, file_name: documents_list[doc_list_index].file_name};
	}

	for (let i = 0; i < document.getElementById("list_tag").children.length; i++) {
		let input = document.getElementById("list_tag").children[i].getElementsByTagName("input")[0];
		data.list_tag.push(input.value);
	}

	data.lock = false

	save_data[id] = data;
	selected_line.classList.add("fait")
}

function Load()
{
	var id = selected_line.innerText.replace(/\/\//g, '-')
	id = id.replace(/\//g, '-')
	id = id.replace(/\\\\/g, '-')
	id = id.replace(/\\/g, '-')

	Clear()

	if (save_data.hasOwnProperty(id))
	{
		if (save_data[id].hasOwnProperty("linked"))
		{
			if (save_data[id].linked)
			{
				can_save = false;
				return;
			}
		}
		var data = save_data[id]

		let pre_file = data.preview_file;
		let pre_index = documents_list.findIndex((doc) => { return doc.id == pre_file;})
		document.getElementById("preview_file").selectedIndex = pre_index	

		document.getElementById("file_name").value = data.name;

		data.list_file.forEach(file => {
			let f_index = documents_list.findIndex((doc) => { return doc.id == file;})
			if (f_index != -1)
			{
				AddFileLinked(f_index)
			}
		});

		data.list_tag.forEach(tag => {
			AddTag(tag);
		});
	}
	else
	{
		let doc_index = documents_list.findIndex((doc) => { console.log(doc.id == id); return doc.id == id;})
		document.getElementById("preview_file").selectedIndex = doc_index

		document.getElementById("file_name").value = documents_list[doc_index].name;

		let list_tag = documents_list[doc_index].path.split("\\");
		console.log(list_tag)
		for (let i = 1; i < list_tag.length - 1; i++) {
			AddTag(list_tag[i]);
		}
	}
}

function AddFileLinked(index = -1)
{
	let div = document.createElement("div");
	div.classList.add("file_link");
	let select = document.createElement("select");
	documents_list.forEach(doc => {
		let option = document.createElement("option");
		option.innerText = doc.file_name;
		select.appendChild(option);
	});
	select.selectedIndex = index;
	div.appendChild(select);
	let del = document.createElement("div");
	del.innerHTML = "<img src='/Images/Icons/Delete.svg'>"
	del.onclick = function() {
		div.parentNode.removeChild(div);
	}
	div.appendChild(del);
	document.getElementById("list_file").appendChild(div);
}

function AddTag(tag = "")
{
	let div = document.createElement("div");
	div.classList.add("file_link");
	let input = document.createElement("input");
	input.value = tag;
	input.type = "text";
	div.appendChild(input);
	let del = document.createElement("div");
	del.innerHTML = "<img src='/Images/Icons/Delete.svg'>"
	del.onclick = function() {
		div.parentNode.removeChild(div);
	}
	div.appendChild(del);
	document.getElementById("list_tag").appendChild(div);
}

function Next()
{
	Save()
	if (selected_line === null)
	{
		document.getElementById("list_img").firstElementChild.click();
	}
	else
	{
		var id = Array.from(document.getElementById("list_img").children).indexOf(selected_line);
		var start_id = id;
		
		if (id == document.getElementById("list_img").children.length - 1)
			id = 0
		else
			id += 1

		while (id != start_id)
		{
			let file_id = documents_list[id].id;
			if (save_data.hasOwnProperty(file_id))
			{
				if (!save_data[file_id].hasOwnProperty("linked") || !save_data[file_id].linked || save_data[file_id].lock)
					break;
			}
			else
				break;
			if (id == document.getElementById("list_img").children.length - 1)
				id = 0
			else
				id += 1
		}
		documents_list[id].li.click();
	}
}

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
		var start_id = id;
		
		if (id == 0)
			id = document.getElementById("list_img").children.length - 1
		else
			id -= 1

		while (id != start_id)
		{
			let file_id = documents_list[id].id;
			if (save_data.hasOwnProperty(file_id))
			{
				if (!save_data[file_id].hasOwnProperty("linked") || !save_data[file_id].linked || save_data[file_id].lock)
					break;
			}
			else
				break;
			if (id == 0)
				id = document.getElementById("list_img").children.length - 1
			else
				id -= 1
		}
		documents_list[id].li.click();
	}
}

function LockExo()
{
	var id = selected_line.innerText.replace(/\/\//g, '-')
	id = id.replace(/\//g, '-')
	id = id.replace(/\\\\/g, '-')
	id = id.replace(/\\/g, '-')
	if (!save_data.hasOwnProperty(id))
		Save()
	save_data[id].lock = true;
}

function ExportSave()
{
	Save()
	Export()
}

function Export()
{
	let jsonData = JSON.stringify(save_data, null, "\t");
	var a = document.createElement("a");
    var file = new Blob([jsonData], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = 'DataBase.json';
    a.click()
}