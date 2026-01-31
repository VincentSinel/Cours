// Conversion d'un programme de calcul en expression littérale
// 5eme : 2 opérations différentes
// 4eme : 3 opérations différentes dont potentiellement un carré
// 3eme : 2 branches de calculs avec 2 opérations + un produit

var SelectedClasse;

function createExo()
{
	let data = {};

	let random = 0;
	if (SelectedClasse == "3eme")
		random = Math.floor(Math.random() * 3);
	else if (SelectedClasse == "4eme")
		random = Math.floor(Math.random() * 2);

	if (SelectedClasse == "5eme" || random == 0)
	{
		let done = []
		
		function getRandomOperation(done)
		{
			let operation = ["+", "-", "x"];
			let op = "";
			while (op == "" || done.includes(op))
				op = operation[Math.floor(Math.random() * operation.length)];
			done.push(op);
			let num;
			if (op == "x")
				num = Math.floor(Math.random() * 10) + 2;
			else
				num = Math.floor(Math.random() * 20) + 1;
			return { op: op, num: num, rng: Math.random() };
		}

		data = {
			calcul1: getRandomOperation(done),
			calcul2: getRandomOperation(done),
		};
	}
	else if (SelectedClasse == "4eme" || random == 1)
	{
		let done = []
		
		function getRandomOperation(done, canx = true)
		{
			let operation = ["+", "-", "x", "²"];
			let op = "";
			while (op == "" || done.includes(op))
				op = operation[Math.floor(Math.random() * operation.length)];
			done.push(op);
			let num;
			if (op == "x" || op == "²")
				num = (Math.floor(Math.random() * 10) + 2) * (Math.random() > 0.5 ? 1 : -1);
			else
			{
				let x = Math.random() > 0.75 ? true : false;
				num = (x && canx) ? "step0" : Math.floor(Math.random() * 20) + 1;
			}
			return { op: op, num: num, rng: Math.random() };
		}


		if (Math.random() > 0.5)
		{
			data = {
				calcul1: getRandomOperation(done),
				calcul2: getRandomOperation(done),
				calcul3: getRandomOperation(done),
			};
		}
		else
		{
			done = ["²"]
			let a1 = getRandomOperation(done, false);
			a1.coef = a1.num; a1.num = "step0";
			let a2 = getRandomOperation(done, false);
			a2.coef = a2.num; a2.num = "step0";
			data = {
				calcul1: a1,
				calcul2: a2,
				calcul3: {op: "+", num: "step1", coef: "step2", rng: Math.random()},
			}
		}
	}
	else if (SelectedClasse == "3eme")
	{
		let done = []
		
		function getRandomOperation(done)
		{
			let operation = ["+", "-", "x", "²"];
			let op = "";
			while (op == "" || done.includes(op))
				op = operation[Math.floor(Math.random() * operation.length)];
			done.push(op);
			let num;
			if (op == "x")
				num = (Math.floor(Math.random() * 10) + 2) * (Math.random() > 0.5 ? 1 : -1);
			else
				num = Math.floor(Math.random() * 20) + 1;
			return { op: op, num: num, rng: Math.random() };
		}

		let a1 = getRandomOperation(done);
		a1.coef = a1.num; a1.num = "step0";
		if (a1.op == "x" || a1.op == "²")
			done = ["x", "²"]
		let a2 = getRandomOperation(done);
		a2.coef = a2.num; a2.num = "step0";
		data = {
			calcul1: a1,
			calcul2: a2,
			calcul3: {op: "x", num: "step1", coef: "step2", rng: Math.random()},
		}
	}

	return data;
}


function createStepText(data)
{
		// let txt = "";

		if (data.num.toString().startsWith("step"))
		{
			let step_1 = parseInt(data.num.replace("step", ""));
			if (data.hasOwnProperty("coef")) // Modification d'une autre étape
			{
				if (data.coef.toString().startsWith("step")) // Prise en compte de deux étapes
				{
					let step_2 = parseInt(data.coef.replace("step", ""));
					switch(data.op)
					{
						case "+":
							return [
								`Ajouter le résultat de l'étape ${step_1 + 1} et le résultat de l'étape ${step_2 + 1}.`,
								`Additionner le résultat de l'étape ${step_1 + 1} et le résultat de l'étape ${step_2 + 1}.`,
							][Math.floor(data.rng * 2)];
						case "-":
							return [
								`Soustraire au résultat de l'étape ${step_1 + 1}, le résultat de l'étape ${step_2 + 1}.`,
								`Retirer au résultat de l'étape ${step_1 + 1}, le résultat de l'étape ${step_2 + 1}.`,
								`Retrancher au résultat de l'étape ${step_1 + 1}, le résultat de l'étape ${step_2 + 1}.`,
							][Math.floor(data.rng * 3)];
						case "x":
							return [
								`Multiplier le résultats de l'étape ${step_1 + 1} et le résultat de l'étape ${step_2 + 1}.`,
								`Faire le produit le résultats de l'étape ${step_1 + 1} et le résultat de l'étape ${step_2 + 1}.`,
							][Math.floor(data.rng * 2)];
					}
				}
				else	// Prise en compte d'une seul étape
				{
					if (step_1 == 0) // Etape de départ
					{
						switch(data.op)
						{
							case "+":
								return [
									`Ajouter ${data.coef} au nombre de départ.`,
									`Additionner ${data.coef} au nombre de départ.`,
								][Math.floor(data.rng * 2)];
							case "-":
								return [
									`Soustraire ${data.coef} au nombre de départ.`,
									`Retirer ${data.coef} au nombre de départ.`,
									`Retrancher ${data.coef} au nombre de départ.`,
								][Math.floor(data.rng * 3)];
							case "x":
								return `Multiplier le nombre de départ par ${data.coef}.`
							case "²":
								return `Mettre le nombre de départ au carré.`
						}
					}
					else // Autre étape
					{
						switch(data.op)
						{
							case "+":
								return [
									`Ajouter ${data.coef} au résultat de l'étape ${step_1 + 1}.`,
									`Additionner ${data.coef} au résultat de l'étape ${step_1 + 1}.`,
								][Math.floor(data.rng * 2)];
							case "-":
								return [
									`Soustraire ${data.coef} au résultat de l'étape ${step_1 + 1}.`,
									`Retirer ${data.coef} au résultat de l'étape ${step_1 + 1}.`,
									`Retrancher ${data.coef} au résultat de l'étape ${step_1 + 1}.`,
								][Math.floor(data.rng * 3)];
							case "x":
								return `Multiplier le résultat de l'étape ${step_1 + 1} par ${data.coef}.`
							case "²":
								return `Mettre le résultat de l'étape ${step_1 + 1} au carré.`
						}
					}
				}
			}
			else // Modification de l'étape actuel
			{
				if (step_1 == 0) // Etape de départ
				{
					switch(data.op)
					{
						case "+":
							return [
								`Ajouter le nombre de départ.`,
								`Additionner le nombre de départ.`,
							][Math.floor(data.rng * 2)];
						case "-":
							return [
								`Soustraire le nombre de départ.`,
								`Retirer le nombre de départ.`,
								`Retrancher le nombre de départ.`,
							][Math.floor(data.rng * 3)];
						case "x":
							return `Multiplier par le nombre de départ.`
					}
				}
				else // Autre étape
				{
					switch(data.op)
					{
						case "+":
							return [
								`Ajouter le résultat de l'étape ${step_1 + 1}.`,
								`Additionner le résultat de l'étape ${step_1 + 1}.`,
							][Math.floor(data.rng * 2)];
						case "-":
							return [
								`Soustraire le résultat de l'étape ${step_1 + 1}.`,
								`Retirer le résultat de l'étape ${step_1 + 1}.`,
								`Retrancher le résultat de l'étape ${step_1 + 1}.`,
							][Math.floor(data.rng * 3)];
						case "x":
							return `Multiplier par le résultat de l'étape ${step_1 + 1}.`
					}
				}
			}
		}
		else
		{
				switch(data.op)
				{
					case "+":
						return [
							`Ajouter ${data.num }.`,
							`Additionner ${data.num }.`,
						][Math.floor(data.rng * 2)];
					case "-":
						return [
							`Soustraire ${data.num }.`,
							`Retirer ${data.num }.`,
							`Retrancher ${data.num }.`,
						][Math.floor(data.rng * 3)];
					case "x":
						return `Multiplier par ${data.num }.`
					case "²":
						return `Mettre au carré.`
				}
		}
		return ""
}


function createExerciceHtml(data)
{
	let container = document.createElement("div");
	let intro = document.createElement("p");
	intro.textContent = "Convertir le programme de calcul suivant en une expression littérale :";
	container.appendChild(intro);
	let div = document.createElement("div");
	div.classList.add("program-calcul");
	container.appendChild(div);
	let list = document.createElement("ol");
	let step1 = document.createElement("li");
	step1.textContent = "Choisir un nombre.";
	list.appendChild(step1);


	let id = 1;
	while(data.hasOwnProperty("calcul" + id.toString()))
	{
		let li = document.createElement("li");
		li.textContent = createStepText(data["calcul" + id.toString()]);
		list.appendChild(li);
		id++;
	}

	div.appendChild(list);


	return container;
}


function createCorrectionHtml(data)
{
	let container = document.createElement("div");
	let intro = document.createElement("p");
	intro.textContent = "Convertir le programme de calcul suivant en une expression littérale :";
	container.appendChild(intro);
	let div = document.createElement("div");
	div.classList.add("program-calcul");
	div.classList.add("flexobject");
	container.appendChild(div);
	let list = document.createElement("ol");
	let list_c= document.createElement("ol");
	list_c.classList.add("nodot-list");
	let step1 = document.createElement("li");
	let step1_c = document.createElement("li");
	step1_c.classList.add("correction");
	step1.textContent = "Choisir un nombre.";
	step1_c.textContent = "$x$";	
	list.appendChild(step1);
	list_c.appendChild(step1_c);

	let id = 1;
	while(data.hasOwnProperty("calcul" + id.toString()))
	{
		let li = document.createElement("li");
		li.textContent = createStepText(data["calcul" + id.toString()]);
		let li_c = document.createElement("li");
		li_c.classList.add("correction");
		let exp = computeExpression(data, id).toString()
		let red;
		if (SelectedClasse == "3eme")
			red = computeExpression(data, id).reduire().toString()
		else
			red = computeExpression(data, id).reduire(true).toString()
		if (exp === red)
			li_c.textContent = "$" + exp + "$";
		else
			li_c.textContent = "$" + exp + "=" + red +  "$";
		list.appendChild(li);
		list_c.appendChild(li_c);
		id++;
	}

	div.appendChild(list);
	div.appendChild(list_c);


	return container;
}


function computeExpression(data,id)
{
	let steps = [new ExpressionLitterale([0,1])];
	for (let i = 1; i <= id; i++)
	{
		let current_step = i-1
		let calc_data = data["calcul" + i.toString()]
		let op = calc_data.op;
		let num = calc_data.num;
		let step1;
		let step2 ;

		if (num.toString().startsWith("step"))
		{
			let num_step = parseInt(num.replace("step", ""));
			if (calc_data.hasOwnProperty("coef"))
			{
				let coef = calc_data.coef;
				if (coef.toString().startsWith("step"))
				{
					let coef_step = parseInt(coef.replace("step", ""));
					step1 = steps[num_step]
					step2 = steps[coef_step]
				}
				else
				{
					step1 = steps[num_step]
					step2 = new ExpressionLitterale([coef])
				}
			}
			else
			{
				step1 = steps[current_step]
				step2 = steps[num_step]
			}
		}
		else
		{
			step1 = steps[current_step]
			step2 = new ExpressionLitterale([num])
		}
		let calc;
		if (SelectedClasse == "3eme")
			calc = new CalculExpressionLitterale(step1.reduire(), step2.reduire(), op);
		else
			calc = new CalculExpressionLitterale(step1.reduire(true), step2.reduire(true), op);
		steps.push(calc);
	}

	return steps[steps.length - 1];
}


generators.push((classe) => {

	SelectedClasse = classe
	let data = createExo(classe);

	var exercice = document.createElement("div");
	exercice.appendChild(createExerciceHtml(data))
	var correction = document.createElement("div");
	correction.appendChild(createCorrectionHtml(data))

	return { exercice: exercice, correction: correction };
})