var Scripts = [
    "Types/Histogramme.js",
    "Types/Diagramme_Baton.js",
    "Types/Diagramme_Circulaire.js",
    "Types/Diagramme_Cartesien.js",
]
for (let s = 0; s < Scripts.length; s++) 
{
    let script_node = document.createElement("script");
    script_node.src = "/JS/Diagrammes/" + Scripts[s];
    // script_node.async = false;
    script_node.charset = "utf-8";
    document.head.appendChild(script_node);
}
// document.write('<script src="JS/Diagramme.js" charset="utf-8"></script>')
window.addEventListener("page_content_loaded", () => {
    if (typeof CreateDiagrammes === "function") {
        CreateDiagrammes();
    }
});
// window.addEventListener("load", function()
// {
//     CreateDiagrammes();
// })
// function CreateDiagrammes()
// {
// }

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