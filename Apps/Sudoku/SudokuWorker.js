var Global_Digits = "123456789ABCDEFG"
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
var digits = ""
var grids_data = {}
var cells_data = {}
var cells_correspondance = {}
var all_cells_id = []
var Gen_status = 0;
var difficulty = Infinity;
var Worker_ID = "Worker 1";
var type = "9x9";
var LowClueSudoku = [];

var GridGenerationCount
var GridSymbole = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,;:!?./§ù%*µ$£¤<>&é#{([-|è_çà@)]=}+°²€"

var RequireGrid = 0


onmessage = function(e) {
	Load_Parameters(e.data)
}

function Load_Parameters(data)
{
	Worker_ID = "Worker " + data.id.toString()
	type = data.type;
	LowClueSudoku = data.Lowcluesudoku
	Hsize =  Parameters[type].Hsize;
	Vsize =  Parameters[type].Vsize;
	HSsize = Parameters[type].HSsize;
	VSsize = Parameters[type].VSsize;
	
	digits = ""
	for (let i = 0; i < Hsize * Vsize; i++) {
		digits += Global_Digits[i];
	}

	var index = 0;
	var List = "";
	data.grids.forEach(gridcoord => {
		
		var symbole = GridSymbole[index];
		// var grid_d =  {cells: [], X: gridcoord.X, Y: gridcoord.Y}
		var grid_d =  { X: gridcoord.X, Y: gridcoord.Y, Predata: gridcoord.Predata}
		List += symbole;
		grids_data[symbole] = grid_d;
		index++;
	});
	grids_data["List"] = List;


	CreateData()
	difficulty = Math.max(Parameters[type].minimum_clue, Math.min(all_cells_id.length, data.difficulty * grids_data["List"].length))

	RequireGrid = data.gridcount;
	Generate()
}

function CreateData()
{
	grids_data["column"] = 0;
	grids_data["row"] = 0;
	// Calculate total size
	grids_data["List"].split("").forEach(grid_id => {
		let grid_data = grids_data[grid_id]
		grids_data["column"] = Math.max(grids_data["column"], grid_data.X + Hsize * HSsize)
		grids_data["row"] = Math.max(grids_data["row"], grid_data.Y + Vsize * VSsize)
	});
	
	for (let y = 0; y < grids_data["row"]; y++) {
		for (let x = 0; x < grids_data["column"]; x++) {

			let grids = []
			grids_data["List"].split("").forEach(grid_id => {
				let grid_data = grids_data[grid_id]
				
				if (grid_data.X <= x && grid_data.X + HSsize * Hsize > x)
				{
					if (grid_data.Y <= y && grid_data.Y + VSsize * Vsize > y)
					{
						grids.push(grid_id)
					}	
				}
			});

			// Cell outside the grids
			if (grids.length == 0) continue;


			var sc = Math.floor(x / HSsize)
			var sr = Math.floor(y / VSsize)
			var id = GetCellId(x, y);
			
			// save new cell
			cells_data[id] = {value: "0", possibility: digits}
			cells_correspondance[id] = {X: x, Y: y, SX: sc, SY: sr, grid: grids, peers: [], Predata: {}}
			all_cells_id.push(id)
			
			// add cell to grids content
			// grids.forEach(grid_id => {
			// 	if (grids_data.hasOwnProperty(grid_id))
			// 		grids_data[grid_id].cells.push(id);
			// 	else
			// 		grids_data[grid_id] = {cells:[id]}
			// });
		}
	}

	all_cells_id.forEach(id => {
		const cell = cells_correspondance[id];
		peers = [];
		for (let i = 0; i < cell.grid.length; i++) {
			let grid = grids_data[cell.grid[i]];
			for(let dx = 0; dx < HSsize * Hsize; dx++)
				peers.push(GetCellId(grid.X + dx, cell.Y))
			for(let dy = 0; dy < VSsize * Vsize; dy++)
				peers.push(GetCellId(cell.X, grid.Y + dy))

			let sx = grid.X + Math.floor((cell.X - grid.X) / HSsize) * HSsize
			let sy = grid.Y + Math.floor((cell.Y - grid.Y) / VSsize) * VSsize
			for(let dx = 0; dx < HSsize; dx++)
				for(let dy = 0; dy < VSsize; dy++)
					peers.push(GetCellId(sx + dx, sy + dy))
		}

		peers = uniq(peers);

		var index = peers.indexOf(id);
		while (index > -1)
		{
			peers.splice(index, 1);
			index = peers.indexOf(id);
		}

		cells_correspondance[id].peers = peers
	})
}



function PostData(time, index, result = [])
{
	var progress = index * 1.0 / RequireGrid
	var data = {status: "", result: result, time: time, progress: progress, griddata: grids_data, id: Worker_ID, type: type} 
	if (Gen_status == 0) data.status = "Generating";
	if (Gen_status == 1) data.status = "Finish";

	postMessage(data)
}

var start_time = 0;
var last_time_print = 0;

// Generate a bunch of sudoku
function Generate()
{
	start_time = Date.now()
	var grids_list = [];
	for (let i = 0; i < RequireGrid; i++) {
		var grid_info = {full: "", sudoku: ""}
		var result = {solutions: false};
		var premade_grid = {}

		grids_data["List"].split("").forEach(grid_id => {
			if (grids_data[grid_id].Predata)
			{
				premade_grid = LoadGridFromString(
						premade_grid,
						LowClueSudoku[Math.floor(LowClueSudoku.length * Math.random())],
						grids_data[grid_id].X,
						grids_data[grid_id].Y)
			}
		});

		while (!result.solutions)
		{
			ClearGrid(premade_grid, cells_data);
			result = Search(Clone(cells_data))
		}
		if (CheckGrid(result.solutions[0]) !=0)
		{
			i--;
			continue;
		}
		grid_info.full = result.solutions[0]
		var _empty_data = Empty(Clone(grid_info.full))
		ClearOnlyPremadeGrid(_empty_data, premade_grid)
		var c = 0;
		all_cells_id.forEach(id_c => {
			if (_empty_data[id_c].value != "0") c++
		})
		grid_info.sudoku = _empty_data
		let e = Date.now()
		// console.log("[" + Worker_ID + "] ","Last grid satisfaction", c,"cell still full over", difficulty, "required :", Math.floor((all_cells_id.length - c) / (all_cells_id.length - difficulty) * 1000.0) / 10.0, "%" )
		PostData(e - start_time, i)
		grids_list.push(grid_info)
	}
	Gen_status = 1
	let e = Date.now()
	PostData(e - start_time, RequireGrid, grids_list)
}

function PrintTime()
{
	var e = (Date.now() - start_time) / 1000.0
	if (e > last_time_print)
	{
		console.log("[" + Worker_ID + "] ","still running", e, "s")
		last_time_print += 10
	}
}

// Remove cell value until a certain difficulty is found, ensure solution is unique
function Empty(_cells_data)
{
	var maxtry_bf_giveup = 200;
	var try_bf_giveup = 0;
	var try_bf_reduce = 5;
	// Clone and shuffle cell id to remove value one by one 
	var ids = Clone(all_cells_id)
	ids.shuffle()
	var i = 0
	while(i < ids.length)
	{
		if (_cells_data[ids[i]].value == "0")
			{
				ids.splice(i, 1);
			}
			else
			i++;
	}
	var remove_simultaneous = Math.floor(ids.length / 10);
	var Count = ids.length
	// console.log(_cells_data)
	// console.log(ids)
	// While not enought value is removed or all value hasn't been check
	while (Count > difficulty && maxtry_bf_giveup >= try_bf_giveup)
	{
		var ids_clone = [];
		var success = false
		var test_count = 0
		// While there is no success in value change or the number of try is not hit
		while(!success && test_count < try_bf_reduce)
		{
			// If we remove more than 1 by 1, reclone and shuffle the ids_clone  
			if (remove_simultaneous > 1)
			{
				ids_clone = Clone(ids);
				ids_clone.shuffle()
			}
			else if (ids_clone.length == 0) break; // else and all value tested, break (there is no more cell than can be removed)
			// Clone data before change
			var new_data = Clone(_cells_data);
			// Change as many as cell as we want
			for (let i = 0; i < remove_simultaneous; i++) {
				if (ids_clone.length == 0) break;
				// Get next cell id
				var id = ids_clone.pop();
				// Remove the selected cell value
				new_data[id].value = "0"
				// Recalculate possibility for cell and peers
				new_data = RecalculPossibility(new_data, id, _cells_data[id].value)
			}
			// Search a solution (and only one)
			result = Search(Clone(new_data), true)
			// Show user, worker still running
			// PrintTime()
			// If solution is found and unique
			if (result.solutions)
			{
				// Keep this new grid without the value
				_cells_data = new_data;

				// Count one value removed
				Count -= remove_simultaneous;
				// Tell the simultaneous value remove worked
				success = true
			}
			test_count += 1
		}
		// If success, save ids left and reset the giveup try count
		if (success)
		{
			ids = ids_clone
			try_bf_giveup = 0;
		}
		else // Else, reduce the number of simultaneous removed value and increment the giveup try counter
		{
			remove_simultaneous = Math.max(1, remove_simultaneous - 1);
			if (remove_simultaneous == 1)
				try_bf_reduce = all_cells_id.length
			try_bf_giveup += 1;
		}
	}
	return _cells_data;
}

// Recalculate all possibility for all peers cell of a emptied one
function RecalculPossibility(_cells_data, cell_id, old_value)
{
	// Possibility of the changed cell
	var possibility = digits.shuffle()
	// For each peers of the cell
	cells_correspondance[cell_id].peers.forEach(id => {
		// Get peer cell
		let peer_cell =_cells_data[id]; 
		// if peer is set
		if (peer_cell.value != "0")
		{
			// Remove the value from possibility
			possibility = possibility.replace(peer_cell.value,'');
		}
		else // else
		{
			// if cell miss the possibility of the removed value, add it
			if (peer_cell.possibility.indexOf(old_value) == -1)
			{
				peer_cell.possibility = old_value + peer_cell.possibility;
			}
			_cells_data[id] = peer_cell
		}
	})
	// Set possibility of the removed value
	_cells_data[cell_id].possibility = possibility;
	return _cells_data
}

// Check if a grid is really full (ensure there is no error)
function CheckGrid(_cells_data)
{
	var error = 0
	all_cells_id.forEach(id => {
		if (_cells_data[id].value == "0")
		{
			error += 1
		}
	})
	return error
}

// Iterate until grid is full
function Search(_cells_data, uniqueness_test = false, deep = 0, count = 0)
{
	// If cell data is false exit the recursion
	if (!_cells_data) return {solutions: false, count: count}
	// Get the minimum possibility cell
	var selected_cell = MinPossibilityCell(_cells_data)
	// If no cell available, the grid is full
	if (selected_cell == null)
	{
		return {solutions: [_cells_data], count: count}
	}
	// get selected cell
	var cell = _cells_data[selected_cell]

	var solutions = []
	// Iterate over all possibility
	for (let i = 0; i < cell.possibility.length; i++) {
		const value = cell.possibility[i];
		// Search with this new possibility set
		var solution = Search(Fill(Clone(_cells_data), selected_cell, value), uniqueness_test, deep+1, count + 1)
		count = solution.count

		// If too many attempt stop the recursion (something wrong with the suffle)
		if (count > 1000)
		{
			return {solutions: false, count: count + 10}
		} 
		
		// If a solution exist
		if (solution.solutions)
		{
			// If uniqueness is test, continue until two possibility is or every possibility is tested
			if (uniqueness_test)
			{
				solutions = solutions.concat(solution.solutions);
				if (solutions.length > 1)
				{
					return {solutions: false, count: count}
				}
			}
			else // Else return the first solution found
				return {solutions: solution.solutions, count: count}
		}
	}
	// if solution not found previously, return false
	if (solutions.length == 0)
		return {solutions: false, count: count};
	else
		return {solutions: solutions, count: count};
}

// Fill cell data and iterate if only one possibility persist for a a cell 
function Fill(_cells_data, cell_id, value)
{
	var update = [];
	// Set new value
	_cells_data[cell_id].value = value;
	_cells_data[cell_id].possibility = "";
	// Remove value for each peers and add them to the update list
	cells_correspondance[cell_id].peers.forEach(id => {
		// Get peer cell
		let peer_cell =_cells_data[id]; 
		// if peer is not set
		if (peer_cell.value == "0")
		{
			// remove value from possibility
			peer_cell.possibility = peer_cell.possibility.replace(value,'');
			// Add this cell to update
			update.push(id);
		}
		_cells_data[id] = peer_cell;
	})

	var count = 0;
	// While update list is not empty
	while (update.length > 0)
	{
		// Get first update cell
		let current_id = update.pop();
		count++;
		let current_cell = _cells_data[current_id];

		// if value is already set, continue
		if(current_cell.value != "0") continue;
		// if possibility is empty, grid is unsolvable
		if(current_cell.possibility == "") return false;
		// if multiple possibility exist, nothing can be change 
		if (current_cell.possibility.length > 1) continue;

		// if only one possibility exist, set the value of the cell
		current_cell.value = current_cell.possibility;
		let local_value = current_cell.value
		_cells_data[current_id] = current_cell;

		// Remove value for each peers and add them to the update list
		cells_correspondance[current_id].peers.forEach(id => {
			// Get peer cell
			let peer_cell = _cells_data[id]; 
			// if peer is not set
			if (peer_cell.value == "0")
			{
				// remove value from possibility
				peer_cell.possibility = peer_cell.possibility.replace(local_value,'');
				// Add this cell to update
				update.push(id);
			}
			_cells_data[id] = peer_cell;
		})

		if (count > 500)
		{
			return false
		} 
	}

	// return filled cell data
	return _cells_data
}

// Get the cell with the minimum possibility left
function MinPossibilityCell(_cells_data)
{
	let minid = null;
	let length = digits + 1;
	all_cells_id.forEach(id => {
		if (_cells_data[id].value == "0")
		{
			// if there is only 2 possibility it can't be better then stop and return 
			if (_cells_data[id].possibility.length == 2)
			{
				minid = id
				return id
			}
			if (!minid || (_cells_data[id].possibility.length < length))
			{
				minid = id;
				length = _cells_data[id].possibility.length;
			}
		}
	})
	return minid
}


function GridToString(_cells_data)
{
	var string = "";
	for (let y = 0; y < grids_data["row"]; y++) {
		for (let x = 0; x < grids_data["column"]; x++) {
			var id = GetCellId(x, y)
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

function LoadPremadeSudoku()
{
	
}

{ // TOOLS

	function GetCellId(X, Y)
	{
		return X + Y * grids_data["column"];
	}

	Array.prototype.shuffle = function() {
		let currentIndex = this.length;
	
		// While there remain elements to shuffle...
		while (currentIndex != 0) {
	
			// Pick a remaining element...
			let randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
	
			// And swap it with the current element.
			[this[currentIndex], this[randomIndex]] = [
				this[randomIndex], this[currentIndex]];
		}
	}
	
	function uniq(a) {
		var seen = {};
		return a.filter(function(item) {
				return seen.hasOwnProperty(item) ? false : (seen[item] = true);
		});
	}
	
	String.prototype.shuffle = function () {
		var a = this.split(""),
				n = a.length;
	
		for(var i = n - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var tmp = a[i];
				a[i] = a[j];
				a[j] = tmp;
		}
		return a.join("");
	}

	function ClearGrid(premade_grid, _cells_data)
	{
		all_cells_id.forEach(id => {
			if (premade_grid.hasOwnProperty(id))
			{
				_cells_data[id] = {value: premade_grid[id], possibility: digits.shuffle()}
			}
			else
			{
				_cells_data[id] = {value: "0", possibility: digits.shuffle()}
			}
		});
		all_cells_id.shuffle()
		RecalculAllPossibility(_cells_data)
	}


	function ClearOnlyPremadeGrid(_cells_data, premade_grid)
	{
		all_cells_id.forEach(cell_id => {
			if (cells_correspondance[cell_id].grid.length == 1)
			{
				let grid_id = cells_correspondance[cell_id].grid
				if (grids_data[grid_id].Predata)
				{
					_cells_data[cell_id] = {value: premade_grid[cell_id], possibility: digits.shuffle()}
				}
			}
		});
		all_cells_id.shuffle()
		RecalculAllPossibility(_cells_data)
	}
	
	function Clone(data)
	{
		return JSON.parse(JSON.stringify(data));
	}

	function RecalculAllPossibility(_cells_data)
	{
		all_cells_id.forEach(cell_id => {
			var possibility = digits.shuffle()
			cells_correspondance[cell_id].peers.forEach(id => {
				var cell = _cells_data[id]
				if (cell.value != "0")
					possibility = possibility.replace(cell.value, "")
			})
			_cells_data[cell_id].possibility = possibility;
		});
		// console.log(_cells_data)
	}

	function LoadGridFromString(data, grid, X, Y)
	{
		for (let dx = 0; dx < Hsize * HSsize; dx++) {
			for (let dy = 0; dy < Vsize * VSsize; dy++) {
				var x = X + dx;
				var y = Y + dy;
				var pos_str = dx + dy * Hsize * HSsize;
				var cell_id = GetCellId(x,y)
				if (grid[pos_str] == ".") data[cell_id] = "0"
				else data[cell_id] = grid[pos_str]
			}
		}
		return data;
	}
}



// Draw grid in the console
function DrawResult(_cells_data)
{
	var result = [];
	for (let r = 0; r < grids_data["row"] * 2; r++) {
		result.push([])
		for (let c = 0; c < grids_data["column"] * 2; c++) {
				result[r].push(" ")
		}
	}
	grids_data.List.split("").forEach(grid_id => {
		var grid = grids_data[grid_id]
		grid.cells.forEach(cell_id => {
			var cell = _cells_data[cell_id];
			var cell_pos = cells_correspondance[cell_id];
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
	console.log("[" + Worker_ID + "] ", txt)
}