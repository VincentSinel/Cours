
var documents_list = [];

window.addEventListener('load', function() {
	Load_Data();
})

function Load_Data()
{
	var client = new XMLHttpRequest();
	client.open('GET', 'ListeDocuments.txt');
	client.onreadystatechange = function() {
		if (client.readyState === 4){ 
			End_load(client.responseText);
		}
	}
	client.send();
}

function End_load(list)
{
	documents_list = [];
	let lines = list.split('\n');
	lines.forEach(line => {
		if (line.length != 0)
		{
			// Remove empty space at the end
			line = line.replace(/[ \t\r]+$/, '')
			// Remove path and extension
			let name = line.replace(/^.*[\\/]/, '').replace(/\.\w*$/, '');

			let data = {path: line, name: name}
			documents_list.push(data);
		}
	});
	Rechercher("")
}


function Rechercher(texte)
{
	texte = FormatText(texte.toLowerCase())
	var textes = texte.split(" ");
	textes.unshift(texte)
	var resultats = {};
	for(var l = 0; l < documents_list.length; l++)
	{
		var doc = documents_list[l];

		if (texte == "")
		{
			resultats[l] = 0;
			continue;
		}

		var base_titre = FormatText(doc.name.toLowerCase());

		textes.forEach(txt => {
			if (txt != "")
			{
				let Regex = RegExp('(' + txt + ')+');
				if (Regex.test(base_titre))
				{
					let poids
					if (textes.indexOf(txt) == 0 && txt.length > 5)
						poids = count('(' + txt + ')+', base_titre) + 1;
					else
						poids = count('(' + txt + ')+', base_titre) * txt.length / base_titre.length;
					
					if (resultats.hasOwnProperty(l))
					{
							if (resultats[l] < poids)
								resultats[l] = poids;
							return;
					}
					resultats[l] = poids;
				}
			}
		});
	}
	CreateListeResultat(resultats);
}

function CreateListeResultat(resultats){
	document.getElementById("Resultats").innerHTML = "";

	var results = Object.keys(resultats).map(function(key) {
			return [Number(key), resultats[key]];
	});
	results.sort(function(a, b){
			if (a[0] == b[0]) {
					if (a[1] < b[1]) return -1;
					if (a[1] > b[1]) return 1;
					return 0;
			}
			return b[1]-a[1]
	})

	if (results.length == 0)
	{
			var ligneblock = document.createElement("div");
			ligneblock.setAttribute("class", "Result");
			ligneblock.innerHTML = "Aucun résultat"
			document.getElementById("Resultats").appendChild(ligneblock);
			return;
	}
	for(var l = 0; l < results.length; l++)
	{
			var ligneblock = CreateHTML(results[l][0]);
			document.getElementById("Resultats").appendChild(ligneblock);
	}
}

function CreateHTML(id)
{
	var doc = documents_list[id];
	var name = doc.name;
	var div = document.createElement("div");
	div.id = "resultat" + id.toString();
	div.classList.add("resultat");
	div.onclick = function() { SelectDoc(doc.path); }

	let div1 = document.createElement("div");
	div1.classList.add("resultat_info");
	div.appendChild(div1);

	let span1 = document.createElement("span");
	span1.classList.add("resultat_title")
	span1.classList.add("unselectable")
	span1.innerText = name.replaceAll("_", " ");
	div1.appendChild(span1)

	let div2 = document.createElement("div");
	div2.classList.add("resultat_tag")
	div2.classList.add("unselectable")
	div1.appendChild(div2);
	
	let list_tag = doc.path.split("\\");
	for (let i = 1; i < list_tag.length - 1; i++) {
		const element = list_tag[i];
		let tag = document.createElement("div");
		tag.innerText = element;
		tag.onclick = function() { TagClick(element); }
		div2.appendChild(tag);
	}

	let div3 = document.createElement("div");
	div3.classList.add("resultat_buttons");
	div.appendChild(div3);

	if (doc.path.endsWith('.pdf'))
	{
		let svg1 = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 213.51 262.5" width="27" height="33"><path fill="#ff2116" d="M27.11,0A27.16,27.16,0,0,0,0,27.12V235.38A27.15,27.15,0,0,0,27.11,262.5H186.36a27.15,27.15,0,0,0,27.11-27.12V64.13a22.38,22.38,0,0,0-1.75-9.89,27.38,27.38,0,0,0-5.36-7.76l0,0L166.82,7.69l-.07-.06a31,31,0,0,0-8.37-5.36,30.55,30.55,0,0,0-12-2.26H27.11Z" /><path fill="#f5f5f5" d="M27.11,8.91H146.6a25.64,25.64,0,0,1,8.27,1.54,22.94,22.94,0,0,1,5.76,3.64l0,0,39.41,38.67a21.55,21.55,0,0,1,3.53,5.08,19.18,19.18,0,0,1,1,5.89,1.15,1.15,0,0,1,0,.19V235.38a18.06,18.06,0,0,1-18.2,18.21H27.11a18.07,18.07,0,0,1-18.2-18.21V27.12A18.07,18.07,0,0,1,27.11,8.91Z" /><path fill="#ff2116" d="M148.1,109.4L148.1,126.8L65.4,126.8L65.4,109.4L49.5,109.4L49.5,142.7L164,142.7L164,109.4Z M107.1,119.6L138.8,64.6L123,64.6L123,39.2L91.2,39.2L91.2,64.6L75.4,64.6Z" /><path fill="#2c2c2c" d="M63.73,184.67h10a26.93,26.93,0,0,1,7.74.92,9,9,0,0,1,5,4,13,13,0,0,1,2,7.39,13.41,13.41,0,0,1-1.64,6.83,9.66,9.66,0,0,1-4.45,4.12c-1.84.84-4.69,1.27-8.54,1.27H70.38v15.69H63.73Zm6.65,5.15v14h3.3q4.41,0,6.09-1.65t1.71-5.36a8.06,8.06,0,0,0-1.12-4.47,4.58,4.58,0,0,0-2.47-2.12,15.25,15.25,0,0,0-4.21-.42Z" /><path fill="#2c2c2c" d="M93.55,184.67h9q6.55,0,10.48,2.33a14.43,14.43,0,0,1,5.94,6.92,24.78,24.78,0,0,1,2,10.18,28.35,28.35,0,0,1-1.82,10.51,16.68,16.68,0,0,1-5.54,7.42q-3.71,2.83-10.59,2.83H93.55ZM100.2,190v29.53H103q5.81,0,8.42-4T114,204.78Q114,190,103,190Z" /><path fill="#2c2c2c" d="M127.43,184.67h22.32V190H134.09v12h12.54v5.33H134.09v17.52h-6.66Z" /></svg>'
	
		let div4 = document.createElement("div");
		div4.onclick = function() { Download(doc.path, 'PDF') };
		div4.innerHTML = svg1;
		div3.appendChild(div4);
	}

	if (doc.path.endsWith('.docx'))
	{
		let svg2 = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27 33" width="27" height="33"><path fill="#295497" d="M3.5,0C1.6,0,0.1,1.5,0.1,3.4v26.2c0,1.9,1.5,3.4,3.4,3.4h20c1.9,0,3.4-1.5,3.4-3.4V8.1c0-0.4-0.1-0.9-0.2-1.2c-0.2-0.4-0.4-0.7-0.7-1l0,0l-5-4.9l0,0c-0.3-0.3-0.7-0.5-1.1-0.7C19.5,0.1,19,0,18.5,0L3.5,0L3.5,0z"/><path fill="#F5F5F5" d="M3.5,1.1h15c0.4,0,0.7,0.1,1,0.2c0.3,0.1,0.5,0.3,0.7,0.5l0,0l5,4.9c0.2,0.2,0.3,0.4,0.4,0.6c0.1,0.2,0.1,0.5,0.1,0.7c0,0,0,0,0,0v21.6c0,1.3-1,2.3-2.3,2.3c0,0,0,0,0,0h-20c-1.3,0-2.3-1-2.3-2.3c0,0,0,0,0,0V3.4C1.2,2.2,2.2,1.1,3.5,1.1C3.5,1.1,3.5,1.1,3.5,1.1z"/><path fill="#295497" d="M18.7,13.8v2.2H8.3v-2.2h-2v4.2h14.4v-4.2H18.7z M13.5,15l4-6.9h-2V4.9h-4v3.2h-2L13.5,15z"/><path fill="#2C2C2C" d="M6.4,23h1.3c1.3,0,1.8,0.9,1.8,2.5c0,1.8-0.5,2.7-1.9,2.7H6.4V23z M7.3,27.6h0.4c0.8,0,1.1-0.6,1.1-2c0-1.3-0.3-1.8-1.1-1.8H7.3V27.6z"/><path fill="#2C2C2C" d="M13.4,25.6c0,1.9-0.5,2.7-1.7,2.7c-1.1,0-1.6-0.9-1.6-2.7c0-1.8,0.6-2.6,1.7-2.6C12.9,23,13.4,23.8,13.4,25.6z M11,25.6c0,1.3,0.2,2.1,0.8,2.1c0.6,0,0.8-0.7,0.8-2.1c0-1.3-0.2-1.9-0.8-1.9C11.2,23.7,11,24.3,11,25.6z"/><path fill="#2C2C2C" d="M17.1,26.8c0,0.3-0.1,1.6-1.5,1.6c-1.5,0-1.6-1.4-1.6-2.7c0-1.6,0.5-2.7,1.7-2.7c1.3,0,1.4,1.2,1.5,1.6h-0.8c0-0.2,0-0.9-0.7-0.9c-0.7,0-0.8,0.9-0.8,2c0,1,0.1,2,0.8,2c0.6,0,0.7-0.7,0.7-0.9H17.1z"/><path fill="#2C2C2C" d="M19.8,28.3l-0.8-2h0l-0.9,2h-0.9l1.3-2.7L17.3,23h0.9l0.8,1.8l0,0l0.8-1.8h0.9l-1.2,2.5l1.3,2.8H19.8z"/></svg>'
	
		let div5 = document.createElement("div");
		div5.onclick = function() { Download(doc.path, 'DOCX') };
		div5.innerHTML = svg2;
		div3.appendChild(div5);
	}

	if (doc.path.endsWith('.odt'))
	{
		let svg3 = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27 33" width="27" height="33"><path style="fill:#74BD83;" d="M3.5,0C1.6,0,0.1,1.5,0.1,3.4v26.2c0,1.9,1.5,3.4,3.4,3.4h20c1.9,0,3.4-1.5,3.4-3.4V8.1c0-0.4-0.1-0.9-0.2-1.2 c-0.2-0.4-0.4-0.7-0.7-1l0,0L21,1l0,0c-0.3-0.3-0.7-0.5-1.1-0.7C19.5,0.1,19,0,18.5,0H3.5L3.5,0z"/><path style="fill:#F5F5F5;" d="M3.5,1.1h15c0.4,0,0.7,0.1,1,0.2s0.5,0.3,0.7,0.5l0,0l5,4.9c0.2,0.2,0.3,0.4,0.4,0.6s0.1,0.5,0.1,0.7l0,0v21.6 c0,1.3-1,2.3-2.3,2.3l0,0h-20c-1.3,0-2.3-1-2.3-2.3l0,0V3.4C1.2,2.2,2.2,1.1,3.5,1.1L3.5,1.1z"/><path style="fill:#74BD83;" d="M18.7,13.8V16H8.3v-2.2h-2V18h14.4v-4.2H18.7z M13.5,15l4-6.9h-2V4.9h-4v3.2h-2L13.5,15z"/><path style="fill:#2C2C2C;" d="M11.8,23h1.3c1.3,0,1.8,0.9,1.8,2.5c0,1.8-0.5,2.7-1.9,2.7h-1.2V23z M12.7,27.6h0.4c0.8,0,1.1-0.6,1.1-2 c0-1.3-0.3-1.8-1.1-1.8h-0.4V27.6z"/><path style="fill:#2C2C2C;" d="M11.2,25.6c0,1.9-0.5,2.7-1.7,2.7c-1.1,0-1.6-0.9-1.6-2.7c0-1.8,0.6-2.6,1.7-2.6S11.2,23.8,11.2,25.6z M8.8,25.6c0,1.3,0.2,2.1,0.8,2.1s0.8-0.7,0.8-2.1c0-1.3-0.2-1.9-0.8-1.9S8.8,24.3,8.8,25.6z"/><path style="fill:#2C2C2C;" d="M15.4,23.7V23h3.5v0.7H15.4z M16.8,28.3V23h0.7v5.3H16.8z"/></svg>'
	
		let div6 = document.createElement("div");
		div6.onclick = function() { Download(doc.path, 'ODT') };
		div6.innerHTML = svg3;
		div3.appendChild(div6);
	}

	if (doc.path.endsWith('.zip'))
	{
		let svg4 = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"viewBox="0 0 27 33" width="27" height="33"><style type="text/css">.lines{fill:none;stroke:#2C2C2C;stroke-width:0.75;stroke-miterlimit:10;}</style><path fill="#F6A117" d="M3.5,0C1.6,0,0.1,1.5,0.1,3.4v26.2c0,1.9,1.5,3.4,3.4,3.4h20c1.9,0,3.4-1.5,3.4-3.4V8.1c0-0.4-0.1-0.9-0.2-1.2c-0.2-0.4-0.4-0.7-0.7-1l0,0L21,1l0,0c-0.3-0.3-0.7-0.5-1.1-0.7C19.5,0.1,19,0,18.5,0H3.5L3.5,0z"/><path fill="#F5F5F5" d="M3.5,1.1h15c0.4,0,0.7,0.1,1,0.2s0.5,0.3,0.7,0.5l0,0l5,4.9c0.2,0.2,0.3,0.4,0.4,0.6s0.1,0.5,0.1,0.7l0,0v21.6c0,1.3-1,2.3-2.3,2.3l0,0h-20c-1.3,0-2.3-1-2.3-2.3l0,0V3.4C1.2,2.2,2.2,1.1,3.5,1.1L3.5,1.1z"/><path fill="#F6A117" d="M18.7,13.8V16H8.3v-2.2h-2V18h14.4v-4.2H18.7z M13.5,15l4-6.9h-2V4.9h-4v3.2h-2L13.5,15z"/><g><path fill="#2C2C2C" d="M8.2,20h4.1v0.5L9,24.6h3.4v0.6H8.2v-0.5l3.3-4.1H8.2V20z"/><path fill="#2C2C2C" d="M13.4,20h0.7v5.2h-0.7V20z"/><path fill="#2C2C2C" d="M15.5,20h1.6c0.6,0,1,0.1,1.3,0.4c0.3,0.3,0.4,0.7,0.4,1.2c0,0.5-0.1,0.9-0.4,1.2s-0.7,0.4-1.3,0.4h-0.9v2.1h-0.7V20z M16.3,20.6v2h0.9c0.3,0,0.6-0.1,0.8-0.3s0.3-0.4,0.3-0.7c0-0.3-0.1-0.6-0.3-0.7c-0.2-0.2-0.4-0.3-0.8-0.3H16.3z"/></g><g><path class="lines" d="M17,30.1h-1.7v-3.3H17c0.9,0,1.7,0.7,1.7,1.7v0C18.6,29.4,17.9,30.1,17,30.1z"/><line class="lines" x1="8.4" y1="28.4" x2="15.3" y2="28.4"/><line class="lines" x1="9.4" y1="27.3" x2="9.4" y2="29.6"/><line class="lines" x1="10.9" y1="27.3" x2="10.9" y2="29.6"/><line class="lines" x1="12.3" y1="27.3" x2="12.3" y2="29.6"/><line class="lines" x1="13.8" y1="27.3" x2="13.8" y2="29.6"/><rect x="16.3" y="27.7" fill="#F6A117" width="0.8" height="1.5"/></g></svg>'
	
		let div7 = document.createElement("div");
		div7.onclick = function() { Download(doc.path, 'ZIP') };
		div7.innerHTML = svg4;
		div3.appendChild(div7);
	}

	return div
}



function count(re, str) {
	if (typeof re !== "string") {
			return 0;
	}
	re = (re === '.') ? ('\\' + re) : re;
	var cre = new RegExp(re, 'g');
	return ((str || '').match(cre) || []).length;
}

function FormatText(txt)
{
	txt = txt.replaceAll(/[àâä]/g, 'a')
	txt = txt.replaceAll(/[ÀÂÄ]/g, 'A')
	txt = txt.replaceAll(/[éèêë]/g, 'e')
	txt = txt.replaceAll(/[ÉÈÊË]/g, 'E')
	txt = txt.replaceAll(/[ìîï]/g, 'i')
	txt = txt.replaceAll(/[ÌÎÏ]/g, 'I')
	txt = txt.replaceAll(/[òôö]/g, 'o')
	txt = txt.replaceAll(/[ÒÔÖ]/g, 'O')
	txt = txt.replaceAll(/[ùûü]/g, 'u')
	txt = txt.replaceAll(/[ÙÛÜ]/g, 'U')
	return txt
}

function SelectDoc(filename)
{
	document.getElementById("preview").src = filename;
}

function TagClick(tag)
{

}

function Download(filename, type)
{
	var a = document.createElement("a");
    a.href = filename;
    a.download = filename;
    a.click()
}