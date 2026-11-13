function CreateDiagrammes()
{
    let config_act1 = {
        "element_id": "act1",
        "width": 400,
        "height": 300,
        "title": "Prix d'amandes en fonction de la masse",
        "Haxe_name": "Masse (g)",
        "Vaxe_name": "Prix (€)",
        "Hstart": 0,
        "Hpas": 100,
        "Hsection": 5,
        "Hsubsection": 0,
        "Vpas": 1,
        "Vsection": 8,
        "Vsubsection": 2,
        "points": [[0,0], [100, 1.5], [300, 4.5], [500, 7.5]]
    }
    Create_DiagCartesien(config_act1);
    
    let config_act2 = {
        "element_id": "act2",
        "width": 400,
        "height": 300,
        "title": "Prix d'une pizza en fonction du nombre d'ingrédient supplémentaire",
        "Haxe_name": "Masse (g)",
        "Vaxe_name": "Prix (€)",
        "Hstart": 0,
        "Hpas": 1,
        "Hsection": 3,
        "Hsubsection": 0,
        "Vpas": 2,
        "Vsection": 9,
        "Vsubsection": 4,
        "points": [[0,12], [1, 13.5], [2, 15], [3, 16.5]]
    }
    Create_DiagCartesien(config_act2);

    let config_act3 = {
        "element_id": "act3",
        "width": 400,
        "height": 300,
        "title": "Population de bactérie fonction du temps",
        "Haxe_name": "Temps (h)",
        "Vaxe_name": "Population",
        "Hstart": 0,
        "Hpas": 1,
        "Hsection": 3,
        "Hsubsection": 0,
        "Vpas": 40,
        "Vsection": 5,
        "Vsubsection": 2,
        "points": [[0,20], [1, 40], [2, 80], [3, 160]]
    }
    Create_DiagCartesien(config_act3);


    let config1 = {
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
    Create_DiagCartesien(config1);

    let config2 = {
        "element_id": "cartesien2",
        "width": 400,
        "height": 300,
        "title": "Résultat du programme de calcul en fonction du nombre de départ",
        "Haxe_name": "Valeur de départ",
        "Vaxe_name": "Résultat",
        "Hstart": 0,
        "Hpas": 1,
        "Hsection": 5,
        "Hsubsection": 0,
        "Vpas": 1,
        "Vsection": 4,
        "Vsubsection": 2,
        "points": [[0,1.5], [1, 2], [2, 2.5], [3, 3], [4, 3.5], [5, 4]]
    }
    Create_DiagCartesien(config2);

    let config3 = {
        "element_id": "cartesien3",
        "width": 400,
        "height": 300,
        "title": "Prix de pommes en fonction de la masse",
        "Haxe_name": "Masse (kg)",
        "Vaxe_name": "Prix (€)",
        "Hstart": 0,
        "Hpas": 1,
        "Hsection": 10,
        "Hsubsection": 0,
        "Vpas": 1,
        "Vsection": 14,
        "Vsubsection": 5,
        "points": [[0,0], [1, 1.4], [2, 2.8], [5, 7], [7.5, 10.5], [10, 14]]
    }
    Create_DiagCartesien(config3);
}