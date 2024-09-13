
function Aleatoire()
{
	document.getElementById("number1").value = (1 + Math.floor(Math.random() * 4)).toString()
	document.getElementById("number2").value = (1 + Math.floor(Math.random() * 6)).toString()
	document.getElementById("number3").value = (1 + Math.floor(Math.random() * 8)).toString()
	document.getElementById("number4").value = (1 + Math.floor(Math.random() * 12)).toString()
	document.getElementById("number5").value = (1 + Math.floor(Math.random() * 20)).toString()
	document.getElementById("number_target").value = (Math.floor(Math.random() * 100)).toString()
	target_time = 180000;
	last_update = Date.now();
	window.requestAnimationFrame(Running);
	document.getElementById("timer").classList.remove("hide")
}

var last_update = 0;
var target_time = 0;
function Running()
{
	target_time += last_update - Date.now()
	let m, s, ms;
	if (target_time <= 0)
	{
		m = 0; s = 0; ms = 0;
	}
	else
	{
		ms = target_time % 1000;
		s = Math.floor(target_time / 1000) % 60;
		m = Math.floor(target_time / 60000) % 60;
	}
	document.getElementById("minute").innerText = m.toString().padStart(2, "0");
	document.getElementById("second").innerText = s.toString().padStart(2, "0");
	document.getElementById("millisecond").innerText = ms.toString().padStart(3, "0");
	last_update = Date.now();
	if (target_time > 0)
		window.requestAnimationFrame(Running);
}

var results

function Resoudre()
{
	results = Solutions()

	RecreateList();

	var panel = document.getElementById("list_solution_panel")
	panel.classList.remove("solutions_hide");

	document.getElementById("timer").classList.add("hide")
	target_time = 0;
}

function DrawResult(negatif)
{
	var div = document.createElement("div");
	div.classList.add("solution");
	var parent = document.getElementById("list_solution")
	parent.innerHTML = "";
	parent.appendChild(div);
	var id = 0;
	results.forEach(result => {
		var local_div = document.createElement("div");
		local_div.classList.add("solution");
		let titre = document.createElement("div");
		titre.innerText = "Solution " + (id + 1).toString();
		local_div.appendChild(titre);
		var add = CreateSolutionDiv(result, local_div, negatif);

		if (add)
		{
			parent.appendChild(local_div);
			id += 1;
		}
	});
	if (id > 0)
	{
		div.innerText = id.toString() +  " coup mathador possible.";
	}
	else
	{
		div.innerText = "Aucun coup mathador possible.";
		return;
	}
}

function RecreateList()
{
	var show_negatif = document.getElementById("list_solution_show").checked;
	DrawResult(show_negatif)

}

function HideSolutionPanel()
{
	var panel = document.getElementById("list_solution_panel")
	panel.classList.add("solutions_hide");
}

function CreateSolutionDiv(solution, parent, negatif)
{
	for (let i = 0; i < 4; i++) 
	{
		let div = document.createElement("div");
		let a = solution[i][0];
		let b = solution[i][2];
		if (!negatif)
		{
			if (a < 0 || b < 0) return false;
		}
		if (solution[i][1] == 0) 
			div.innerText = a.toString() + " + " + b.toString() + " = " + (a + b).toString();
		if (solution[i][1] == 1) 
			div.innerText = a.toString() + " - " + b.toString() + " = " + (a - b).toString();
		if (solution[i][1] == 2) 
			div.innerText = a.toString() + " × " + b.toString() + " = " + (a * b).toString();
		if (solution[i][1] == 3) 
			div.innerText = a.toString() + " ÷ " + b.toString() + " = " + (a / b).toString();
		parent.appendChild(div)
	}
	return true;
}

function Solutions()
{
	var V = [
		parseInt(document.getElementById("number1").value),
		parseInt(document.getElementById("number2").value),
		parseInt(document.getElementById("number3").value),
		parseInt(document.getElementById("number4").value),
		parseInt(document.getElementById("number5").value),
	]
	var cible = parseInt(document.getElementById("number_target").value);

	var solutions = [];
	var usable0 = structuredClone(V);
	for (let i =0; i < 5; i++)
	{
		var solution = [[null,null,null],[null,null,null],[null,null,null]]
		var select1 = usable0[i];
		var usable1 = structuredClone(usable0);
		usable1.splice(i, 1);
		for(let op1 = 0; op1 < 4; op1++)
		{
			for (let j = 0; j < usable1.length; j++) 
			{
				var select2 = usable1[j];
				if (select2 == 0 && op1 == 3) continue; //Division par 0
				if (op1 == 3 && Math.floor(select1 / select2) != select1 / select2) continue; //Fraction
				solution[0] = [select1, op1, select2];
				var usable2 = structuredClone(usable1);
				usable2.splice(j, 1);
				if (op1 == 0) usable2.push(select1 + select2)
				if (op1 == 1) usable2.push(select1 - select2)
				if (op1 == 2) usable2.push(select1 * select2)
				if (op1 == 3) usable2.push(select1 / select2)
				
				for(let op2 = 0; op2 < 4; op2++)
				{
					if (op2 == op1) continue;

					for (let k = 0; k < usable2.length; k++) 
					{
						var select3 = usable2[k];
						var usable3 = structuredClone(usable2);
						usable3.splice(k, 1);
						
						for (let l = 0; l < usable3.length; l++) 
						{
							var select4 = usable3[l];
							if (select4 == 0 && op2 == 3) continue; //Division par 0
							if (op2 == 3 && Math.floor(select3 / select4) != select3 / select4) continue; //Fraction
							solution[1] = [select3, op2, select4];
							var usable4 = structuredClone(usable3);
							usable4.splice(l, 1);
							if (op2 == 0) usable4.push(select3 + select4)
							if (op2 == 1) usable4.push(select3 - select4)
							if (op2 == 2) usable4.push(select3 * select4)
							if (op2 == 3) usable4.push(select3 / select4)
							
							for(let op3 = 0; op3 < 4; op3++)
							{
								if (op3 == op1 || op3 == op2) continue;
			
								for (let m = 0; m < usable4.length; m++) 
								{
									var select5 = usable4[m];
									var usable5 = structuredClone(usable4);
									usable5.splice(m, 1);
									
									for (let n = 0; n < usable5.length; n++) 
									{
										var select6 = usable5[n];
										if (select6 == 0 && op3 == 3) continue; //Division par 0
										if (op3 == 3 && Math.floor(select5 / select6) != select5 / select6) continue; //Fraction
										solution[2] = [select5, op3, select6];
										var usable6 = structuredClone(usable5);
										usable6.splice(n, 1);
										if (op3 == 0) usable6.push(select5 + select6)
										if (op3 == 1) usable6.push(select5 - select6)
										if (op3 == 2) usable6.push(select5 * select6)
										if (op3 == 3) usable6.push(select5 / select6)
										
										for(let op4 = 0; op4 < 4; op4++)
										{
											if (op4 == op1 || op4 == op2 || op4 == op3) continue;
						
											for (let o = 0; o < usable6.length; o++) 
											{
												var select7 = usable6[o];
												var usable7 = structuredClone(usable6);
												usable7.splice(o, 1);
												
												for (let p = 0; p < usable7.length; p++) 
												{
													var select8 = usable7[p];
													if (select8 == 0 && op4 == 3) continue; //Division par 0
													if (op4 == 3 && Math.floor(select7 / select8) != select7 / select8) continue; //Fraction
													solution[3] = [select7, op4, select8];
													var usable8 = structuredClone(usable7);
													usable8.splice(p, 1);
													if (op4 == 0) usable8.push(select7 + select8)
													if (op4 == 1) usable8.push(select7 - select8)
													if (op4 == 2) usable8.push(select7 * select8)
													if (op4 == 3) usable8.push(select7 / select8)
													
													if (usable8[0] == cible)
														solutions.push(structuredClone(solution))
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return Unique(solutions)
}

function Unique(solutions)
{
	var uniques = []
	solutions.forEach(solution => {
		let add = true;
		uniques.forEach(unique => {
			if (CompareSolution(solution, unique))
			{
				add = false;
				return;
			}
		});
		if (add) uniques.push(solution);
	});
	return uniques
}
function CompareSolution(A, B)
{
	var id_plusA, id_plusB, id_moinsA, id_moinsB, id_foisA, id_foisB, id_divA, id_divB;
	for (let i = 0; i < 4; i++) {
		if (A[i][1] == 0) id_plusA = i;
		if (A[i][1] == 1) id_moinsA = i;
		if (A[i][1] == 2) id_foisA = i;
		if (A[i][1] == 3) id_divA = i;

		if (B[i][1] == 0) id_plusB = i;
		if (B[i][1] == 1) id_moinsB = i;
		if (B[i][1] == 2) id_foisB = i;
		if (B[i][1] == 3) id_divB = i;
	}
	let plus = false, moins = false, fois = false, div = false;
	if ((A[id_plusA][0] == B[id_plusB][0] && A[id_plusA][2] == B[id_plusB][2]) || (A[id_plusA][0] == B[id_plusB][2] && A[id_plusA][2] == B[id_plusB][0]))
		plus = true;
	if ((A[id_foisA][0] == B[id_foisB][0] && A[id_foisA][2] == B[id_foisB][2]) || (A[id_foisA][0] == B[id_foisB][2] && A[id_foisA][2] == B[id_foisB][0]))
		fois = true;
	if (A[id_moinsA][0] == B[id_moinsB][0] && A[id_moinsA][2] == B[id_moinsB][2])
			moins = true;
	if (A[id_divA][0] == B[id_divB][0] && A[id_divA][2] == B[id_divB][2])
		div = true;

	return plus && moins && fois && div
}