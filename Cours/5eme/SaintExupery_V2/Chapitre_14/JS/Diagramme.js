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
	
    let config4 = {
        "element_id": "cartesien1",
        "width": 400,
        "height": 300,
        "title": "Vitesse de Usain Bolt lors de son record du monde (2009 9.58s)",
        "Haxe_name": "Distance parcourue (m)",
        "Vaxe_name": "Vitesse (m/s)",
        "Hstart": 0,
        "Hpas": 10,
        "Hsection": 10,
        "Hsubsection": 2,
        "Vpas": 2,
        "Vsection": 7,
        "Vsubsection": 2,
        "points": [[0,0], [10, 5.4], [20, 9.8], [30, 11], [40, 11.5], [50, 11.8], [60, 12.2], [70, 12.2], [80, 12.2], [90, 12], [100, 11.1]]
    }
    Create_DiagCartesien(config4);
}