
var Global_Digits = "123456789ABCDEFG"
// var type = "9x9"
var Grid_type = "9x9"
var workers = []
var Commun_difficulty = {
	"easy":      62,
	"medium":    53,
	"hard":      44,
	"very-hard": 35,
	"insane":    26,
	"inhuman":   17,
}
var Parameters = {
	"4x4": {minimum_clue: 4, Hsize: 2, Vsize: 2, HSsize: 2, VSsize: 2},
	"6x6": {minimum_clue: 9, Hsize: 2, Vsize: 3, HSsize: 3, VSsize: 2},
	"9x9": {minimum_clue: 17, Hsize: 3, Vsize: 3, HSsize: 3, VSsize: 3},
	"16x16": {minimum_clue: 55, Hsize: 4, Vsize: 4, HSsize: 4, VSsize: 4}
}
var Hsize =  0;
var Vsize =  0;
var HSsize = 0;
var VSsize = 0;
var ListSudoku = {"4x4": [], "6x6": [], "9x9": [], "16x16": []}
var filename = "ListSudoku.json"

var worker_different = 1
var LowClueSudoku = []

function GetDataWorker(id)
{
	// var data = {type: type,grids: {}, gridcount: 10, sudokucount: 10, difficulty: Commun_difficulty["very-hard"]}
	var data = {type: Grid_type,grids: {}, gridcount: 1, difficulty: Commun_difficulty["inhuman"], id: id, Lowcluesudoku: LowClueSudoku}
	data.grids = [
		{X: 0, Y: 0, Predata: true},
		{X: 3, Y: 3, Predata: false},
		// {X: 12, Y: 0, Predata: true},
		// {X: 6, Y: 6, Predata: false},
		// {X: 0, Y: 12, Predata: true},
		// {X: 12, Y: 12, Predata: true},
	]
	return data
}


function Generate()
{
  if(typeof(Worker) !== "undefined") {
		for (let i = 0; i < worker_different; i++) {
			if (workers.length <= i) workers.push(undefined)
			if (workers[i] in window)
			{
				console.log("Start generating")
				workers[i] = new Worker("SudokuWorker.js");
				workers[i].onmessage = function(event) { Generation_Update(event.data)};
				workers[i].postMessage(GetDataWorker(i));
			}
		}
	}
	else {
    alert("Désoler, votre navigateur ne supporte pas les 'Web Workers' nécessaire pour cette application...");
  }
}

function Generation_Update(data)
{
	// {status: "", result: result, time: time, progress: progress} 
	// console.log("[" + data.id + "] ", data.status, "Advancement : ",Math.floor(data.progress * 1000) / 10.0, "% in", data.time / 1000, "s")
	if (data.status == "Finish")
	{
		// console.log(data)
		// for (let i = 0; i < data.result.length; i++) {
		// 	const grid_full = data.result[i];
		// 	DrawResult(data.griddata, grid_full.full)
		// 	for (let j = 0; j < grid_full.sudoku.length; j++) {
		// 		const sudoku = grid_full.sudoku[j];
		// 		DrawResult(data.griddata, sudoku)
		// 	}
		// }
		SaveData(data.result,data.griddata, data.id, data.type)
		StopGeneration()
	}
}

function SaveData(grid_list, grid_data, id, type)
{
	// Remove cell list from grid_data

	var data = {id: id, grid_data: grid_data, grids: []}
	for (let i = 0; i < grid_list.length; i++) {
		const grid_full = grid_list[i];
		var data_g = {
			full: GridToString(grid_full.full, grid_data["row"], grid_data["column"]), 
			sudoku: GridToString(grid_full.sudoku, grid_data["row"], grid_data["column"])}
		data.grids.push(data_g)
	}

	ListSudoku[type].push(data)
	// ListSudoku[type] = [data]
}

function Download()
{
	let jsonData = JSON.stringify(ListSudoku, null, "\t");
	var a = document.createElement("a");
    var file = new Blob([jsonData], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click()
}

function StopGeneration() 
{
	for (let i = 0; i < workers.length; i++) {
		if (workers[i])
		{
			workers[i].terminate();
			workers[i] = undefined
		}
	}
}



// Draw grid in the console
function DrawResult(grids_data, _cells_data)
{
	Hsize =  Parameters[Grid_type].Hsize;
	Vsize =  Parameters[Grid_type].Vsize;
	HSsize = Parameters[Grid_type].HSsize;
	VSsize = Parameters[Grid_type].VSsize;

	var result = [];
	for (let r = 0; r < grids_data["row"] * 2; r++) {
		result.push([])
		for (let c = 0; c < grids_data["column"] * 2; c++) {
				result[r].push(" ")
		}
	}
	grids_data.List.split("").forEach(grid_id => {
		var grid = grids_data[grid_id]
		console.log(grid)
		grid.cells.forEach(cell_id => {
			var cell = _cells_data[cell_id];
			var cell_pos = {X: cell_id % grids_data["column"],Y: Math.floor(cell_id / grids_data["column"])};
			let x = cell_pos.X * 2;
			let y = cell_pos.Y * 2;
			result[y][x] = cell.value
			if ((cell_pos.X - grid.X + 1) % HSsize == 0 && (cell_pos.X - grid.X) < HSsize * Hsize - 1)
			{
				result[y][x + 1] = "|"
				result[y+1][x + 1] = "|"
			}
			if ((cell_pos.Y - grid.Y + 1) % VSsize == 0 && (cell_pos.Y - grid.Y) < VSsize * Vsize - 1)
			{
				result[y + 1][x] = "-"
				result[y + 1][x + 1] = "-"
			}
			if (result[y][x + 1] == "|" && result[y + 1][x] == "-")
				result[y + 1][x + 1] = "+"
		})
	});

	var txt = "";
	result.forEach(element => {
		let t = element.join("").replaceAll("0", "#")
		let dt = t.replaceAll(" ", "").replaceAll("|", "")
		if (dt != "")
			txt += t + "\n"
	});
	console.log(txt)
}


function GridToString(_cells_data, row, column)
{
	var string = "";
	for (let y = 0; y < row; y++) {
		for (let x = 0; x < column; x++) {
			var id = GetCellId(x, y, column)
			if (_cells_data.hasOwnProperty(id))
			{
				var value = _cells_data[id].value
				if (value == "0")
					string += "."
				else
					string += value
			}
			else
			{
				string += " "
			}	
		}
	}
	return string
}

function GetCellId(X, Y, column)
{
	return X + Y * column;
}







function ProcessSudokuList(filecontent, index)
{
	let lines = filecontent.split('\r\n');
	lines.forEach(line => {
		if (line.length != 0)
		{
			LowClueSudoku.push(line)
		}
	})
	// console.log(LowClueSudoku.length)
	LoadQueue(index + 1)
}