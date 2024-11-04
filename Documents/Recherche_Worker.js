onmessage = function(e) {
	CheckMessage(e);
}

CheckMessage(e)
{
	documents_list = e.documents;
	Rechercher(e.search)
}

var documents_list = [];


var ACTION_CLEAR = "clear";
var ACTION_ADDRESULT = "result";

PostMessage(action, data = {})
{
	postMessage({action: action, data: data})
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