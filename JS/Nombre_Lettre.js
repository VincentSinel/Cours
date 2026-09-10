const unité = ["", "et-un","deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"]
const dizaine = ["", "dix", "vingt","trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"]

function EnLettre(valeur)
{
	if (valeur > 999_999_999_999)
		return "Le nombre est trop grand";
	if (valeur < 0)
		return "Le nombre doit être positif";
	if (valeur != Math.floor(valeur))
		return "Le nombre doit être un entier";

	let groupe_milliards = Math.floor(valeur / 1_000_000_000)
	let groupe_millions = Math.floor(valeur / 1_000_000) % 1_000
	let groupe_mille = Math.floor(valeur / 1_000) % 1_000
	let groupe_unite = valeur % 1_000

	result = "";
	if (groupe_milliards != 0)
		result += PartLettre(groupe_milliards) + "-milliard" + (groupe_milliards > 1 ? "s" : "");
	if (groupe_millions != 0)
		result += "-" + PartLettre(groupe_millions) + "-million" + (groupe_millions > 1 ? "s" : "");
	if (groupe_mille != 0)
		result += "-" + PartLettre(groupe_mille, true) + "-mille";
	result += "-" + PartLettre(groupe_unite)
	while (result.startsWith("-"))
		result = result.substring(1);

	return result;
}

function PartLettre(part, mille = false)
{
	if (part == 0) return "zéro"
	if (part == 1) return "un"

	let c = Math.floor(part / 100);
	let d = Math.floor(part / 10) % 10;
	let u = part % 10;

	let result = "";
	if (c == 1) result = "cent"
	if (c > 1) result = unité[c] + "-cent" + (d == 0 && u == 0 && !mille ? "s" : "")
	if (d == 0)
	{
		if (u == 0) return result
		if (u == 1) return result + "-un" 
		if (u > 1) return result + "-" + unité[u] 
	}
	if (d == 1)
	{
		if (u == 0) return result + "-dix"
		if (u == 1) return result + "-onze"

		if (u == 2) return result + "-douze"
		if (u == 3) return result + "-treize"
		if (u == 4) return result + "-quatorze"
		if (u == 5) return result + "-quinze"
		if (u == 6) return result + "-seize"
		if (u == 7) return result + "-dix-sept"
		if (u == 8) return result + "-dix-huit"
		if (u == 9) return result + "-dix-neuf"
	}
	if (d < 7)
	{
		if (u == 0) return result + "-" + dizaine[d]
		if (u > 0) return result + "-" + dizaine[d] + "-" + unité[u]
	}
	if (d == 7)
	{
		if (u == 0) return result + "-soixante-dix"
		if (u == 1) return result + "-soixante-et-onze"
		if (u == 2) return result + "-soixante-douze"
		if (u == 3) return result + "-soixante-treize"
		if (u == 4) return result + "-soixante-quatorze"
		if (u == 5) return result + "-soixante-quinze"
		if (u == 6) return result + "-soixante-seize"
		if (u == 7) return result + "-soixante-dix-sept"
		if (u == 8) return result + "-soixante-dix-huit"
		if (u == 9) return result + "-soixante-dix-neuf"
	}
	if (d == 8)
	{
		if (u == 0) return result + "-quatre-vingt" + (mille ? "" : "s")
		if (u == 1) return result + "-quatre-vingt-un"
		if (u > 1) return result + "-quatre-vingt-" + unité[u]
	}
	if (d == 9)
	{
		if (u == 0) return result + "-quatre-vingt-dix"
		if (u == 1) return result + "-quatre-vingt-onze"
		if (u == 2) return result + "-quatre-vingt-douze"
		if (u == 3) return result + "-quatre-vingt-treize"
		if (u == 4) return result + "-quatre-vingt-quatorze"
		if (u == 5) return result + "-quatre-vingt-quinze"
		if (u == 6) return result + "-quatre-vingt-seize"
		if (u == 7) return result + "-quatre-vingt-dix-sept"
		if (u == 8) return result + "-quatre-vingt-dix-huit"
		if (u == 9) return result + "-quatre-vingt-dix-neuf"
	}
	return result;
}

