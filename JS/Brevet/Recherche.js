console.clear();
var Resultats = {};
var tagsclick = false;
var new_count = 0;
var ListExercices;


function LoadData()
{
    var client2 = new XMLHttpRequest();
	client2.open('GET', 'DataBase.json');
	client2.onreadystatechange = function() {
		if (client2.readyState === 4){ 
			End_load(client2.responseText);
		}
	}
	client2.send();
}

function End_load(json)
{
    var save_data = {};
	save_data = JSON.parse(json);

    ListExercices = [];

    for (const [key, value] of Object.entries(save_data)) {
        ListExercices.push(new BrevetObject(key, value));
    }
    ListExercices.sort((a, b) =>  a.GetTitle().localeCompare(b.GetTitle()))

    Rechercher("");
}



function Rechercher(texte)
{
    document.getElementById('recherche').value = texte;
    var textes = texte.split(" ");
    textes.unshift(texte)
    Resultats = {};
    for(var l = 0; l<ListExercices.length; l++)
    {
        var exo = ListExercices[l];
        if (!CheckAdvanced(exo)) continue;

        if (texte == "")
        {
            Add(l, 1);
            continue;
        }
        var titre = exo.GetTitle();// " " + exo.Name + " Exercice " + exo.Index + " ";

        titre = FormatText(titre)

        textes.forEach(txt => {
            if (txt != "")
            {
                txt1 = txt;
                
                txt = FormatText(txt)

                let Regex = RegExp('(' + txt + ')+');
                if (Regex.test(titre))
                {
                    if (textes.indexOf(txt1) == 0 && txt.length > 5)
                        Add(l, count('(' + txt + ')+', titre) + 1);
                    else
                        Add(l, count('(' + txt + ')+', titre) * txt.length / titre.length);
                }
                Object.entries(exo.Tags).forEach(([key, value]) => {
                    var tagname = key;
                    if (Tags.hasOwnProperty(tagname))
                    {
                        for(var j = 0; j < Tags[tagname].length; j++)
                        {
                            let globalRegex = RegExp('(' + txt + ')+');
                            let element = Tags[tagname][j];
                            
                            element = FormatText(element)
    
                            if (globalRegex.test(element))
                                Add(l, count('(' + txt + ')+', element) * txt.length / element.length + value);
                        }
                        let globalRegex = RegExp('(' + txt + ')+');
                        let element = tagname;
                            
                        element = FormatText(element)

                        if (globalRegex.test(element))
                            Add(l, count('(' + txt + ')+', element) * txt.length / element.length + value);
                    }
                });
            }
        });
    }
    CreateListeResultat();
}

function CheckAdvanced(exo)
{
    let a = document.getElementById("Serie_Gen").checked;
    let b = document.getElementById("Serie_Pro").checked;
    if (!a && exo.Serie == 0) return false;
    if (!b && exo.Serie == 1) return false;
    let s0 = document.getElementById("Sujet_AN").checked;
	let s1 = document.getElementById("Sujet_AS").checked;
	let s2 = document.getElementById("Sujet_CE").checked;
	let s3 = document.getElementById("Sujet_AG").checked;
	let s4 = document.getElementById("Sujet_R").checked;
	let s5 = document.getElementById("Sujet_M").checked;
	let s6 = document.getElementById("Sujet_P").checked;
	let s7 = document.getElementById("Sujet_NC").checked;
	let s8 = document.getElementById("Sujet_G").checked;
	let s9 = document.getElementById("Sujet_A").checked;
	let sA = document.getElementById("Sujet_BB").checked;
	let sB = document.getElementById("Sujet_AU").checked;
    let keep = false;
    exo.Sujet.forEach(sujet => {
        switch (sujet)
        {
            case "AN": if(s0) keep = true; break;
            case "AS": if(s1) keep = true; break;
            case "CE": if(s2) keep = true; break;
            case "AG": if(s3) keep = true; break;
            case "R":  if(s4) keep = true; break;
            case "M":  if(s5) keep = true; break;
            case "P":  if(s6) keep = true; break;
            case "NC": if(s7) keep = true; break;
            case "G":  if(s8) keep = true; break;
            case "A":  if(s9) keep = true; break;
            case "BB": if(sA) keep = true; break;
            case "AU": if(sB) keep = true; break;
        }
    });
    if (!keep) return false;
    
    if (exo.Annee == 2023 && !document.getElementById("Serie_2023").checked) return false;
    if (exo.Annee == 2022 && !document.getElementById("Serie_2022").checked) return false;
    if (exo.Annee == 2021 && !document.getElementById("Serie_2021").checked) return false;
    if (exo.Annee == 2020 && !document.getElementById("Serie_2020").checked) return false;
    if (exo.Annee == 2019 && !document.getElementById("Serie_2019").checked) return false;
    if (exo.Annee == 2018 && !document.getElementById("Serie_2018").checked) return false;
    if (exo.Annee == 2017 && !document.getElementById("Serie_2017").checked) return false;
    if (exo.Annee == 2016 && !document.getElementById("Serie_2016").checked) return false;

    return true; 
}

function FormatText(txt)
{
    txt = txt.toLowerCase();
    txt = txt.replace("é", "e");
    txt = txt.replace("è", "e");
    txt = txt.replace("ê", "e");
    txt = txt.replace("ë", "e");
    txt = txt.replace("à", "a");
    txt = txt.replace("â", "a");
    txt = txt.replace("ï", "i");
    txt = txt.replace("î", "i");
    txt = txt.replace("ù", "u");
    txt = txt.replace("ô", "o");
    return txt
}

function count(re, str) {
    if (typeof re !== "string") {
        return 0;
    }
    re = (re === '.') ? ('\\' + re) : re;
    var cre = new RegExp(re, 'g');
    return ((str || '').match(cre) || []).length;
}

function Add(int, poids)
{
    if (Resultats.hasOwnProperty(int))
    {
        if (Resultats[int] < poids)
            Resultats[int] = poids;
        return;
    }
    Resultats[int] = poids;
}


function CreateListeResultat(){
    document.getElementById("Resultats").innerHTML = "";

    var results = Object.keys(Resultats).map(function(key) {
        return [Number(key), Resultats[key]];
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
        var ligneblock = ListExercices[results[l][0]].CreateHtmlResultat(results[l][0]);
        document.getElementById("Resultats").appendChild(ligneblock);
    }
}

function CreateListeSelection(){
    document.getElementById("Selection").innerHTML = "";

    var results = ListExercices.filter(item => item.Selected);

    if (results.length == 0)
    {
        var ligneblock = document.createElement("div");
        ligneblock.setAttribute("class", "Result");
        ligneblock.innerHTML = "Aucun exercice selectionné"
        document.getElementById("Selection").appendChild(ligneblock);
        return;
    }
    for(var l = 0; l < results.length; l++)
    {
        var ligneblock = results[l].CreateHtmlExo(l);
        document.getElementById("Selection").appendChild(ligneblock);
    }
}


function SelectExercice(elmt){
    if (tagsclick)
    {
        tagsclick = false;
        return;
    }

    let id = parseInt(elmt.getAttribute("indexexo"))
    let se = elmt.getAttribute("selected") == "true";
    if (ListExercices[id].Selected)
    {
		new_count -= 1;
		document.getElementById('nbrnotifier').innerHTML = new_count;
		if (new_count == 0)
			document.getElementById('nbrnotifier').classList.add	('nbrnotifier_hide');
        ListExercices[id].Selected = false;
        if (se)
        {
            elmt.setAttribute("selected", "false");
            elmt.classList.remove("selected_result");
            const checkmark = elmt.querySelectorAll('.CheckMark')  
            for (const el of checkmark) {  
                el.parentNode.removeChild(el);  
            }
        }
    }
    else
    {
		new_count += 1;
		document.getElementById('nbrnotifier').classList.remove('nbrnotifier_hide');
		document.getElementById('nbrnotifier').innerHTML = new_count;
        ListExercices[id].Selected = true;
        if (!se)
        {
            elmt.setAttribute("selected", "true");
            elmt.classList.add("selected_result");
            ListExercices[id].AddCheckMark(elmt);
        }
    }
    
    CreateListeSelection();
}

function ClearSelection()
{
    new_count = 0;
    document.getElementById('nbrnotifier').classList.add('nbrnotifier_hide');
    const checkmark = document.querySelectorAll('.CheckMark')  
    for (const el of checkmark) {  
        el.parentNode.setAttribute("selected", "false");
        el.parentNode.classList.remove("selected_result");
        el.parentNode.removeChild(el);  
    }
    for (let i = 0; i < ListExercices.length; i++) {
        ListExercices[i].Selected = false;
    }
    CreateListeSelection();
}