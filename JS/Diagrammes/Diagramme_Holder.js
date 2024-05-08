var Scripts = [
    "Types/Histogramme.js",
    "Types/Diagramme_Baton.js",
    "Types/Diagramme_Circulaire.js",
    "Types/Diagramme_Cartesien.js",
]
for (let s = 0; s < Scripts.length; s++) 
{
    document.write('<script src="' + "/JS/Diagrammes/" + Scripts[s] + '" charset="utf-8"></script>')
}
document.write('<script src="JS/Diagramme.js" charset="utf-8"></script>')
window.onload = function()
{
    CreateDiagrammes();
}


function Create_Histogramme(config)
{
	new Histogramme(config);
}

function Create_DiagBaton(config)
{
	new Diagramme_Baton(config);
}

function Create_DiagCirculaire(config)
{
	new Diagramme_Circulaire(config);
}

function Create_DiagCartesien(config)
{
	new Diagramme_Cartesien(config);
}