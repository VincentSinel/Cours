function CreateDiagrammes()
{
    let config5 = {
        "element_id": "diagintro",
        "width": 400,
        "height": 300,
        "intervalle": 5,
        "start": 28,
        "pas": 2,
        "max_eff": 18,
        "title": "Effectif en fonction du calibre",
        "Haxe_name": "Calibre (mm)",
        "effectifs": [4],
    }
    Create_Histogramme(config5);
    let config1 = {
        "element_id": "baton1",
        "width": 400,
        "height": 300,
        "max_eff": 12,
        "title": "Effectifs des élèves en fonction du nombre de frères ou soeurs",
		"bar": 5,
        "effectifs": [5, 9, 10, 3, 2],
        "etiquettes": ["0", "1", "2", "3", "plus de 3"],
		"etiq_offset_y": 0,
		"etiq_offset_x": 0,
		"etiq_offset_angle": 0,
		"margin_down": 30,
    }
    Create_DiagBaton(config1);
	
    let config3 = {
        "element_id": "circulaire1",
        "width": 400,
        "height": 300,
        "title": "Population en fonction du continent",
        "effectifs": [4722635000, 1426736000, 1037140000, 743556000, 45039000],
        "etiquettes": ["Asie", "Afrique", "Amérique", "Europe", "Océanie"]
    }
    Create_DiagCirculaire(config3);
    let config2 = {
        "element_id": "diagexemple1",
        "width": 400,
        "height": 300,
        "intervalle": 3,
        "start": 145,
        "pas": 5,
        "max_eff": 13,
        "title": "Répartition de la taille des élèves",
        "Haxe_name": "Taille (cm)",
        "effectifs": [9,12,7],
    }
    Create_Histogramme(config2);
    let config4 = {
        "element_id": "diagexemple2",
        "width": 400,
        "height": 300,
        "intervalle": 5,
        "start": 0,
        "pas": 30,
        "max_eff": 12,
        "title": "Quantité de SMS envoyé par jour",
        "Haxe_name": "SMS",
        "effectifs": [2,6,10,5,1],
    }
    Create_Histogramme(config4);
}