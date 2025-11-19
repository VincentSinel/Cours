var worker = undefined
var worker_pdf = undefined
var loaded_data = {};
var filename = "ListeCartons.json"
var gencount = 0
var color = "#50e991"


function Generate()
{
  if(typeof(Worker) !== "undefined") {
		if (worker in window)
		{
			gencount = document.getElementById("NombreCarton").valueAsNumber
			document.getElementById("DownloadButton").classList.add("disabled")
			document.getElementById("PrintButton").classList.add("disabled")
			document.getElementById("CancelButton").classList.remove("disabled")
			document.getElementById("progressionContainer").classList.remove("progression-bar-canceled")

			Generation_Update({status: "start", result: {}})

			worker = new Worker("Carton.js");
			worker.onmessage = function(event) { Generation_Update(event.data)};
			worker.postMessage({count: gencount, data: loaded_data});
		}
	}
	else {
    alert("Désoler, votre navigateur ne supporte pas les 'Web Workers' nécessaire pour cette application...");
  }
}

function Generation_Update(data)
{
	var size = Object.keys(data.result).length;

	var rect = document.getElementById("ProgressionRect");
	var label = document.getElementById("ProgressionLabel");
	var coef = size / gencount;
	rect.setAttribute("width", Math.floor(coef * 316).toString())
	rect.setAttribute("fill-opacity", coef)
	label.innerHTML = Math.floor(coef * 100).toString() + "%"

	if (data.status == "End")
	{
		loaded_data = data.result;
		document.getElementById("DownloadButton").classList.remove("disabled")
		document.getElementById("PrintButton").classList.remove("disabled")
		document.getElementById("CancelButton").classList.add("disabled")
		worker.terminate();
		worker = undefined
		UpdatePreview()
	}
}

function StopGeneration() 
{
	console.log("Stop")
	if (worker)
	{
		worker.terminate();
		worker = undefined

		var rect = document.getElementById("ProgressionRect");
		var label = document.getElementById("ProgressionLabel");
		rect.setAttribute("width", 316)
		rect.setAttribute("fill-opacity", 1)
		document.getElementById("CancelButton").classList.add("disabled")
		label.innerHTML = "Annulé"
		document.getElementById("progressionContainer").classList.add("progression-bar-canceled")
	}
}

function Download()
{
	if (document.getElementById("DownloadButton").classList.contains("disabled")) return;
	let jsonData = JSON.stringify(loaded_data, null, "\t");
	if (jsonData == undefined)
	{
		document.getElementById("DownloadButton").classList.add("disabled")
		return;
	} 
			
	// jsonData = jsonData.replaceAll(",\"", ",\n\"")
	var a = document.createElement("a");
    var file = new Blob([jsonData], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click()

}

function Open()
{
  let input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.addEventListener('change', (e) => {
    const [file] = e.target.files;
    readJSON(e, file);
  });
  input.click();
}
function readJSON(e, file) {
	filename = file.name
	document.getElementById("OpenFileName").innerHTML = filename;
  if (!file) { return; }
	document.getElementById("GenerateButton").classList.add("disabled")
  var reader = new FileReader();
  reader.onload = function(e) {
    processJSON(e.target.result);
  };
  reader.readAsText(file);
}
function processJSON(contents) {
  loaded_data = JSON.parse(contents);
	document.getElementById("GenerateButton").classList.remove("disabled")
	UpdatePreview()
}


function RetrieveGrid(string)
{
	var list = []
	for (let j = 0; j < 27; j++) 
	{
		list.push(parseInt(string.slice(j*2,(j+1) *2)));
	}
	return list
}


function UpdatePreview()
{
	var keys = Object.keys(loaded_data)
	if (keys.length == 0) return;
	var selected_id = document.getElementById("CartonSelection").valueAsNumber - 1
	var id = Math.max(0,Math.min(keys.length - 1, selected_id))
	var uid = keys[id]
	var grid = RetrieveGrid(loaded_data[uid])
	var info1 = document.getElementById("PreviewInfo1");
	var info2 = document.getElementById("PreviewInfo2");
	info1.innerHTML = "Carton n°" + (id + 1).toString();
	info2.innerHTML = uid.toString();

	for (let j = 0; j < 9; j++) {
		for (let i = 0; i < 3; i++) {
			let div = document.getElementById("Case" + i.toString() + j.toString())
			let v = grid[i + j * 3];
			if (v == 0)
			{
				div.innerHTML = "<div class=\"Empty\"></div>"
			}
			else
			{
				div.innerHTML = "<div>" + v + "</div><div class=\"SmallNumber\">" + v + "</div>"
			}
		}
	}
}

function ReajustText()
{
	var lab1 = document.getElementById("PreviewInfo1")
	var lab2 = document.getElementById("PreviewInfo2")
	var lab3 = document.getElementById("PreviewText1")
	var lab4 = document.getElementById("PreviewText2")
	var lab5 = document.getElementById("PreviewText3")

	lab3.innerHTML = document.getElementById("show_carton_txt1_value").value
	lab4.innerHTML = document.getElementById("show_carton_txt2_value").value
	lab5.innerHTML = document.getElementById("show_carton_txt3_value").value

	lab1.style.display = document.getElementById("show_carton_nbr").checked ? "block" : "none";
	lab2.style.display = document.getElementById("show_carton_uid").checked ? "block" : "none";
	lab3.style.display = document.getElementById("show_carton_txt1").checked ? "block" : "none";
	lab4.style.display = document.getElementById("show_carton_txt2").checked ? "block" : "none";
	lab5.style.display = document.getElementById("show_carton_txt3").checked ? "block" : "none";
}

function PrintCarton()
{
	if (Object.keys(loaded_data).length == 0)
	{
		document.getElementById("PrintButton").classList.add("disabled")
		return;
	} 

  if(typeof(Worker) !== "undefined") {
		if (worker_pdf in window)
		{
			document.getElementById("progressionContainer_Pdf").classList.remove("progression-bar-canceled")
			document.getElementById("CancelButtonPrint").classList.remove("disabled")
			var range = document.getElementById("selected_card").value;

			if (CheckStringPrint(range))
			{
				worker_pdf = new Worker("CartonPrint.js");
				worker_pdf.onmessage = function(event) { Printing_Update(event.data)};
				
				worker_pdf.postMessage({
					cardlist: loaded_data, 
					range: range, 
					color: color,
					show_carton_nbr: document.getElementById("show_carton_nbr").checked,
					show_carton_uid: document.getElementById("show_carton_uid").checked,
					show_carton_txt1: document.getElementById("show_carton_txt1").checked,
					show_carton_txt2: document.getElementById("show_carton_txt2").checked,
					show_carton_txt3: document.getElementById("show_carton_txt3").checked,
					show_carton_txt1_value: document.getElementById("show_carton_txt1_value").value,
					show_carton_txt2_value: document.getElementById("show_carton_txt2_value").value,
					show_carton_txt3_value: document.getElementById("show_carton_txt3_value").value,
				});
			}
			else
			{
				alert("La plage d'impression est incorrect.")
			}
		}
	}
	else {
    alert("Désoler, votre navigateur ne supporte pas les 'Web Workers' nécessaire pour cette application...");
  }
}

function onPlageChange()
{
	var range = document.getElementById("selected_card");
	if (CheckStringPrint(range.value))
	{
		range.classList.remove("card_select_incorrect")
	}
	else
	{
		range.classList.add("card_select_incorrect")
	}
}

function CheckStringPrint(value)
{
	const allowed = ["0","1","2","3","4","5","6","7","8","9",";"," ","-"]
	for (let c = 0; c < value.length; c++) {
		const element = value[c];
		if (!allowed.includes(element)) return false
	}
	return true;
}

function Printing_Update(data)
{
	var rect = document.getElementById("ProgressionRect_Pdf");
	var label = document.getElementById("ProgressionLabel_Pdf");
	rect.setAttribute("width", Math.floor(data.completion * 316).toString())
	rect.setAttribute("fill-opacity", data.completion)
	label.innerHTML = Math.floor(data.completion * 100).toString() + "%"

	if (data.status == "End")
	{
		if (!data.result) return;

		document.getElementById("CancelButtonPrint").classList.add("disabled")
		var a = document.createElement("a");
		a.href = URL.createObjectURL(data.result);
		a.download = 'test.pdf';
		a.click()

		worker_pdf.terminate();
		worker_pdf = undefined
	}
}

function StopPrinting() 
{
	if (worker_pdf)
	{
		worker_pdf.terminate();
		worker_pdf = undefined

		var rect = document.getElementById("ProgressionRect_Pdf");
		var label = document.getElementById("ProgressionLabel_Pdf");
		document.getElementById("CancelButtonPrint").classList.add("disabled")
		rect.setAttribute("width", 316)
		rect.setAttribute("fill-opacity", 1)
		label.innerHTML = "Annulé"
		document.getElementById("progressionContainer_Pdf").classList.add("progression-bar-canceled")
	}
}



function ShowHelp(id) {
	var img = document.getElementById(id)
	if (img.style.display == "none") img.style.display = "block";
	else img.style.display = "none";
}

function ChangeColor(newcolor)
{
	if (/^#[0-9A-F]{6}$/i.test(newcolor))
	{
		color = newcolor;
		document.documentElement.style.setProperty("--CartonColor", newcolor)
		document.getElementById("Card_color").value = newcolor.slice(1);
		document.getElementById("Card_color_selector").value = newcolor;
	}
}