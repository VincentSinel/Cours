function CreateDiagrammes()
{
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

    let config2 = {
        "element_id": "baton2",
        "width": 600,
        "height": 300,
        "max_eff": 1500,
        "title": "Puissance électrique en mégawatt (MW) produite par de nouvelles éoliennes chaque année en France.",
		"bar": 11,
        "pas": 300,
        "effectifs": [48, 504, 782, 1081, 1247, 1190, 950, 822, 621, 963, 999],
        "etiquettes": ["2000", "2005", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"],
        "show_value_bar": true,
		"etiq_offset_y": 0,
		"etiq_offset_x": 0,
		"etiq_offset_angle": 0,
		"margin_down": 30,
        "Vaxe_name": "Puissance (en MW)",
        "Haxe_name": "Année",
        "margin_left": 20,
    }
    Create_DiagBaton(config2);
	
    let config3 = {
        "element_id": "circulaire1",
        "width": 400,
        "height": 300,
        "title": "Population en fonction du continent",
        "effectifs": [4722635000, 1426736000, 1037140000, 743556000, 45039000],
        "etiquettes": ["Asie", "Afrique", "Amérique", "Europe", "Océanie"]
    }
    Create_DiagCirculaire(config3);
}