function CreateDiagrammes()
{
	
    let config1 = {
        "element_id": "Diagramme1",
        "width": 400,
        "height": 300,
        "title": "Nombre d'élève en fonction de l'age",
        "effectifs": [4, 8 , 10, 2],
        "etiquettes": ["10 ans", "11 ans", "12 ans", "13 ans"],
        "colors": ["#e60049FF", "#FFFFFFFF", "#FFFFFFFF", "#FFFFFFFF"],
        "border": true
    }
    Create_DiagCirculaire(config1);
	
    let config2 = {
        "element_id": "circulaire1",
        "width": 400,
        "height": 300,
        "title": "Population en fonction du continent",
        "effectifs": [4722635000, 1426736000, 1037140000, 743556000, 45039000],
        "etiquettes": ["Asie", "Afrique", "Amérique", "Europe", "Océanie"]
    }
    Create_DiagCirculaire(config2);
	
}