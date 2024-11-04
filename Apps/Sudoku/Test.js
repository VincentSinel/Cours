// Iterate until grid is full
function Verifi(_cells_data, uniqueness_test = false, deep = 0, count = 0)
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