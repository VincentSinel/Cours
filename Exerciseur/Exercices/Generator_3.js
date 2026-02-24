// Théorème de Pythagore sens direct
// 4ème exercice d'application direct
// 3ème figure plus complexe avec informations inutiles (WIP)

function createFigure(classe, rng, data) {
	let w = 300;
	let h = 300;
	let marge = 20
	let figure = new Geometrie(w,h);
	let count_max = 200;

	
	let names = getShuffleLettreArray(rng)

	let p1 = new Vecteur2(marge * 1.5 + (w - 3 * marge) * rng.GetRNG(), marge * 1.5 + (h - 3 * marge) * rng.GetRNG());
	let p2 = new Vecteur2(marge * 1.5 + (w - 3 * marge) * rng.GetRNG(), marge * 1.5 + (h - 3 * marge) * rng.GetRNG());
	while (p1.distanceTo(p2) < 80 && count_max > 0)
	{
		p2 = new Vecteur2(marge * 1.5 + (w - 3 * marge) * rng.GetRNG(), marge * 1.5 + (h - 3 * marge) * rng.GetRNG());
		count_max--;
	}
	let line1 = new Ligne(p1, p2);
	let dir = line1.direction().normal();
	let line2 = (new Ligne(p2, p2.add(dir.mul(20))))
	line2 = line2.toBorder(w, h);
	let p3 = line2.pointIn(rng.GetRNG());
	count_max = 200
	while (p3.distanceTo(p2) < 80 && count_max > 0)
	{
		p3 = line2.pointIn(rng.GetRNG());
		count_max--;
	}

	let ang1 = new Angle(p3,p1,p2);
	let ang2 = new Angle(p1,p2,p3);
	let ang3 = new Angle(p2,p3,p1);
	let dir1 = ang1.bissectrice().mul(-1);
	let dir2 = ang2.bissectrice().mul(-1);
	let dir3 = ang3.bissectrice().mul(-1);

	figure.AjouterAngle(ang2, 0, {right: true, "radius": 10})

	figure.AjouterPolygone([p1, p2, p3], {"hand-drawn":	true});
	figure.AjouterPoint(p1, names[0], {"angle": dir1.angle(), "type": "none"});
	figure.AjouterPoint(p2, names[1], {"angle": dir2.angle(), "type": "none"});
	figure.AjouterPoint(p3, names[2], {"angle": dir3.angle(), "type": "none"});

	line2 = new Ligne(p2, p3)
	let line3 = new Ligne(p3, p1)
	let a = p2.x * p1.y + p3.x * p2.y + p1.x * p3.y
	let b = p1.x * p2.y + p2.x * p3.y + p3.x * p1.y
	let coefdir = a > b ? 1 : -1;

	let txt_ang1 = line1.direction().angle()
	txt_ang1 = Math.abs(txt_ang1) > 90 ? txt_ang1 - Math.sign(txt_ang1) * 180.0 : txt_ang1
	let txt_ang2 = line2.direction().angle()
	txt_ang2 = Math.abs(txt_ang2) > 90 ? txt_ang2 - Math.sign(txt_ang2) * 180.0 : txt_ang2
	let txt_ang3 = line3.direction().angle()
	txt_ang3 = Math.abs(txt_ang3) > 90 ? txt_ang3 - Math.sign(txt_ang3) * 180.0 : txt_ang3

	if (data.inconnue != 0)
		figure.AjouterTexte(line1.middle().add(line1.direction().normal().mul(12 * coefdir)), data.v1 + " cm", {rotate: txt_ang1})
	if (data.inconnue != 1)
		figure.AjouterTexte(line2.middle().add(line2.direction().normal().mul(12 * coefdir)), data.v2 + " cm", {rotate: txt_ang2})
	if (data.inconnue != 2)
		figure.AjouterTexte(line3.middle().add(line3.direction().normal().mul(12 * coefdir)), data.v3 + " cm", {rotate: txt_ang3})

	if (data.correction)
	{
		if (data.inconnue == 0)
			figure.AjouterTexte(line1.middle().add(line1.direction().normal().mul(12 * coefdir)), data.v1 + " cm", {rotate: txt_ang1, attr: {fill: "red"}})
		if (data.inconnue == 1)
			figure.AjouterTexte(line2.middle().add(line2.direction().normal().mul(12 * coefdir)), data.v2 + " cm", {rotate: txt_ang2, attr: {fill: "red"}})
		if (data.inconnue == 2)
			figure.AjouterTexte(line3.middle().add(line3.direction().normal().mul(12 * coefdir)), data.v3 + " cm", {rotate: txt_ang3, attr: {fill: "red"}})
	}

	figure.AjusterZoneDessin()


	return figure
}

generators.push((classe) => {

	let rng = new RNG()
	

  let triplet = [[3, 4, 5],[5, 12, 13],[8, 15, 17],[7, 24, 25],[20, 21, 29],[12, 35, 37],[9, 40, 41],[28, 45, 53],[11, 60, 61],[16, 63, 65],[33, 56, 65],[48, 55, 73],[13, 84, 85],[36, 77, 85],[39, 80, 89],[65, 72, 97]][Math.floor(Math.random() * 16)]
	let coef = 0.5 + Math.floor(Math.random() * 20) / 10.0
	let inconnue = Math.floor(Math.random() * 3)
	let n = [0,1,2]
	n.splice(inconnue, 1);

	let v1 = float_round(coef * triplet[0])
	let v2 = float_round(coef * triplet[1])
	let v3 = float_round(coef * triplet[2])

	let data = {inconnue: inconnue, v1: v1, v2: v2, v3: v3, correction: false}
	
	
	var exercice = document.createElement("div");
	{
		let content = document.createElement("div");
		content.classList.add("flexobject")
		exercice.appendChild(content);
		let fig = createFigure(classe, rng, data);
		content.appendChild(fig.GetElement());
		rng.Reset()
		let names = getShuffleLettreArray(rng)
		let segment = [names[0] + names[1], names[1] + names[2], names[2] + names[0]]
		let txt = document.createElement("div");
		content.appendChild(txt);

		let p1 = document.createElement("p")
		txt.appendChild(p1)
		p1.innerText = `Dans le triangle ${names[0] + names[1] + names[2]}, on a :`
		
		let ul = document.createElement("ul")
		txt.appendChild(ul)
		let li1 = document.createElement("li")
		ul.appendChild(li1)
		li1.innerText = "$" + segment[n[0]] + "=" + ([v1, v2, v3][n[0]]).toString() + "\\ cm$";
		let li2 = document.createElement("li")
		ul.appendChild(li2)
		li2.innerText = "$" + segment[n[1]] + "=" + ([v1, v2, v3][n[1]]).toString() + "\\ cm$";

		let p2 = document.createElement("p")
		txt.appendChild(p2)
		p2.innerText = `Calculer la longueur de [${segment[inconnue]}].`
	}

	var correction = document.createElement("div");
	{
		data.correction = true
		let content = document.createElement("div");
		content.classList.add("flexobject")
		correction.appendChild(content);
		rng.Reset()
		let fig = createFigure(classe, rng, data);
		content.appendChild(fig.GetElement());
		
		rng.Reset()
		let names = getShuffleLettreArray(rng)
		let segment = [names[0] + names[1], names[1] + names[2], names[0] + names[2]]
		let txt = document.createElement("div");
		content.appendChild(txt);

		let p1 = document.createElement("p")
		txt.appendChild(p1)
		p1.innerText = `Dans le triangle ${names[0] + names[1] + names[2]}, on a :`
		
		let ul = document.createElement("ul")
		txt.appendChild(ul)
		let li1 = document.createElement("li")
		ul.appendChild(li1)
		li1.innerText = "$" + segment[n[0]] + "=" + ([v1, v2, v3][n[0]]).toString() + "\\ cm$";
		let li2 = document.createElement("li")
		ul.appendChild(li2)
		li2.innerText = "$" + segment[n[1]] + "=" + ([v1, v2, v3][n[1]]).toString() + "\\ cm$";

		let p2 = document.createElement("p")
		txt.appendChild(p2)
		p2.innerText = `Calculer la longueur de [${segment[inconnue]}].`

		let p3 = document.createElement("p")
		p3.classList.add("correction")
		txt.append(p3)
		let txt_correction = `Dans le triangle ${names[0] + names[1] + names[2]} rectangle en ${names[1]},<br>d'après le théorème de Pythagore on a : <br>` + 
		 `$ {${segment[2]}}^2 = {${segment[0]}}^2 + {${segment[1]}}^2$ <br>` + 
		 `Donc <br>`
		if (inconnue == 0)
		{
			txt_correction += `$ {${v3}}^2 = {${segment[0]}}^2 + {${v2}}^2$ <br>` +
		 `$ ${float_round(Math.pow(v3, 2))} = { ${segment[0]} }^2 + ${float_round(Math.pow(v2, 2))}$ <br>` +
		 `$ {${segment[0]}}^2 = ${float_round(Math.pow(v3, 2) - Math.pow(v2, 2))}$ <br>` +
		 `Donc $ ${segment[0]} = \\sqrt{ ${float_round(Math.pow(v3, 2) - Math.pow(v2, 2))} } = ${v1} \\ cm$ <br>`
		}
		else if (inconnue == 1)
		{
			txt_correction += `$ {${ v3 }}^2 = {${ v1 }}^2 + {${ segment[1] }}^2$ <br>` + 
		 `$ ${ float_round( Math.pow(v3, 2) )} = ${ float_round( Math.pow(v1, 2) ) } + {${ segment[1] }}^2$ <br>` +
		 `$ {${ segment[1] }}^2 = ${ float_round( Math.pow(v3, 2) - Math.pow(v1, 2) ) }$ <br>` +
		 `Donc $ ${ segment[1] } = \\sqrt{ ${ float_round( Math.pow(v3, 2) - Math.pow(v1, 2) ) } } = ${ v2 } \\ cm$ <br>`
		}
		else
		{
		 txt_correction += `$ {${segment[2]}}^2 = {${v1}}^2 + {${v2}}^2$ <br>` +
		 `$ {${segment[2]}}^2 = ${float_round(Math.pow(v1, 2))} + ${float_round(Math.pow(v2, 2))}$ <br>` +
		 `$ {${segment[2]}}^2 = ${float_round(Math.pow(v1, 2) + Math.pow(v2, 2))}$ <br>` +
		 `Donc $ ${segment[2]} = \\sqrt{ ${float_round(Math.pow(v1, 2) + Math.pow(v2, 2))} } = ${v3} \\ cm$ <br>`
		}
		p3.innerHTML = txt_correction
	}

	return { exercice: exercice, correction: correction };
})