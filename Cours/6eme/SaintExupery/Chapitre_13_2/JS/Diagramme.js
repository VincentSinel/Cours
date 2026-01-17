function CreateDiagrammes()
{
	
    let config3 = {
        "element_id": "baton1",
        "width": 400,
        "height": 300,
        // "intervalle": 5,
        "max_eff": 90,
        "title": "Population de la france et de ces pays frontaliers",
		"bar": 8,
        "effectifs": [83, 11, 47, 67, 60, 1, 67, 9],
        "etiquettes": ["Allemagne", "Belgique", "Espagne", "France", "Italie", "Luxembourg", "Royaume-Uni", "Suisse"],
		"etiq_offset_y": 20,
		"etiq_offset_x": -10,
		"etiq_offset_angle": 45,
		"margin_down": 30,
    }
    Create_DiagBaton(config3);
	
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
	
    let config6 = {
        "element_id": "circulaire1",
        "width": 400,
        "height": 300,
        "title": "Population en fonction du continent",
        "effectifs": [4722635000, 1426736000, 1037140000, 743556000, 45039000],
        "etiquettes": ["Asie", "Afrique", "Amérique", "Europe", "Océanie"]
    }
    Create_DiagCirculaire(config6);
	
}