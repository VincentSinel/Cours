// Figure avec droite demi-droite et segments.
// 5 points A, B, C, D et E.
// E non nommé
// Cite deux droites sécantes.
// Nommer E le point d'intersection de $(d_1)$ et $(d_2)$.
// Que peut-on dire des points B, D et C ?.
// Repasser en bleu [BD].
// Repasser en vert [AC).

function CreateObjects() {

	let A = new Vecteur2(50 + Math.round(Math.random() * 300), 50 + Math.round(Math.random() * 300));
	let B = new Vecteur2(50 + Math.round(Math.random() * 300), 50 + Math.round(Math.random() * 300));
	while (A.distanceTo(B) < 50) {
		B = new Vecteur2(50 + Math.round(Math.random() * 300), 50 + Math.round(Math.random() * 300));
	}
	let D = new Vecteur2(50 + Math.round(Math.random() * 300), 50 + Math.round(Math.random() * 300));
	while (D.distanceTo(A) < 50 || D.distanceTo(B) < 50) {
		D = new Vecteur2(50 + Math.round(Math.random() * 300), 50 + Math.round(Math.random() * 300));
	}
	let F = new Vecteur2(50 + Math.round(Math.random() * 300), 50 + Math.round(Math.random() * 300));
	while (F.distanceTo(A) < 50 || F.distanceTo(B) < 50 || F.distanceTo(D) < 50) {
		F = new Vecteur2(50 + Math.round(Math.random() * 300), 50 + Math.round(Math.random() * 300));
	}

	let AD = new Ligne(A, D);
	let temp = AD.toBorder(400, 400)
	let E = temp.pointIn(0.2 + 0.6 * Math.random());
	while (E.distanceTo(A) < 20 || E.distanceTo(D) < 20 || E.distanceTo(B) < 20) {
		E = temp.pointIn(0.2 + 0.6 * Math.random());
	}
	let BD = new Ligne(B, D);
	let BE = new Ligne(B, E);
	let AF = new Ligne(A, F);

	temp = BD.toBorder(400, 400)
	let C = temp.pointIn(0.2 + 0.6 * Math.random());
	while (C.distanceTo(A) < 20 || C.distanceTo(D) < 20 || C.distanceTo(B) < 20) {
		C = temp.pointIn(0.2 + 0.6 * Math.random());
	}
	let AC = new Ligne(A, C);
	
	let objects = {
		"points": [A, B, C, D, E, F],
		"points_position": [180 * (1 - Math.random() * 2.0), 180 * (1 - Math.random() * 2.0), 180 * (1 - Math.random() * 2.0), 180 * (1 - Math.random() * 2.0)],
		"lines": [AD, BD, BE, AF, AC, ]
	}

	return objects;
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}


function CreateFigure(point_name, line_name, objects) 
{
	let figure = new Geometrie(400,400);

	figure.AjouterPoint(objects["points"][0], point_name[0], {"angle": objects["points_position"][0]});
	figure.AjouterPoint(objects["points"][1], point_name[1], {"angle": objects["points_position"][1]});
	figure.AjouterPoint(objects["points"][2], point_name[2], {"angle": objects["points_position"][2]});
	figure.AjouterPoint(objects["points"][3], point_name[3], {"angle": objects["points_position"][3]});

	figure.AjouterDroite(objects["lines"][0], {nom:line_name[0], "nom-attr": {attr:{"font-style": "italic"}}})
	figure.AjouterDroite(objects["lines"][1], {nom:line_name[2], "nom-attr": {attr:{"font-style": "italic"}}})
	figure.AjouterDroite(objects["lines"][2], {nom:line_name[1], "nom-position": 1, "nom-attr": {attr:{"font-style": "italic"}}})
	figure.AjouterDroite(objects["lines"][3], {nom:line_name[3], "nom-position": 1, "nom-attr": {attr:{"font-style": "italic"}}})
	figure.AjouterDemiDroite(objects["lines"][4]);
	return figure
}

function CreateFigure_correction(point_name, line_name, objects)
{
	let figure = new Geometrie(400,400);

	figure.AjouterPoint(objects["points"][0], point_name[0], {"angle": objects["points_position"][0]});
	figure.AjouterPoint(objects["points"][1], point_name[1], {"angle": objects["points_position"][1]});
	figure.AjouterPoint(objects["points"][2], point_name[2], {"angle": objects["points_position"][2]});
	figure.AjouterPoint(objects["points"][3], point_name[3], {"angle": objects["points_position"][3]});
	figure.AjouterPoint(objects["points"][4], point_name[4], {"angle": 180 * (1 - Math.random() * 2.0), "attr": {"stroke": "red"}, "attr-text": {"fill": "red"}});

	figure.AjouterDroite(objects["lines"][0], {nom:line_name[0], "nom-attr": {attr:{"font-style": "italic"}}})
	figure.AjouterDroite(objects["lines"][1], {nom:line_name[2], "nom-attr": {attr:{"font-style": "italic"}}})
	figure.AjouterDroite(objects["lines"][2], {nom:line_name[1], "nom-position": 1, "nom-attr": {attr:{"font-style": "italic"}}})
	figure.AjouterDroite(objects["lines"][3], {nom:line_name[3], "nom-position": 1, "nom-attr": {attr:{"font-style": "italic"}}})
	figure.AjouterDemiDroite(objects["lines"][4], {"attr": {"stroke": "lime", "stroke-width": 4}});
	figure.AjouterSegment(objects["lines"][1], {"attr": {"stroke": "blue", "stroke-width": 4}});
	return figure
}



generators.push((classe) => {

	
	let point_name = ["A", "B", "C", "D", "E"];
	let line_name = ["(d1)", "(d2)", "(d3)", "(d4)"];
	shuffleArray(point_name);
	shuffleArray(line_name);

	let objects = CreateObjects();
	{
		let fig = CreateFigure(point_name, line_name, objects);
		var exercice = document.createElement("div");
		let content = document.createElement("div");
		content.classList.add("flexobject")
		let txt = document.createElement("div");
		txt.classList.add("flexstretch")
		let ol = document.createElement("ol");
		let li1 = document.createElement("li");
		li1.innerHTML = `Citer deux droites sécantes.`;
		let li2 = document.createElement("li");
		li2.innerHTML = `Nommer ${point_name[4]} le point d'intersection de $${line_name[0]}$ et $${line_name[1]}$.`;
		let li3 = document.createElement("li");
		li3.innerHTML = `Que peut-on dire des points ${point_name[1]}, ${point_name[2]} et ${point_name[3]} ?`;
		let li4 = document.createElement("li");
		li4.innerHTML = `Repasser en bleu le segment $[${point_name[1]}${point_name[3]}]$.`;
		let li5 = document.createElement("li");
		li5.innerHTML = `Repasser en vert la demi-droite $[${point_name[0]}${point_name[2]})$.`;
		ol.appendChild(li1);
		ol.appendChild(li2);
		ol.appendChild(li3);
		ol.appendChild(li4);
		ol.appendChild(li5);
		txt.appendChild(ol);
		content.appendChild(fig.GetElement());
		content.appendChild(txt);
		exercice.appendChild(content);
	}

	{
		let fig_correction = CreateFigure_correction(point_name, line_name, objects);
		var correction = document.createElement("div");
		let corr_content = document.createElement("div");
		corr_content.classList.add("flexobject")
		let corr_txt = document.createElement("div");
		corr_txt.classList.add("flexstretch")
		let corr_ol = document.createElement("ol");
		let li1 = document.createElement("li");
		li1.innerHTML = `Citer deux droites sécantes.`; li1.appendChild(document.createElement("br"));
		let co1 = document.createElement("span"); co1.classList.add("correction");
		co1.innerHTML = `Par exemple $${line_name[0]}$ et $${line_name[1]}$.`;
		li1.appendChild(co1);
		let li2 = document.createElement("li");
		li2.innerHTML = `Nommer ${point_name[4]} le point d'intersection de $${line_name[0]}$ et $${line_name[1]}$.`;
		let li3 = document.createElement("li");
		li3.innerHTML = `Que peut-on dire des points ${point_name[1]}, ${point_name[2]} et ${point_name[3]} ?`; li3.appendChild(document.createElement("br"));
		let co3 = document.createElement("span"); co3.classList.add("correction");
		co3.innerHTML = `Les points ${point_name[1]}, ${point_name[2]} et ${point_name[3]} sont <b>alignés</b>.`;
		li3.appendChild(co3);
		let li4 = document.createElement("li");
		li4.innerHTML = `Repasser en bleu le segment $[${point_name[1]}${point_name[3]}]$.`;
		let li5 = document.createElement("li");
		li5.innerHTML = `Repasser en vert la demi-droite $[${point_name[0]}${point_name[2]})$.`;
		corr_ol.appendChild(li1);
		corr_ol.appendChild(li2);
		corr_ol.appendChild(li3);
		corr_ol.appendChild(li4);
		corr_ol.appendChild(li5);
		corr_txt.appendChild(corr_ol);
		corr_content.appendChild(fig_correction.GetElement());
		corr_content.appendChild(corr_txt);
		correction.appendChild(corr_content);
	}

	return { exercice: exercice, correction: correction };
})
