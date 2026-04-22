var TempsMargeCompetition = 5



function LoadFiles()
{
	var client = new XMLHttpRequest();
	client.open('GET', "Images/Bal_Bras.svg");
	client.onreadystatechange = function() {
		if (client.readyState === 4){
			svg_bras = client.responseText;
			var client2 = new XMLHttpRequest();
			client2.open('GET', "Images/Bal_Pied.svg");
			client2.onreadystatechange = function() {
				if (client2.readyState === 4){
					svg_pied = client2.responseText;
					var client3 = new XMLHttpRequest();
					client3.open('GET', "Images/Bal_Plateau.svg");
					client3.onreadystatechange = function() {
						if (client3.readyState === 4){
							svg_plateau = client3.responseText;
							var client4 = new XMLHttpRequest();
							client4.open('GET', "Images/Bal_Masse.svg");
							client4.onreadystatechange = function() {
								if (client4.readyState === 4){
									svg_poids1 = client4.responseText;
									var client5 = new XMLHttpRequest();
									client5.open('GET', "Images/Bal_Masse2.svg");
									client5.onreadystatechange = function() {
										if (client5.readyState === 4){
											svg_poids2 = client5.responseText;
											CreateBalance();
										}
									}
									client5.send();
								}
							}
							client4.send();
						}
					}
  				client3.send();
				}
			}
  		client2.send();
		}
	}
  client.send();

	
	document.getElementById("modificateur").onkeydown = (event) => {
		ValueModification(event)
	}
	document.getElementById("modificateur").onblur = (event) => {
		document.getElementById("menu_value").classList.add("hidden")
	}

	window.addEventListener("keydown", (event) => {
		let value = document.getElementById("modificateur")
		if (document.activeElement === value)
			return;
		switch(event.key)
		{
			case "p":
			case "P":
				ShowValueChoice('+x')
				event.preventDefault()
				break 
			case "m":
			case "M":
				ShowValueChoice('-x')
				event.preventDefault()
				break 
			case "+":
				ShowValueChoice('+')
				event.preventDefault()
				break 
			case "-":
				ShowValueChoice('-')
				event.preventDefault()
				break 
			case "*":
				ShowValueChoice('*')
				event.preventDefault()
				break 
			case "/":
				ShowValueChoice('/')
				event.preventDefault()
				break 
			case "z":
			case "Z":
				Undo()
				event.preventDefault()
				break 
			case "n":
			case "N":
				StartRandomEquation()
				event.preventDefault()
				break 
			case "c":
			case "C":
				StartCompetition()
				event.preventDefault()
				break 
		}
	})
}


{ // Game mode

	var PreviousTimes = [];
	var RoundStartTime = 0;

	var current_round = 1;
	var competition_mode = false;
	var competition_times = [];
	var competition_rounds = [];
	var countInterval

	function StartCompetition()
	{
		clearInterval(countInterval)
		current_round = 1;
		competition_mode = true;

		TempsMargeCompetition = document.getElementById("margeaccueille").valueAsNumber

		let tmc = TempsMargeCompetition * 1_000
		let beggin = Math.ceil(Date.now() / tmc) * tmc + 5_000;
		let rng = new RNG(beggin / tmc)
		competition_rounds = [
			GetRound(rng),
			GetRound(rng),
			GetRound(rng),
			GetRound(rng),
			GetRound(rng)
		]

		document.getElementById("time_comp_1").innerHTML = "-";
		document.getElementById("time_comp_2").innerHTML = "-";
		document.getElementById("time_comp_3").innerHTML = "-";
		document.getElementById("time_comp_4").innerHTML = "-";
		document.getElementById("time_comp_5").innerHTML = "-";
		document.getElementById("time_comp_M").innerHTML = "-";

		let count_down_element = document.getElementById("countdowncompetition")
		count_down_element.classList.remove("hidden")
		count_down_element.innerHTML = "Début dans : <br>" + Math.ceil((beggin - Date.now()) / 1000).toString();
		countInterval = setInterval(function() {

			count_down_element.innerHTML = "Début dans : <br>" + Math.ceil((beggin - Date.now()) / 1000).toString();
			if (Date.now() >= beggin) {
				clearInterval(countInterval)
				let round_value = competition_rounds[0]
				CreateCustomEquation(round_value[0], round_value[1], round_value[2], round_value[3])
				count_down_element.classList.add("hidden")
			};
		}, 100);

	}

	function StartRandomEquation()
	{
		clearInterval(countInterval)
		competition_mode = false;
		document.getElementById("countdowncompetition").classList.add("hidden")
		CreateRandomEquation()
	}

	function startCountDown(duration, element) {
		let secondsRemaining = duration;

		let countInterval = setInterval(function() {

			element.textContent = secondsRemaining;

			secondsRemaining = secondsRemaining - 1;
			if (secondsRemaining < 0) {
				clearInterval(countInterval)
				let round_value = competition_rounds[0]
				CreateCustomEquation(round_value[0], round_value[1], round_value[2], round_value[3])
			};
		}, 200);
	}

	function GetRound(rng)
	{
		let a = Math.floor(rng.GetRNG() * 21) - 10
		let b = Math.floor(rng.GetRNG() * 21) - 10
		let c = a
		while (c == a)
		{
			c = Math.floor(rng.GetRNG() * 21) - 10
		}
		let d = Math.floor(rng.GetRNG() * 21) - 10
		return [a, b, c, d];
	}

	function EndRound()
	{
		let time = Date.now() - RoundStartTime;
		PreviousTimes.push(time);

		if (competition_mode)
		{
			competition_times.push(time);
			document.getElementById("time_comp_" + current_round.toString()).innerText = (time / 1000).toFixed(3) + "s";
			if (current_round == 5)
			{
				competition_mode = false;
				let sum = 0;
				competition_times.forEach(time => {
					sum += time;
				});
				let average_time = sum / competition_times.length;

				document.getElementById("time_comp_M").innerText = (average_time / 1000).toFixed(3) + "s";

				alert("Fin de la compétition ! Votre temps moyen est " + (average_time / 1000).toFixed(3) + "s");
			}
			else
			{
				let round_value = competition_rounds[current_round]
				current_round++;
				CreateCustomEquation(round_value[0], round_value[1], round_value[2], round_value[3])
			}
		}

		SetBestTime()
		SetAverageTime()
		SetAverageTime5()
	}

	function SetBestTime()
	{
		let best_time = Math.min(...PreviousTimes);
		document.getElementById("time_best").innerText = (best_time / 1000).toFixed(3) + "s";
	}

	function SetAverageTime()
	{
		let sum = 0;
		PreviousTimes.forEach(time => {
			sum += time;
		});
		let average_time = sum / PreviousTimes.length;
		document.getElementById("time_average").innerText = (average_time / 1000).toFixed(3) + "s";
	}

	function SetAverageTime5()
	{
		let sum = 0;
		for (let i = PreviousTimes.length - 1; i > PreviousTimes.length - 6 && i >= 0; i--) {
			sum += PreviousTimes[i];
		}
		let average_time = sum / Math.min(PreviousTimes.length, 5);
		document.getElementById("time_average5").innerText = (average_time / 1000).toFixed(3) + "s";
	}

} // Game mode


{ // Balance
	
	var SVG_Draw
	var svg_bras, svg_pied, svg_plateau, svg_poids1, svg_poids2;
	const size = {w: 600, h: 300};
	const zoom_coef = 1;
	var bras, pied, plateauD, plateauG, massesG, massesD;
	var angle_current = 0;
	var angle_target = 0;
	var anim_speed = 0.95;
	var speed = 0;
	
	function CreateBalance()
	{
		SVG_Draw = SVG().addTo('#balance_holder');
		SVG_Draw.viewbox(0, 0, size.w * zoom_coef, size.h * zoom_coef);
		SVG_Draw.svg(svg_pied);
		SVG_Draw.svg(svg_bras);
		SVG_Draw.svg(svg_plateau);
		SVG_Draw.svg(svg_plateau);
		bras = SVG_Draw.get(1);
		pied = SVG_Draw.get(0);
		plateauD = SVG_Draw.get(2);
		plateauG = SVG_Draw.get(3);
		massesD = SVG_Draw.group();
		massesG = SVG_Draw.group();
	
		pied.move(size.w/2 * zoom_coef, size.h * zoom_coef);
		pied.dmove(-pied.width()/2 * zoom_coef, -pied.height() * zoom_coef);
		bras.move(size.w/2 * zoom_coef, (size.h - 90) * zoom_coef);
		bras.dmove(-bras.width()/2 * zoom_coef, -bras.height() * zoom_coef);
	
		UpdateBalance(0);
	}
	
	function UpdateBalance(angle)
	{
		bras.rotate(angle - angle_current, size.w/2 * zoom_coef, (size.h - 90) * zoom_coef);
		plateauD.move(
			(size.w/2 + Math.cos(angle * Math.PI / 180) * 180) * zoom_coef,
			(size.h - 90 + Math.sin(angle * Math.PI / 180) * 180) * zoom_coef
		);
		plateauD.dmove(-plateauD.width()/2 * zoom_coef, -5-plateauD.height() * zoom_coef);
		plateauG.move(
			(size.w/2 - Math.cos(angle * Math.PI / 180) * 180) * zoom_coef,
			(size.h - 90 - Math.sin(angle * Math.PI / 180) * 180) * zoom_coef
		);
		plateauG.dmove(-plateauG.width()/2 * zoom_coef, -5-plateauG.height() * zoom_coef);
		angle_current = angle;
	}

	function SetAngleTarget(angle)
	{
		angle_target = angle;
			speed = (angle_target - angle_current) / 40;
		window.requestAnimationFrame(UpdateAngle);
	}

	function Pitch()
	{
		speed = 2 * (Math.floor(Math.random() * 2) - 0.5) * 2.0;
		window.requestAnimationFrame(UpdateAngle);
	}
	
	function UpdateAngle()
	{
		if (Math.abs(speed) < 0.001)
		{
			UpdateBalance(angle_target);
			return;
		}
		else
		{
			speed += (angle_target - angle_current) / 40;
			speed *= 0.9;
			UpdateBalance(angle_current + speed);
			window.requestAnimationFrame(UpdateAngle);
		}
	}

	function AddMassG(num, den, x = false)
	{
		massesG.svg(svg_poids1);
		massesG.last().move(plateauG.cx(), plateauG.y());
		massesG.last().dmove(-massesG.last().width()/2 * zoom_coef, -massesG.last().height() * zoom_coef);
	}

	function ReacreateMass()
	{

	}

} // Balance


{ // Modification

	var op_selected
	var equation;
	var UndoStack = [];


	function ShowValueChoice(op)
	{
		if (equation == undefined)
			return;
		op_selected = op
		document.getElementById("menu_value").classList.remove("hidden")
		document.getElementById("menu_value").children[2].classList.add("hidden")
		switch (op) {
			case "+":
				document.getElementById("menu_value").children[0].innerText = "+";
				break;
			case "-":
				document.getElementById("menu_value").children[0].innerText = "-";
				break;
			case "*":
				document.getElementById("menu_value").children[0].innerText = "×";
				break;
			case "/":
				document.getElementById("menu_value").children[0].innerText = "÷";
				break;
			case "+x":
				document.getElementById("menu_value").children[2].classList.remove("hidden")
				document.getElementById("menu_value").children[0].innerText = "+";
				break;
			case "-x":
				document.getElementById("menu_value").children[2].classList.remove("hidden")
				document.getElementById("menu_value").children[0].innerText = "-";
				break;
			default:
				break;
		}
		document.getElementById("menu_value").children[1].value = "";
		document.getElementById("menu_value").children[1].focus()
	}

	function ValueModification(event)
	{
		if (event.key == "Enter")
		{
			let value = document.getElementById("modificateur").valueAsNumber;
			document.getElementById("menu_value").classList.add("hidden")
			if (isNaN(value)) return;
			if (value > 999_999_999) return;
			AddCalcul(op_selected, value, 1)
		}
	}
	
	function Undo()
	{
		if (equation == undefined)
			return;
		if (UndoStack.length > 1)
		{
			UndoStack.pop();
			equation = UndoStack[UndoStack.length - 1].clone();
			let calculs = document.getElementById("calculs");
			calculs.children[calculs.children.length - 1].remove();
			calculs.children[calculs.children.length - 1].remove();

			calculs.parentElement.scrollTop = calculs.parentElement.scrollHeight + 20;
		}
	}

	function CreateRandomEquation()
	{
		let a = Math.floor(Math.random() * 21) - 10
		let b = Math.floor(Math.random() * 21) - 10
		let c = a
		while (c == a)
		{
			c = Math.floor(Math.random() * 21) - 10
		}
		let d = Math.floor(Math.random() * 21) - 10

		CreateCustomEquation(a,b,c,d)
	}

	function CreateCustomEquation(a,b,c,d)
	{
		equation = new Equation()
		equation.Generate(a, 1, b, 1, c, 1, d, 1);

		RoundStartTime = Date.now();

		ClearAndSetCalcul();
	}


} // Modification


{ // Gestion zone equation

	function ClearAndSetCalcul()
	{
		let calculs = document.getElementById("calculs");
		calculs.innerHTML = "";

		equation.Regroupe();
		UndoStack = [];
		UndoStack.push(equation.clone());
		AddLine()
	}

	function GetEquationParts(left_member, right_member)
	{
		let a = left_member[0].Unknow ? [left_member[0].PoidNum, left_member[0].PoidDen] : [0,1];
		let b = left_member[0].Unknow ? (left_member.length == 2 ? [left_member[1].PoidNum, left_member[1].PoidDen] : [0,1]) : [left_member[0].PoidNum, left_member[0].PoidDen];
		
		let c = right_member[0].Unknow ? [right_member[0].PoidNum, right_member[0].PoidDen] : [0,1];
		let d = right_member[0].Unknow ? (right_member.length == 2 ? [right_member[1].PoidNum, right_member[1].PoidDen] : [0,1]) : [right_member[0].PoidNum, right_member[0].PoidDen];
		
		return [a,b,c,d]
	}
	
	function AddLine()
	{
		let values = GetEquationParts(equation.Part1, equation.Part2)
		let tr =_AddLine(values[0][0], values[0][1], values[1][0], values[1][1], values[2][0], values[2][1], values[3][0], values[3][1])
		if (equation.IsSolved())
		{
			tr.classList.add("solved");
			EndRound();
		}
	}
	
	function _AddLine(a1, a2, b1, b2, c1, c2, d1, d2)
	{
		let tr = document.createElement("tr");
		tr.classList.add("calcul");
		let tds = [];
		for (let i = 0; i < 21; i++)
		{
			tds.push(document.createElement("td"));
			tr.appendChild(tds[i]);
		}
		
	
		let label = document.createElement("label");
		label.innerText = a1 < 0 ? "-" : "";
		tds[0].appendChild(label);
	
		if (a1 != 0 && (a1 / a2) != 1)
			tds[2].appendChild(CreatePart(Math.abs(a1), a2));
	
		label = document.createElement("label");
		label.innerText = "𝓍";
		if (a1 != 0)
			tds[4].appendChild(label);
	
		label = document.createElement("label");
		label.innerText = b1 > 0 ? "+" : "-";
		if ((a1 != 0 && b1 != 0) || (a1 == 0 && b1 < 0))
			tds[6].appendChild(label);
	
		if (a1 == 0 || b1 != 0)
			tds[8].appendChild(CreatePart(Math.abs(b1), b2));
	
		label = document.createElement("label");
		label.innerText = "=";
		tds[10].appendChild(label);
	
		label = document.createElement("label");
		label.innerText = c1 < 0 ? "-" : "";
		tds[12].appendChild(label);
	
		if (c1 != 0 && (c1 / c2) != 1)
			tds[14].appendChild(CreatePart(Math.abs(c1), c2));
	
		label = document.createElement("label");
		label.innerText = "𝓍";
		if (c1 != 0)
			tds[16].appendChild(label);
	
		label = document.createElement("label");
		label.innerText = d1 > 0 ? "+" : "-";
		if ((c1 != 0 && d1 != 0) || (c1 == 0 && d1 < 0))
			tds[18].appendChild(label);
	
		if (c1 == 0 || d1 != 0)
		tds[20].appendChild(CreatePart(Math.abs(d1), d2));
	
		let calculs = document.getElementById("calculs");
		calculs.appendChild(tr)

		calculs.parentElement.scrollTop = calculs.parentElement.scrollHeight + 20;	
		return tr;
	}
	
	function _AddLineText(t0, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, color)
	{
		let tr = document.createElement("tr");
		tr.classList.add("calcul");
		let tds = [];
		for (let i = 0; i < 21; i++)
		{
			tds.push(document.createElement("td"));
			tr.appendChild(tds[i]);
		}
	
		let label = document.createElement("label");
		label.innerText = t0;
		label.style.color = color
		if (t0 != "") tds[0].appendChild(label);
	
		if (t1 != "")
		{
			tds[2].appendChild(CreatePart(t1[0], t1[1]));
			tds[2].lastChild.style.color = color
		}
		label = document.createElement("label");
		label.innerText = t2;
		label.style.color = color
		if (t2 != "") tds[4].appendChild(label);
	
		label = document.createElement("label");
		label.innerText = t3;
		label.style.color = color
		if (t3 != "") tds[6].appendChild(label);
	
		if (t4 != "")
		{
			tds[8].appendChild(CreatePart(t4[0], t4[1]));
			tds[8].lastChild.style.color = color
		}
		
		label = document.createElement("label");
		label.innerText = t5;
		label.style.color = color
		if (t5 != "") tds[10].appendChild(label);
	
		label = document.createElement("label");
		label.innerText = t6;
		label.style.color = color
		if (t6 != "") tds[12].appendChild(label);
	
		if (t7 != "")
		{
			tds[14].appendChild(CreatePart(t7[0], t7[1]));
			tds[14].lastChild.style.color = color
		}
	
		label = document.createElement("label");
		label.innerText = t8;
		label.style.color = color
		if (t8 != "") tds[16].appendChild(label);
	
		label = document.createElement("label");
		label.innerText = t9;
		label.style.color = color
		if (t9 != "") tds[18].appendChild(label);
	
		if (t10 != "")
		{
			tds[20].appendChild(CreatePart(t10[0], t10[1]));
			tds[20].lastChild.style.color = color
		}
		
		let calculs = document.getElementById("calculs");
		calculs.appendChild(tr)

		calculs.parentElement.scrollTop = calculs.parentElement.scrollHeight + 20;
	}
	
	function CreatePart(num, den)
	{
		let div = document.createElement("div");
		if (den == 1)
		{
			let label = document.createElement("label");
			label.innerText = num;
			div.appendChild(label)
		}	
		else
		{
			let label = document.createElement("label");
			label.innerText = num;
			div.appendChild(label)
			div.appendChild(document.createElement("hr"))
			label = document.createElement("label");
			label.innerText = den;
			div.appendChild(label)
		}
		return div
	}
	
	function AddCalcul(operator, vnum, vden)
	{
		// let t0 = "", t1 = [], t2 = "𝓍", t3 = "", t4 = [], t5 = "",t6 = "", t7 = [], t8 = "𝓍", t9 = "",t10 = [], color
		let t0 = "", t1 = "", t2 = "", t3 = "", t4 = "", t5 = "", t6 = "", t7 = "", t8 = "",t9 = "", t10 = "", color
		let values;
		switch (operator) {
			case "+":
				t3 = "+"
				t4 = [vnum, vden]
				t9 = "+"
				t10 = [vnum, vden]
				color = "green"
				equation.Part1.push(new Poids(vnum, vden, false));
				equation.Part2.push(new Poids(vnum, vden, false));
				equation.Regroupe();
				UndoStack.push(equation.clone());
				break;
			case "-":
				t3 = "-"
				t4 = [vnum, vden]
				t9 = "-"
				t10 = [vnum, vden]
				color = "green"
				equation.Part1.push(new Poids(-vnum, vden, false));
				equation.Part2.push(new Poids(-vnum, vden, false));
				equation.Regroupe();
				UndoStack.push(equation.clone());
				break;
			case "+x":
				t0 = "+"
				t1 = [vnum, vden], t2 ="𝓍"
				t6 = "+"
				t7 = [vnum, vden], t8 ="𝓍"
				color = "green"
				equation.Part1.push(new Poids(vnum, vden, true));
				equation.Part2.push(new Poids(vnum, vden, true));
				equation.Regroupe();
				UndoStack.push(equation.clone());
				break;
			case "-x":
				t0 = "-"
				t1 = [vnum, vden], t2 ="𝓍"
				t6 = "-"
				t7 = [vnum, vden], t8 ="𝓍"
				color = "green"
				equation.Part1.push(new Poids(-vnum, vden, true));
				equation.Part2.push(new Poids(-vnum, vden, true));
				equation.Regroupe();
				UndoStack.push(equation.clone());
				break;
			case "*":
				values = GetEquationParts(equation.Part1, equation.Part2)
				if (values[0][0] != 0)
				{ t0 = "×", t1 = [vnum, vden] }
				if (values[1][0] != 0)
				{ t3 = "×", t4 = [vnum, vden] }
				if (values[2][0] != 0)
				{ t6 = "×", t7 = [vnum, vden] }
				if (values[3][0] != 0)
				{ t9 = "×", t10 = [vnum, vden] }
				color = "red"
				equation.multiply(vnum, vden);
				equation.Regroupe();
				UndoStack.push(equation.clone());
				break;
			case "/":
				values = GetEquationParts(equation.Part1, equation.Part2)
				if (values[0][0] != 0)
				{ t0 = "÷", t1 = [vnum, vden] }
				if (values[1][0] != 0)
				{ t3 = "÷", t4 = [vnum, vden] }
				if (values[2][0] != 0)
				{ t6 = "÷", t7 = [vnum, vden] }
				if (values[3][0] != 0)
				{ t9 = "÷", t10 = [vnum, vden] }
				color = "red"
				equation.divide(vnum, vden);
				equation.Regroupe();
				UndoStack.push(equation.clone());
				break;
			default:
				break;
		}
	
		_AddLineText(t0, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, color)
		AddLine()
	}

} // Gestion zone equation


class RNG
{
	RNG_VEC_X = 23.14069263277926
	RNG_VEC_Y = 2.665144142690225
	index = -1
	seed

	constructor(seed = -1)
	{
		if (seed == -1)
			this.seed = Math.floor(Math.random() * 999_999_999)
		else
			this.seed = seed
	}

	Reset()
	{
		this.index = -1;
	}

	GetRNG()
	{
		this.index++;
		return this.GetRNGIndex(this.index);
	}

	GetRNGIndex(id)
	{
		if (id % 2 == 0)
			return this.fract(Math.cos(id * this.RNG_VEC_X) * 12345.6789 * this.seed);
		else
			return this.fract(Math.cos(id * this.RNG_VEC_Y) * 12345.6789 * this.seed);
	}

	fract(value)
	{
		return Math.abs(value - Math.floor(value));
	}
}

class Equation
{
    Part1 = [];
    Part2 = [];

    Unknow_realvalue = new Poids(0, 1, false);

    Generate(_x1num, _x1den, _c1num, _c1den, _x2num, _x2den, _c2num, _c2den)
    {
        this.Part1 = [];
        this.Part2 = [];
        if (_x1num != 0)
            this.Part1.push(new Poids(_x1num, _x1den, true));
        if (_c1num != 0 || _x1num == 0)
            this.Part1.push(new Poids(_c1num, _c1den, false));
        if (_x2num != 0)
            this.Part2.push(new Poids(_x2num, _x2den, true));
        if (_c2num != 0 || _x2num == 0)
            this.Part2.push(new Poids(_c2num, _c2den, false));
        this.CalculateUnknow()
    }

		IsSolved()
		{
			let part1_x = this.Part1.length == 1 && this.Part1[0].Unknow && this.Part1[0].Get_Poid() == 1;
			let part2_x = this.Part2.length == 1 && this.Part2[0].Unknow && this.Part2[0].Get_Poid() == 1;
			let part1_c = this.Part1.length == 1 && !this.Part1[0].Unknow;
			let part2_c = this.Part2.length == 1 && !this.Part2[0].Unknow;
			return (part1_x && part2_c) || (part1_c && part2_x);
		}

    CalculateUnknow()
    {
        let pc = new Poids(0, 1, false)
        let px = new Poids(0, 1, true)
        this.Part1.forEach(poid => {
            if (poid.Unknow)
                px.add(poid.PoidNum, poid.PoidDen)
            else
                pc.remove(poid.PoidNum, poid.PoidDen)
        });
        this.Part2.forEach(poid => {
            if (poid.Unknow)
                px.remove(poid.PoidNum, poid.PoidDen)
            else
                pc.add(poid.PoidNum, poid.PoidDen)
        });
        pc.divide(px.PoidNum, px.PoidDen);
        this.Unknow_realvalue = pc;
    }

    Get_Total(_part)
    {
        let p = new Poids(0, 1)
        _part.forEach(poid => {
            if (poid.Unknow)
                p.add(
                    poid.PoidNum * this.Unknow_realvalue.PoidNum, 
                    poid.PoidDen * this.Unknow_realvalue.PoidDen)
            else
                p.add(poid.PoidNum, poid.PoidDen)
        });
        return p;
    }

    Get_Approx_Weight1()
    {
        let p = this.Get_Total(this.Part1)
        return p.PoidNum / (p.PoidDen * 1.0)
    }

    Get_Approx_Weight2()
    {
        let p = this.Get_Total(this.Part2)
        return p.PoidNum / (p.PoidDen * 1.0)
    }

    Is_Equal()
    {
        let p1 = this.Get_Total(this.Part1)
        let p2 = this.Get_Total(this.Part2)
        return p1.PoidNum == p2.PoidNum && p1.PoidDen == p2.PoidDen;
    }

    Regroupe()
    {
        this.Part1 = this.#Regroupe(this.Part1);
        this.Part2 = this.#Regroupe(this.Part2);
    }

    #Regroupe(_part)
    {
        let px = new Poids(0, 1, true)
        let pc = new Poids(0, 1, false)
        _part.forEach(poid => {
            if (poid.Unknow)
                px.add(poid.PoidNum, poid.PoidDen)
            else
                pc.add(poid.PoidNum, poid.PoidDen)
        });
        if (px.PoidNum != 0 && pc.PoidNum != 0)
            return [px, pc];
        else if (px.PoidNum != 0)
            return [px];
        else
            return [pc];
    }

    multiply(num, den)
    {
        if (num == 0)
            return;
        this.Part1.forEach(poid => {
            poid.multiply(num, den)
        });
        this.Part2.forEach(poid => {
            poid.multiply(num, den)
        });
    }

    divide(num, den)
    {
        if (num == 0)
            return;
        this.Part1.forEach(poid => {
            poid.divide(num, den)
        });
        this.Part2.forEach(poid => {
            poid.divide(num, den)
        });
    }

		clone()
		{
			let clone = new Equation();
			this.Part1.forEach(poid => {
				clone.Part1.push(poid.clone())
			});
			this.Part2.forEach(poid => {
				clone.Part2.push(poid.clone())
			});
			return clone;
		}
}

class Poids
{
    PoidNum = 1.0;
    PoidDen = 1.0;
    Unknow = false;
    
    Get_Poid()
    {
        return this.PoidNum / this.PoidDen;
    }

    is_zero()
    {
        return this.PoidNum == 0;
    }

    clone()
    {
        let p = new Poids(this.PoidNum, this.PoidDen, this.Unknow);
        return p;
    }

    constructor(_poidnum, _poidden, _unknow = false)
    {
        this.PoidNum = _poidnum;
        this.PoidDen = _poidden;
        this.Unknow = _unknow;
        this.simplify();
    }

    add(_poidnum, _poidden)
    {
        this.PoidNum = this.PoidNum * _poidden + _poidnum * this.PoidDen;
        this.PoidDen = this.PoidDen * _poidden;
        this.simplify();
    }
    remove(_poidnum, _poidden)
    {
        this.add(-_poidnum, _poidden);
    }
    multiply(_coefnum, _coefden)
    {
        this.PoidNum *= _coefnum;
        this.PoidDen *= _coefden;
        this.simplify()
    }
    divide(_coefnum, _coefden)
    {
        this.multiply(_coefden, _coefnum)
    }


    simplify()
    {
        if (isNaN(this.PoidNum) )
            console.trace()
        let pgcd = this.PGCD(Math.abs(this.PoidNum), Math.abs(this.PoidDen));
        this.PoidNum /= pgcd;
        this.PoidDen /= pgcd;

        if (this.PoidDen < 0)
        {
            this.PoidNum *= -1;
            this.PoidDen *= -1;
        }
    }

    PGCD(_a, _b)
    {
        if (_b == 0)
            return _a;
        return this.PGCD(_b, _a % _b);
    }

		clone()
		{
			let p = new Poids(this.PoidNum, this.PoidDen, this.Unknow);
			return p;
		}
}