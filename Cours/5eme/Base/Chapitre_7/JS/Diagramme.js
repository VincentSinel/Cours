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