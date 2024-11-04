window.addEventListener('load', function() {
	InitialiseMenu();
})

var Type_Button = []
var SelectedSize = "9x9";
var SelectedType = 0;

var gridtype = {
	"4x4":[
		{col: 4, row: 4, gr: [{x: 0, y: 0}]},
		{col: 6, row: 6, gr: [{x: 0, y: 0},{x: 2, y: 2}]},
		{col: 8, row: 8, gr: [{x: 0, y: 0},{x: 2, y: 2},{x: 4, y: 4}]},
		{col: 7, row: 13, gr: [{x: 0, y: 0},{x: 3, y: 3},{x: 0, y: 6},{x: 3, y: 9}]},
		{col: 10, row: 10, gr: [{x: 0, y: 0},{x: 3, y: 3},{x: 0, y: 6},{x: 6, y: 0},{x: 6, y: 6}]},
		{col: 10, row: 10, gr: [{x: 0, y: 3},{x: 3, y: 0},{x: 3, y: 6},{x: 6, y: 3},]},
		{col: 8, row: 8, gr: [{x: 0, y: 0},{x: 2, y: 0},{x: 4, y: 0},{x: 0, y: 2},{x: 0, y: 4},{x: 2, y: 2},{x: 2, y: 4},{x: 4, y: 2},{x: 4, y: 4},]},
	],
	
	"6x6":[
		{col: 6, row: 6, gr: [{x: 0, y: 0}]},
		{col: 9, row: 8, gr: [{x: 0, y: 0},{x: 3, y: 2}]},
		{col: 12, row: 10, gr: [{x: 0, y: 0},{x: 3, y: 2},{x: 6, y: 4}]},
		{col: 10, row: 18, gr: [{x: 0, y: 0},{x: 4, y: 4},{x: 0, y: 8},{x: 4, y: 12}]},
		{col: 14, row: 14, gr: [{x: 0, y: 0},{x: 4, y: 4},{x: 0, y: 8},{x: 8, y: 0},{x: 8, y: 8}]},
		{col: 14, row: 14, gr: [{x: 0, y: 4},{x: 4, y: 0},{x: 4, y: 8},{x: 8, y: 4},]},
		{col: 12, row: 12, gr: [{x: 0, y: 0},{x: 3, y: 0},{x: 6, y: 0},{x: 0, y: 2},{x: 3, y: 2},{x: 6, y: 2},{x: 0, y: 4},{x: 3, y: 4},{x: 6, y: 4},{x: 0, y: 6},{x: 3, y: 6},{x: 6, y: 6},]},
	],
	
	"9x9":[
		{col: 9, row: 9, gr: [{x: 0, y: 0}]},
		{col: 12, row: 12, gr: [{x: 0, y: 0},{x: 3, y: 3}]},
		{col: 15, row: 15, gr: [{x: 0, y: 0},{x: 3, y: 3},{x: 6, y: 6}]},
		{col: 15, row: 27, gr: [{x: 0, y: 0},{x: 6, y: 6},{x: 0, y: 12},{x: 6, y: 18}]},
		{col: 21, row: 21, gr: [{x: 0, y: 0},{x: 6, y: 6},{x: 0, y: 12},{x: 12, y: 0},{x: 12, y: 12}]},
		{col: 21, row: 21, gr: [{x: 0, y: 6},{x: 6, y: 0},{x: 6, y: 12},{x: 12, y: 6},]},
		{col: 18, row: 18, gr: [{x: 0, y: 0},{x: 3, y: 0},{x: 6, y: 0},{x: 9, y: 0},{x: 0, y: 3},{x: 3, y: 3},{x: 6, y: 3},{x: 9, y: 3},{x: 0, y: 6},{x: 3, y: 6},{x: 6, y: 6},{x: 9, y: 6},{x: 0, y: 9},{x: 3, y: 9},{x: 6, y: 9},{x: 9, y: 9},]},
	],
	
	"12x12":[
		{col: 12, row: 12, gr: [{x: 0, y: 0}]},
		{col: 16, row: 15, gr: [{x: 0, y: 0},{x: 4, y: 3}]},
		{col: 20, row: 18, gr: [{x: 0, y: 0},{x: 4, y: 3},{x: 8, y: 6}]},
		{col: 20, row: 39, gr: [{x: 0, y: 0},{x: 8, y: 9},{x: 0, y: 18},{x: 8, y: 27}]},
		{col: 30, row: 30, gr: [{x: 0, y: 0},{x: 8, y: 9},{x: 0, y: 18},{x: 16, y: 0},{x: 16, y: 18}]},
		{col: 30, row: 30, gr: [{x: 0, y: 9},{x: 8, y: 0},{x: 8, y: 18},{x: 16, y: 9},]},
		{col: 24, row: 24, gr: [{x: 0, y: 0},{x: 4, y: 0},{x: 8, y: 0},{x:12, y: 0},{x: 0, y: 3},{x: 4, y: 3},{x: 8, y: 3},{x:12, y: 3},{x: 0, y: 6},{x: 4, y: 6},{x: 8, y: 6},{x:12, y: 6},{x: 0, y: 9},{x: 4, y: 9},{x: 8, y: 9},{x:12, y: 9},{x: 0, y:12},{x: 4, y:12},{x: 8, y:12},{x:12, y:12},]},
	],
	
	"16x16":[
		{col: 16, row: 16, gr: [{x: 0, y: 0}]},
		{col: 20, row: 20, gr: [{x: 0, y: 0},{x: 4, y: 4}]},
		{col: 24, row: 24, gr: [{x: 0, y: 0},{x: 4, y: 4},{x: 8, y: 8}]},
		{col: 28, row: 52, gr: [{x: 0, y: 0},{x: 12, y: 12},{x: 0, y: 24},{x: 12, y: 36}]},
		{col: 40, row: 40, gr: [{x: 0, y: 0},{x: 12, y: 12},{x: 0, y: 24},{x: 24, y: 0},{x: 24, y: 24}]},
		{col: 40, row: 40, gr: [{x: 0, y: 12},{x: 12, y: 0},{x: 12, y: 24},{x: 24, y: 12},]},
		{col: 32, row: 32, gr: [{x: 0, y: 0},{x: 4, y: 0},{x: 8, y: 0},{x:12, y: 0},{x:16, y: 0},{x: 0, y: 4},{x: 4, y: 4},{x: 8, y: 4},{x:12, y: 4},{x:16, y: 4},{x: 0, y: 8},{x: 4, y: 8},{x: 8, y: 8},{x:12, y: 8},{x:16, y: 8},{x: 0, y:12},{x: 4, y:12},{x: 8, y:12},{x:12, y:12},{x:16, y: 12},{x: 0, y:16},{x: 4, y:16},{x: 8, y:16},{x:12, y:16},{x:16, y: 16},]},
	],
}


function InitialiseMenu()
{
	LoadQueue(1)
	Type_Button = []
	Type_Button.push(document.getElementById("GenerateButton_Classique"))
	Type_Button.push(document.getElementById("GenerateButton_Double"))
	Type_Button.push(document.getElementById("GenerateButton_Triple"))
	Type_Button.push(document.getElementById("GenerateButton_Quadruple"))
	Type_Button.push(document.getElementById("GenerateButton_Samurai"))
	Type_Button.push(document.getElementById("GenerateButton_Cercle"))
	Type_Button.push(document.getElementById("GenerateButton_Tapis"))
	Type_Button.push(document.getElementById("GenerateButton_Custom"))

	RedrawGrid(SelectedSize, SelectedType);
}

function SelectMenu(id)
{
	SelectedType = id;
	Type_Button.forEach(button => {
		button.classList.remove("iconbutton-selected")
	})
	// console.log(Type_Button)
	Type_Button[id].classList.add("iconbutton-selected")

	RedrawGrid(SelectedSize, SelectedType);
}

function ChangeTypeSelection(index)
{
	if (index == 0) { SelectedSize = "4x4" }
	else if (index == 1) { SelectedSize = "6x6" }
	else if (index == 2) { SelectedSize = "9x9" }
	else if (index == 3) { SelectedSize = "12x12" }
	else if (index == 4) { SelectedSize = "16x16" }

	RedrawGrid(SelectedSize, SelectedType);
}

function insideGrid(x,y,data, size)
{
	if (x < 0 || y < 0) return false
	if (x >= data.col || y >= data.row) return false
	var result = false;
	data.gr.forEach(e => 
	{
		if (x >= e.x && y >= e.y && x < e.x + size && y < e.y + size )
		{
			result = true;
			return;
		}
	})
	return result;
}

function RedrawGrid(type, button_type)
{
	var table = document.getElementById("Preview")
	table.innerHTML = "";
	table.className = "";

	var data = gridtype[type][button_type];
	var col = data.col
	var row = data.row
	var size = 4;
	var sq_w = 0;
	var sq_h = 0;
	if (type == "4x4") { size = 4; sq_w = 2; sq_h = 2; }
	else if (type == "6x6") { size = 6; sq_w = 3; sq_h = 2; }
	else if (type == "9x9") { size = 9; sq_w = 3; sq_h = 3; }
	else if (type == "12x12") { size = 12; sq_w = 4; sq_h = 3; }
	else if (type == "16x16") { size = 16; sq_w = 4; sq_h = 4; }

	if (row < 12) table.classList.add("previewtable_size_36")
	else if (row < 16) table.classList.add("previewtable_size_24")
	else if (row < 20) table.classList.add("previewtable_size_20")
	else if (row < 24) table.classList.add("previewtable_size_18")
	else if (row < 32) table.classList.add("previewtable_size_14")
	else table.classList.add("previewtable_size_10")


	for (let y = 0; y < row; y++) {
		var current_row = document.createElement("tr")
		for (let x = 0; x < col; x++) {
			var current_col = document.createElement("td")

			if (!insideGrid(x, y, data, size))
			{
				current_col.classList.add("noborder");
			}
			else
			{
				current_col.classList.add("gt");

				data.gr.forEach(e => 
				{
					if (x >= e.x && y >= e.y && x < e.x + size && y < e.y + size )
					{
						var dx = (x - e.x) % sq_w;
						var dy = (y - e.y) % sq_h;
						if (dx == 0) current_col.classList.add("gt-left");
						if (dx == sq_w - 1) current_col.classList.add("gt-right");
						if (dy == 0) current_col.classList.add("gt-top");
						if (dy == sq_h - 1) current_col.classList.add("gt-bottom");
					}
				})

				if (!insideGrid(x - 1, y, data, size)) current_col.classList.add("gtb-left");
				if (!insideGrid(x + 1, y, data, size)) current_col.classList.add("gtb-right");
				if (!insideGrid(x, y - 1, data, size)) current_col.classList.add("gtb-top");
				if (!insideGrid(x, y + 1, data, size)) current_col.classList.add("gtb-bottom");
			}	

			current_row.appendChild(current_col);
		}
		table.appendChild(current_row)
	}
}



function Draw()
{
	
	DrawPreview(ListSudoku)
}


function DrawPreview(sudokulist = null)
{
	var type = "9x9"
	Hsize =  Parameters[type].Hsize;
	Vsize =  Parameters[type].Vsize;
	HSsize = Parameters[type].HSsize;
	VSsize = Parameters[type].VSsize;

	if (sudokulist[type].length == 0) return;

	var table = document.getElementById("Preview")
	table.innerHTML = "";
	var grid_data = sudokulist[type][0]["grid_data"]
	var string = sudokulist[type][0]["grids"][0]["sudoku"];
	var column = grid_data["column"]
	var row = grid_data["row"]
	for (let y = 0; y < row; y++) {
		var current_row = document.createElement("tr")
		for (let x = 0; x < column; x++) {

			var char = string[x + y * column]
				
			var current_col = document.createElement("td")

			if (char != " ")
			{
				current_col.classList.add("st")
				var gridlist = []
				grid_data["List"].split("").forEach(grid_id => {
					const grid = grid_data[grid_id]
					if (x >= grid.X && x < grid.X + Hsize * HSsize && 
							y >= grid.Y && y < grid.Y + Vsize * VSsize)
							gridlist.push([x - grid.X, y - grid.Y])
				})

				gridlist.forEach(grid => {
					if (grid[1] % VSsize == 0) current_col.classList.add("st-top")
					if (grid[1] % VSsize == VSsize - 1) current_col.classList.add("st-bottom")
					if (grid[0] % HSsize == 0) current_col.classList.add("st-left")
					if (grid[0] % HSsize == HSsize - 1) current_col.classList.add("st-right")
				})

				if (y == 0) current_col.classList.add("stb-top")
				else if (string[x + (y - 1) * column] == " ") current_col.classList.add("stb-top")

				if (y == row - 1) current_col.classList.add("stb-bottom")
				else if (string[x + (y + 1) * column] == " ") current_col.classList.add("stb-bottom")

				if (x == 0) current_col.classList.add("stb-left")
				else if (string[x - 1 + y * column] == " ") current_col.classList.add("stb-left")

				if (x == column - 1) current_col.classList.add("stb-right")
				else if (string[x + 1 + y * column] == " ") current_col.classList.add("stb-right")
				
				if (char != ".")
					current_col.innerHTML = char
			}

			current_row.appendChild(current_col);
		}
		table.appendChild(current_row)
	}
}



function Test()
{
}

function LoadQueue(index)
{
	if (index > 11) return;
	var client = new XMLHttpRequest();
	client.open('GET', 'Sudoku' + String(index).padStart(2, '0') + '.txt');
	client.onreadystatechange = function() {
		if (client.readyState === 4){ 
			ProcessSudokuList(client.responseText, index);
		}
	}
	client.send();
}

