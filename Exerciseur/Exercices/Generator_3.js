// Exemple d'un générateur d'exercice


generators.push((classe) => {
	var exercice = document.createElement("div");
	exercice.innerHTML = "exercice 3"
	var correction = document.createElement("div");

	return { exercice: exercice, correction: correction };
})