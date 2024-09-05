function CreateDiagrammes()
{
    let config1 = {
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
    Create_Histogramme(config1);
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
    let config3 = {
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
    Create_Histogramme(config3);
}