function CreateDiagrammes()
{
    let config1 = {
        "element_id": "diagramme",
        "width": 400,
        "height": 300,
        "intervalle": 5,
        "start": 28,
        "pas": 2,
        "max_eff": 18,
        "title": "histogramme",
        "Haxe_name": "Calibre (mm)",
        "effectifs": [4],
    }
    // Create_Histogramme(config1);

    let config2 = {
        "element_id": "diagramme_baton",
        "width": 400,
        "height": 300,
        "title": "Vitesse relevée (km/h)",
		"etiq_offset_y": 15,
		"etiq_offset_x": -5,
		"etiq_offset_angle": 45,
        "max_eff": 20,
		"bar": 10,
        "effectifs": [3, 14, 19, 14, 6, 13, 7, 12, 15, 17],
        "etiquettes": ["72 km/h", "75 km/h", "77 km/h", "78 km/h", "79 km/h", "82 km/h", "86 km/h", 
        "90 km/h", "91 km/h", "97 km/h"],
		
    }
    Create_DiagBaton(config2);
	
    let config3 = {
        "element_id": "diagramme_circulaire",
        "width": 400,
        "height": 300,
        "title": "diagramme_circulaire",
    }
    // Create_DiagCirculaire(config3);
	
    let config4 = {
        "element_id": "diagramme_cartesien",
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
    // Create_DiagCartesien(config4);
}