
// var complete_grid = []
// var workers = [];

// function Test()
// {
// 	for (let i = 1; i < 2; i++) { // 10
// 		var w = new Worker("CardGenerator.js");
// 		w.onmessage = function(event) { Draw(event)};
// 		w.postMessage(i);
// 		workers.push(w);
// 	}
// }

// function Draw(event)
// {
// 	let grid = event.data.step
// 	var table_element = document.getElementById("result" + event.data.id.toString());
// 	table_element.innerHTML = ""

// 	console.log(event.data.completed )

// 	if (event.data.finish)
// 	{
// 		complete_grid = complete_grid.concat(event.data.grid)
// 		return;
// 	}

// 	var lines = [
// 		document.createElement("tr"),
// 		document.createElement("tr"),
// 		document.createElement("tr")]
	
	

// 	for (let i = 0; i < 9; i++) {
// 		for(let j = 0; j < 3; j++)
// 		{
// 			var cell = document.createElement("td")
// 			let v = grid.Value[j + i * 3];
// 			if (v == undefined || v == 0)
// 				cell.classList.add("empty")
// 			else
// 			{
// 				cell.classList.add("full")
// 				cell.innerHTML = v
// 			}
// 			lines[j].appendChild(cell);
// 		}
// 	}
// 	table_element.appendChild(lines[0])
// 	table_element.appendChild(lines[1])
// 	table_element.appendChild(lines[2])
// }

// function stopWorker() { 
// 	workers.forEach(e => e.terminate())
// 	workers = []
// }

var last_time = Date.now()
var complete_grid = []
var id = 0

function Test(start = 1)
{
	id = start;
	var grid = new Grid()
	runner(grid, start, 0);
	postMessage({id : id, step: {Value: "FINISH"}, finished: true, grid : complete_grid})
}

function runner(current_grid, start_value, deep)
{
	for (let a = start_value; a <= 11; a++) {
		let b = current_grid.Clone()
		if (b.SetValue(a))
		{
			if (b.IsFull())
			{
				complete_grid.push(b.Value);
			}
			else
			{
				runner(b.Clone(), b.StartValue, deep + 1)
			}
		}
		let e = Date.now()
		if (e - last_time > 2000)
		{
			postMessage({id : id, step: b, finished: false, completed: complete_grid.length})
			last_time = e;
		}
	}
}


class Grid
{
	Line_count = [0,0,0];
	Col_count = [0,0,0,0,0,0,0,0,0];
	Value = [];
	Total_Count = 0
	StartValue = 0
	CurrentPosition = [0,0];

	constructor()
	{
		this.Line_count = [0,0,0];
		this.Col_count = [0,0,0,0,0,0,0,0,0];
		this.Value = [];
		this.Total_Count = 0
		this.CurrentPosition = [0,0];
	}

	SetValue(id)
	{
		var p = this.CurrentPosition;

		if (id != 11)
		{
			// Si la valeur est impossible
			if (p[1] == 0 && id == 0) return false
			if (p[1] != 8 && id == 10) return false
	
			var value = id + p[1] * 10;
			
			
			// On assigne la nouvelle valeur
			this.Value.push(value);
			this.Line_count[p[0]] += 1;
			this.Col_count[p[1]] += 1;
			this.Total_Count += 1;
			this.StartValue = id + 1;
		}
		else
		{
			this.Value.push(0);
		}

		var first_move = true;
		// On cherche la prochaine place disponible dans le tableau
		while(first_move || this.IsColFull(this.CurrentPosition[1]) || this.IsLineFull(this.CurrentPosition[0]))
		{
			if (!first_move)
				this.Value.push(0);
			first_move = false;
			// On se déplace d'une ligne.
			this.CurrentPosition[0] += 1;
			// On atteint le bord de la grille
			if (this.CurrentPosition[0] == 3)
			{
				// On change de colonne
				this.CurrentPosition[1] += 1
				this.CurrentPosition[0] = 0
				this.StartValue = 0;
				// Si le nombre de colonne dépasse
				if (this.CurrentPosition[1] == 9)
				{
					// Si le nombre de valeur est correct, la grille est pleine
					if (this.IsFull()) return true;
					// Sinon ERREUR
					else return false;
				}
			}
		}

		// Une case libre a été trouvé
		return true;
	}

	GetCol(col)
	{
		for (let i = 0; i < this.Value.length; i++) {
			const e = this.Value[i];
			if (e < (col + 1) * 10) continue;
			if (col == 8)
			{
				if (e <= (col + 1) * 10) 
					return e
			}
			else
			{
				if (e < (col + 1) * 10) 
					return e
			}
		}
	}

	IsLineFull(id)
	{
		return this.Line_count[id] == 5
	}

	IsColFull(id)
	{
		return this.Col_count[id] == 2
	}

	IsFull()
	{
		return this.Total_Count == 15;
	}

	Clone()
	{
		var g = new Grid();
		g.Line_count = this.Line_count.slice(0);
		g.Col_count = this.Col_count.slice(0);
		g.Value = this.Value.slice(0);
		g.StartValue = this.StartValue;
		g.CurrentPosition = this.CurrentPosition.slice(0)
		g.Total_Count = this.Total_Count
		return g
	}
}

onmessage = function(e) {
	Test(e.data);
}

// function runner(current_grid, deep)
// {
// 	current_deep.push(0);
// 	for (let a = 0; a <= 10; a++) {
// 		current_deep[deep] = a;
// 		let b = current_grid.Clone()
// 		if (b.SetValue(a))
// 		{
// 			if (b.IsFull())
// 			{
// 				console.log("full card")
// 				complete_grid.push(b.Value);
// 			}
// 			else
// 			{
// 				runner(b.Clone(), deep + 1)
// 			}
// 		}
// 	}
// 	if (deep < 7)
// 	{
// 		value_count = 0;
// 		var i = 14;
// 		current_deep.forEach(e => {
// 			value_count += Math.pow(10, i) * e;
// 			i -= 1;
// 		});
// 		var new_value = Math.floor(value_count * 100 / maxvalue)
// 		if (new_value != last_value_update)
// 		{
// 			console.log(new_value, "%")
// 			console.log(current_deep)
// 			last_value_update = new_value
// 		}
// 	}
// 	current_deep.pop();
// }

// class Grid
// {
// 	Line_count = [0,0,0];
// 	Col_count = [0,0,0,0,0,0,0,0,0];
// 	Value = [];
// 	Total_Count = 0
// 	CurrentPosition = [0,0];

// 	constructor()
// 	{
// 		this.Line_count = [0,0,0];
// 		this.Col_count = [0,0,0,0,0,0,0,0,0];
// 		this.Value = [];
// 		this.Total_Count = 0
// 		this.CurrentPosition = [0,0];
// 	}

// 	SetValue(id)
// 	{
// 		var p = this.CurrentPosition;
// 		var value = id + p[1] * 10;

// 		Si la valeur est impossible
// 		if (p[1] == 0 && value == 0) return false
// 		if (p[1] != 8 && value == 10) return false
// 		Si la valeur est déjà dans le tableau
// 		if (this.Value.includes(value)) return false;
// 		Si la valeur est supérieur à une valeur précédente de la colonne
// 		if (this.GetCol(p[1]) >= value) return false;
		
// 		On assigne la nouvelle valeur
// 		this.Value.push(value);
// 		this.Line_count[p[0]] += 1;
// 		this.Col_count[p[1]] += 1;
// 		this.Total_Count += 1;

// 		var first_move = true;
// 		On cherche la prochaine place disponible dans le tableau
// 		while(first_move || this.IsColFull(this.CurrentPosition[1]) || this.IsLineFull(this.CurrentPosition[0]))
// 		{
// 			first_move = false;
// 			On se déplace d'une colonne.
// 			this.CurrentPosition[1] += 1;
// 			On atteint le bord de la grille
// 			if (this.CurrentPosition[1] == 9)
// 			{
// 				Si la ligne que n'était pas terminé : ERREUR
// 				if (!this.IsLineFull(this.CurrentPosition[0])) return false
// 				Sinon on change de ligne
// 				this.CurrentPosition[0] += 1
// 				this.CurrentPosition[1] = 0
// 				Si on dépasse du tableau
// 				if (this.CurrentPosition[0] == 3)
// 				{
// 					Si le nombre de valeur est correct, la grille est pleine
// 					if (this.IsFull()) return true;
// 					Sinon ERREUR
// 					else return false;
// 				}
// 			}
// 		}

// 		Une case libre a été trouvé
// 		return true;
// 	}

// 	GetCol(col)
// 	{
// 		for (let i = 0; i < this.Value.length; i++) {
// 			const e = this.Value[i];
// 			if (e < (col + 1) * 10) continue;
// 			if (col == 8)
// 			{
// 				if (e <= (col + 1) * 10) 
// 					return e
// 			}
// 			else
// 			{
// 				if (e < (col + 1) * 10) 
// 					return e
// 			}
// 		}
// 	}

// 	IsLineFull(id)
// 	{
// 		return this.Line_count[id] == 5
// 	}

// 	IsColFull(id)
// 	{
// 		return this.Col_count[id] == 2
// 	}

// 	IsFull()
// 	{
// 		return this.Total_Count == 15;
// 	}

// 	Clone()
// 	{
// 		var g = new Grid();
// 		g.Line_count = this.Line_count.slice(0);
// 		g.Col_count = this.Col_count.slice(0);
// 		g.Value = this.Value.slice(0);
// 		g.CurrentPosition = this.CurrentPosition.slice(0)
// 		g.Total_Count = this.Total_Count
// 		return g
// 	}
// }




// function Test2()
// {
// 	var time = Date.now();
// 	var quines = [];
// 	for (let a = 0; a < 5; a++) {
// 		for (let b = (a + 1); b < 6; b++) {
// 			for (let c = (b + 1); c < 7; c++) {
// 				for (let d = (c + 1); d < 8; d++) {
// 					for (let e = (d + 1); e < 9; e++) {
// 						for (let a1 = 0; a1 < 10; a1++) {
// 							if (a == 0 && a1 == 0) continue;
// 							for (let b1 = 0; b1 < 10; b1++) {
// 								for (let c1 = 0; c1 < 10; c1++) {
// 									for (let d1 = 0; d1 < 10; d1++) {
// 										for (let e1 = 0; e1 <= 10; e1++) {
// 											if (e != 8 && e1 == 10) continue;
// 											var q = [
// 												a * 10 + a1,
// 												b * 10 + b1,
// 												c * 10 + c1,
// 												d * 10 + d1,
// 												e * 10 + e1
// 											]
// 											quines.push(q)
// 										}
// 									}
// 								}
// 							}
// 						}

// 					}
// 				}
// 			}
// 		}
// 	}
// 	console.log(quines.length, Date.now() - time)
// 	CreateCarton(quines)
// }


// function CreateCarton(quines)
// {
// 	var time = Date.now();
// 	var cartons = []
// 	var count = 0;
// 	for (let i = 0; i < quines.length - 2; i++) {
// 		const quine1 = quines[i];
// 		count += 1;
// 		for (let j = (i + 1); j < quines.length - 1; j++) {
// 			const quine2 = quines[j];
// 			if (!CheckQuine2(quine1, quine2)) continue;
// 			for (let k = (j + 1); k < quines.length; k++) {
// 				const quine3 = quines[k];
// 				if (CheckQuine(quine1, quine2, quine3))
// 				{
// 					cartons.push([quine1, quine2, quine3])
// 					console.log("Add carton")
// 				}
// 			}
// 		}
// 		console.log("Cartons checked", count)
// 	}
// 	console.log(cartons.length, Date.now() - time)
// }

// function Getcol(value)
// {
// 	return  Math.min(Math.floor(value / 10.0), 8);
// }

// function CheckQuine2(quine1, quine2)
// {
// 	var same_col = [[],[],[],[],[],[],[],[],[]];
// 	quine1.forEach(e => {
// 		same_col[Getcol(e)].push(e)
// 	});
// 	quine2.forEach(e => {
// 		same_col[Getcol(e)].push(e)
// 	});

// 	for (let i = 0; i < 9; i++) {
// 		const element = same_col[i];
// 		if (element.length == 2)
// 		{
// 			// Check if element are not ordonned vertically in the columns
// 			if (element[0] > element[1]) return false
// 		}
// 	}
// }

// function CheckQuine(quine1, quine2, quine3)
// {
// 	var same_col = [[],[],[],[],[],[],[],[],[]];
// 	quine1.forEach(e => {
// 		same_col[Getcol(e)].push(e)
// 	});
// 	quine2.forEach(e => {
// 		same_col[Getcol(e)].push(e)
// 	});
// 	quine3.forEach(e => {
// 		same_col[Getcol(e)].push(e)
// 	});

// 	for (let i = 0; i < 9; i++) {
// 		const element = same_col[i];
// 		// Check if columns is overload
// 		if (element.length == 3) return false;
// 		if (element.length == 2)
// 		{
// 			// Check if element are not ordonned vertically in the columns
// 			if (element[0] > element[1]) return false
// 		}
// 	}

// 	return true
// }