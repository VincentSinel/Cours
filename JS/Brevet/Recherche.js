console.clear();
var Resultats = {};
var tagsclick = false;
var new_count = 0;


function Rechercher(texte)
{
    document.getElementById('recherche').value = texte;
    var textes = texte.split(" ");
    textes.unshift(texte)
    Resultats = {};
    for(var l = 0; l<ListExercices.length; l++)
    {
        if (texte == "")
        {
            Add(l, 1);
            continue;
        }
        var exo = ListExercices[l];
        var titre = " " + exo.Name + " Exercice " + exo.Index + " ";

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
    const checkmark = document.querySelectorAll('.CheckMark')  
    for (const el of checkmark) {  
        el.parentNode.setAttribute("selected", "false");
        el.parentNode.removeChild(el);  
    }
    for (let i = 0; i < ListExercices.length; i++) {
        ListExercices[i].Selected = false;
    }
    CreateListeSelection();
}