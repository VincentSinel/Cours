// Dépendances

var Styles = [
	"/JS/JSColorPicker/colorpicker.css",
	"/JS/EditorMenu/EM_Style.css"
]
for (let s = 0; s < Styles.length; s++) 
{
  document.write('<link rel="stylesheet" href="' + Styles[s] + '">')
}


var Scripts = [
    "/JS/Svg.js/svg.min.js",
		"/JS/JSColorPicker/colorpicker.iife.min.js",

		"/JS/EditorMenu/EM_Base.js",
		"/JS/EditorMenu/EM.js",
		"/JS/EditorMenu/EM_Line.js",

		"/JS/Diagrammes/Types/Diagramme_Baton.js",
		"/JS/Diagrammes/Types/Diagramme_Cartesien.js",
		"/JS/Diagrammes/Types/Diagramme_Circulaire.js",
		"/JS/Diagrammes/Types/Histogramme.js",

		"Formes/F_Base.js",
		"Formes/F_Obj.js",
		"Formes/F_Repere.js",
		"Formes/F_Axe.js",
		"Formes/F_Quadrillage.js",
		"Formes/F_Solide.js",
		"Formes/F_Fraction.js",
		"Formes/F_Diagramme.js",
		"Formes/F_Obj_Circle.js",
		"Formes/F_Obj_Courbe.js",
		"Formes/F_Obj_Line.js",
		"Formes/F_Obj_Point.js",
		"Formes/F_Obj_Polygon.js",
		"Formes/F_Obj_Sector.js",
		"Formes/F_Obj_Text.js",
]
for (let s = 0; s < Scripts.length; s++) 
{
    document.write('<script src="' + Scripts[s] + '"></script>')
}