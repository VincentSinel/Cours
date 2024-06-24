
onmessage = function(e) {
	Run(e.data.count, e.data.data);
}

function Run(generate_count, previous_data)
{
	var start_time = Date.now()
	var last_time = start_time
	var result = previous_data;
	var attempt = 0;
	postMessage({status: "Start", result: result, attempt: 0, time: 0})

	var names = Object.keys(result);
	while (names.length < generate_count)
	{
		attempt += 1;
		var grid = CreateCarton()

		if (grid == undefined) continue;

		var id = CompressTable_short(grid)

		if (names.includes(id)) continue;

		names.push(id);
		result[id] = CompressTable(grid);

		if (attempt == 1)
			console.log(grid)
	
		let e = Date.now()
		if (e - last_time > 100)
		{
			postMessage({status: "Generating", result: result, attempt: attempt, time: e - start_time})
			last_time = e;
		}
	}
	postMessage({status: "End", result: result, attempt: attempt, time: Date.now() - start_time})
}


const number_list = [
	1, 2, 3, 4, 5, 6, 7, 8, 9,10,
 11,12,13,14,15,16,17,18,19,20,
 21,22,23,24,25,26,27,28,29,30,
 31,32,33,34,35,36,37,38,39,40,
 41,42,43,44,45,46,47,48,49,50,
 51,52,53,54,55,56,57,58,59,60,
 61,62,63,64,65,66,67,68,69,70,
 71,72,73,74,75,76,77,78,79,80,
 81,82,83,84,85,86,87,88,89,90
]

function CreateCarton()
{
	var NList = number_list.slice(0)
	shuffleArray(NList);

	var rows_count = [0,0,0];
	var full_columns = [];
	var grid = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]

	// Création de la grille
	var placed_value = 0;
	while (placed_value	 < 15)
	{
		if (NList.length == 0) return undefined
		var value = NList.pop()
		var col = Math.min(Math.floor(value / 10.0), 8);

		if (full_columns.includes(col))
			continue;

		let r = [];
		if (rows_count[0] < 5 && grid[0][col] == 0) r.push(0)
		if (rows_count[1] < 5 && grid[1][col] == 0) r.push(1)
		if (rows_count[2] < 5 && grid[2][col] == 0) r.push(2)
		if (r.length == 0) continue;

		let ri = r[Math.floor(Math.random() * r.length)];
		
		grid[ri][col] = value;
		placed_value += 1
		rows_count[ri] += 1;

		let k = 0;
		if (grid[0][col] != 0) k +=1; 
		if (grid[1][col] != 0) k +=1; 
		if (grid[2][col] != 0) k +=1;
		if (k == 2)
			full_columns.push(col)

	}
	
	// Réajustement de la position des nombres
	for (let i = 0; i < grid[0].length; i++) {
		var a1 = grid[0][i];
		var a2 = grid[1][i];
		var a3 = grid[2][i];

		if (a1 == 0)
		{
			if (a2 == 0) continue;
			if (a3 == 0) continue;
			if (a2 < a3) continue;
			grid[1][i] = a3;
			grid[2][i] = a2;
		}
		else if (a2 == 0)
		{
			if (a3 == 0) continue;
			if (a1 < a3) continue;
			grid[0][i] = a3;
			grid[2][i] = a1;
		}
		else if (a3 == 0)
		{
			if (a1 < a2) continue;
			grid[0][i] = a2;
			grid[1][i] = a1;
		}
		else
		{
			if (a1 < a2 && a2 < a3) continue;
			let min = Math.min(a1,a2,a3);
			let max = Math.max(a1,a2,a3);
			grid[0][i] = min;
			grid[2][i] = max;
			if (a1 != min && a1 != max) grid[1][i] = a1;
			if (a2 != min && a2 != max) grid[1][i] = a2;
			if (a3 != min && a3 != max) grid[1][i] = a3;
		}
	}

	return grid
}


function CompressTable_short(grid)
{
	var v = 0;
	var c = 0;
	for (let j = 8; j >= 0; j--) {
		for (let i = 2; i >= 0; i--) {
			if (grid[i][j] != 0)
			{
				v += grid[i][j] * Math.pow(100, c);
				c += 1;
			}
		}
	}
	return v.toString(36);
}
function CompressTable(grid)
{
	var v = "";
	for (let j = 0; j < 9; j++) {
		for (let i = 0; i < 3; i++) {
			v += grid[i][j].toString().padStart(2, '0');
		}
	}
	return v;
}



function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
	}
}