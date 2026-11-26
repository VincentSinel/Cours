@tool
extends Node2D

enum tiletype {Basique, Mario, A2, A3, A4}

## type d'autotile
@export var type : tiletype
## tileset à modifier
@export var tileset : TileSet;
## premier index de l'atlas de tuile
@export var id_debut : int = 0;
## dernier index de l'atlas de tuile
@export var id_fin : int = 0;

## Génére tous les autotiles des atlas de tuile compris entre le premier et le dernier donné dans le tileset
@export_tool_button("Créer l'autotile")
var execute = create_auto_tile
## Génére tous les autotiles des atlas de tuile compris entre le premier et le dernier donné dans le tileset
@export_tool_button("Rendre toutes les tuiles solides")
var collision = full_collision


func create_auto_tile():
	var count = tileset.get_terrain_sets_count()
	while count != 3:
		tileset.add_terrain_set();
		count += 1
	tileset.set_terrain_set_mode(0, TileSet.TERRAIN_MODE_MATCH_CORNERS_AND_SIDES)
	tileset.set_terrain_set_mode(1, TileSet.TERRAIN_MODE_MATCH_SIDES)
	tileset.set_terrain_set_mode(2, TileSet.TERRAIN_MODE_MATCH_CORNERS)
	
	if (type == tiletype.Basique):
		Basique_execute()
	elif (type == tiletype.Mario):
		Mario_execute()
	elif (type == tiletype.A2):
		A2_execute()
	elif (type == tiletype.A3):
		A3_execute()
	elif (type == tiletype.A4):
		A4_execute()
		
	ResourceSaver.save(tileset)

func Basique_execute():
	for i in range(id_debut, id_fin + 1):
		if (!tileset.has_source(i)):
			continue
		var found_index = -1
		for j in range(0, tileset.get_terrains_count(0)):
			if (tileset.get_terrain_name(0, j) == "ID " + str(i)):
				found_index = j
		if (found_index == -1):
			tileset.add_terrain(0);
			tileset.set_terrain_name(0, tileset.get_terrains_count(0) - 1, "ID " + str(i));
		var tileatlas = tileset.get_source(i) as TileSetAtlasSource
		set_match_corners_size_terrain_B(tileatlas, found_index);


func Mario_execute():
	for i in range(id_debut, id_fin + 1):
		if (!tileset.has_source(i)):
			continue
		var found_index = -1
		for j in range(0, tileset.get_terrains_count(0)):
			if (tileset.get_terrain_name(0, j) == "ID " + str(i)):
				found_index = j
		if (found_index == -1):
			tileset.add_terrain(0);
			tileset.set_terrain_name(0, tileset.get_terrains_count(0) - 1, "ID " + str(i));
		var tileatlas = tileset.get_source(i) as TileSetAtlasSource
		set_match_corners_sides_terrain_M(tileatlas, found_index);

func A2_execute():
	for i in range(id_debut, id_fin + 1):
		if (!tileset.has_source(i)):
			continue
		var found_index = -1
		for j in range(0, tileset.get_terrains_count(0)):
			if (tileset.get_terrain_name(0, j) == "ID " + str(i)):
				found_index = j
		if (found_index == -1):
			tileset.add_terrain(0);
			tileset.set_terrain_name(0, tileset.get_terrains_count(0) - 1, "ID " + str(i));
		var tileatlas = tileset.get_source(i) as TileSetAtlasSource
		set_match_corners_sides_terrain(tileatlas, found_index);

func A3_execute():
	for i in range(id_debut, id_fin + 1):
		if (!tileset.has_source(i)):
			continue
		var found_index = [-1, -1]
		for j in range(0, tileset.get_terrains_count(1)):
			if (tileset.get_terrain_name(1, j) == "ID " + str(i) + "_L"):
				found_index[0] = j
			if (tileset.get_terrain_name(1, j) == "ID " + str(i) + "_R"):
				found_index[1] = j
		if (found_index[0] == -1):
			tileset.add_terrain(1);
			found_index[0] = tileset.get_terrains_count(1) - 1
			tileset.set_terrain_name(1, found_index[0], "ID " + str(i) + "_L");
		if (found_index[1] == -1):
			tileset.add_terrain(1);
			found_index[1] = tileset.get_terrains_count(1) - 1
			tileset.set_terrain_name(1, found_index[1], "ID " + str(i) + "_R");
		var tileatlas = tileset.get_source(i) as TileSetAtlasSource
		
		set_match_sides_terrain(tileatlas, found_index[0]);
		set_match_sides_terrain(tileatlas, found_index[1], Vector2(4,0));

func A4_execute():
	for i in range(id_debut, id_fin + 1):
		if (!tileset.has_source(i)):
			continue
		var found_index = [-1, -1]
		for j in range(0, tileset.get_terrains_count(0)):
			if (tileset.get_terrain_name(0, j) == "ID " + str(i) + "_L"):
				found_index[0] = j
		for j in range(0, tileset.get_terrains_count(1)):
			if (tileset.get_terrain_name(1, j) == "ID " + str(i) + "_R"):
				found_index[1] = j
		if (found_index[0] == -1):
			tileset.add_terrain(0);
			found_index[0] = tileset.get_terrains_count(0) - 1
			tileset.set_terrain_name(0, found_index[0], "ID " + str(i) + "_L");
		if (found_index[1] == -1):
			tileset.add_terrain(1);
			found_index[1] = tileset.get_terrains_count(1) - 1
			tileset.set_terrain_name(1, found_index[1], "ID " + str(i) + "_R");
		var tileatlas = tileset.get_source(i) as TileSetAtlasSource
		
		set_match_corners_sides_terrain(tileatlas, found_index[0]);
		set_match_sides_terrain(tileatlas, found_index[1], Vector2(12,0));

func set_match_corners_size_terrain_B(tileatlas : TileSetAtlasSource, terrain : int):
	for k in range(0, 48):
		var x = k % 12;
		var y = floor(k / 12.0);
		if (k == 22): continue;
		var data = tileatlas.get_tile_data(Vector2(x, y),0)
		prints(data, k)
		data.terrain_set = 0;
		data.terrain = terrain;
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_TOP_LEFT_CORNER, terrain if get_cell_neighbor_m(k, 0) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_TOP_SIDE, terrain if get_cell_neighbor_m(k, 1) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_TOP_RIGHT_CORNER, terrain if get_cell_neighbor_m(k, 2) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_LEFT_SIDE, terrain if get_cell_neighbor_m(k, 3) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_RIGHT_SIDE, terrain if get_cell_neighbor_m(k, 4) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_BOTTOM_LEFT_CORNER, terrain if get_cell_neighbor_m(k, 5) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_BOTTOM_SIDE, terrain if get_cell_neighbor_m(k, 6) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_BOTTOM_RIGHT_CORNER, terrain if get_cell_neighbor_m(k, 7) else -1)

func set_match_corners_sides_terrain_M(tileatlas : TileSetAtlasSource, terrain : int):
	for k in range(0, 78):
		var x = k % 12;
		var y = floor(k / 12.0);
		if (k > 68):
			x = k - 69;
			y = 6;
		if (k == 22): continue;
		var data = tileatlas.get_tile_data(Vector2(x, y),0)
		print(data)
		data.terrain_set = 0;
		data.terrain = terrain;
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_TOP_LEFT_CORNER, terrain if get_cell_neighbor_m(k, 0) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_TOP_SIDE, terrain if get_cell_neighbor_m(k, 1) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_TOP_RIGHT_CORNER, terrain if get_cell_neighbor_m(k, 2) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_LEFT_SIDE, terrain if get_cell_neighbor_m(k, 3) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_RIGHT_SIDE, terrain if get_cell_neighbor_m(k, 4) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_BOTTOM_LEFT_CORNER, terrain if get_cell_neighbor_m(k, 5) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_BOTTOM_SIDE, terrain if get_cell_neighbor_m(k, 6) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_BOTTOM_RIGHT_CORNER, terrain if get_cell_neighbor_m(k, 7) else -1)

func set_match_sides_terrain(tileatlas : TileSetAtlasSource, terrain : int, offset : Vector2 = Vector2.ZERO):
	for k in range(0, 16):
		var x = k % 4;
		@warning_ignore("integer_division")
		var y = floor(k / 4.0);
		var data = tileatlas.get_tile_data(Vector2(x, y) + offset,0)
		data.terrain_set = 1;
		data.terrain = terrain;
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_TOP_SIDE, terrain if get_cell_neighbor_s(k, 0) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_LEFT_SIDE, terrain if get_cell_neighbor_s(k, 1) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_RIGHT_SIDE, terrain if get_cell_neighbor_s(k, 2) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_BOTTOM_SIDE, terrain if get_cell_neighbor_s(k, 3) else -1)
		
func set_match_corners_sides_terrain(tileatlas : TileSetAtlasSource, terrain : int, offset : Vector2 = Vector2.ZERO):
	for k in range(0, 47):
		var x = k % 12;
		@warning_ignore("integer_division")
		var y = floor(k / 12.0);
		var data = tileatlas.get_tile_data(Vector2(x, y) + offset,0)
		data.terrain_set = 0;
		data.terrain = terrain;
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_TOP_LEFT_CORNER, terrain if get_cell_neighbor_cs(k, 0) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_TOP_SIDE, terrain if get_cell_neighbor_cs(k, 1) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_TOP_RIGHT_CORNER, terrain if get_cell_neighbor_cs(k, 2) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_LEFT_SIDE, terrain if get_cell_neighbor_cs(k, 3) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_RIGHT_SIDE, terrain if get_cell_neighbor_cs(k, 4) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_BOTTOM_LEFT_CORNER, terrain if get_cell_neighbor_cs(k, 5) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_BOTTOM_SIDE, terrain if get_cell_neighbor_cs(k, 6) else -1)
		data.set_terrain_peering_bit(TileSet.CELL_NEIGHBOR_BOTTOM_RIGHT_CORNER, terrain if get_cell_neighbor_cs(k, 7) else -1)

func get_cell_neighbor_b(id : int, dir : int) -> bool:
	if (dir == 0):
		return [4,18,23,29,30,31,33,34,35,42,45,46,47,55,56,57,58,59,70,71,72,73,74,75,76,77].has(id)
	if (dir == 1):
		return [4,7,9,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,33,34,35,40,41,42,43,44,45,46,47,55,56,57,58,59,64,65,66,67,68,69,70,71,72,73,74,75,76,77].has(id)
	if (dir == 2):
		return [7,17,20,21,28,29,30,32,33,41,44,45,46,56,57,58,59,64,65,66,67,68,69,70,71,72].has(id)
	if (dir == 3):
		return [2,3,4,5,6,7,9,10,11,14,15,17,18,19,21,23,26,27,29,30,31,32,33,34,35,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,62,63,70,71,72,73,74,75,76,77].has(id)
	if (dir == 4):
		return [1,2,4,5, 6,7,8,9,10,13,14,16,17,18,20,21,23,25,26,28,29,30,32,33,34,37,38,40,41,42,43,44,45,46,48,49,50,51,52,53,54,56,57,58,59,60,61,64,65,66,67,68,69,70,71,72].has(id)
	if (dir == 5):
		return [6,9,10,11,17,18,19,21,23,30,33,35,40,51,52,53,54,56,57,58,59,62,63,73,74,75,76,77].has(id)
	if (dir == 6):
		return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,23,28,29,30,31,32,33,34,35,40,43,46,51,52,53,54,56,57,58,59,60,61,62,63,64,65,66,67,68,73,74,75,76,77].has(id)
	if (dir == 7):
		return [5,8,9,10,16,17,18,20,29,32,33,34,43,51,52,53,54,56,57,58,59,60,61,64,65,66,67,68].has(id)
	return false

func get_cell_neighbor_m(id : int, dir : int) -> bool:
	if (dir == 0):
		return [4,18,23,29,30,31,33,34,35,42,45,46,47,55,56,57,58,59,70,71,72,73,74,75,76,77].has(id)
	if (dir == 1):
		return [4,7,9,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,33,34,35,40,41,42,43,44,45,46,47,55,56,57,58,59,64,65,66,67,68,69,70,71,72,73,74,75,76,77].has(id)
	if (dir == 2):
		return [7,17,20,21,28,29,30,32,33,41,44,45,46,56,57,58,59,64,65,66,67,68,69,70,71,72].has(id)
	if (dir == 3):
		return [2,3,4,5,6,7,9,10,11,14,15,17,18,19,21,23,26,27,29,30,31,32,33,34,35,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,62,63,70,71,72,73,74,75,76,77].has(id)
	if (dir == 4):
		return [1,2,4,5, 6,7,8,9,10,13,14,16,17,18,20,21,23,25,26,28,29,30,32,33,34,37,38,40,41,42,43,44,45,46,48,49,50,51,52,53,54,56,57,58,59,60,61,64,65,66,67,68,69,70,71,72].has(id)
	if (dir == 5):
		return [6,9,10,11,17,18,19,21,23,30,33,35,40,51,52,53,54,56,57,58,59,62,63,73,74,75,76,77].has(id)
	if (dir == 6):
		return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,23,28,29,30,31,32,33,34,35,40,43,46,51,52,53,54,56,57,58,59,60,61,62,63,64,65,66,67,68,73,74,75,76,77].has(id)
	if (dir == 7):
		return [5,8,9,10,16,17,18,20,29,32,33,34,43,51,52,53,54,56,57,58,59,60,61,64,65,66,67,68].has(id)
	return false

func get_cell_neighbor_s(id : int, dir : int) -> bool:
	if (dir == 0):
		return [8,9,10,11,12,13,14,15].has(id)
	if (dir == 1):
		return [2,3,6,7,10,11,14,15].has(id)
	if (dir == 2):
		return [1,2,5,6,9,10,13,14].has(id)
	if (dir == 3):
		return [4,5,6,7,8,9,10,11].has(id)
	return false;

func get_cell_neighbor_cs(id : int, dir : int) -> bool:
	if (dir == 0):
		return [17,20,21,22,23,31,34,35,40,41,43,45,46].has(id)
	if (dir == 1):
		return [1,2,3,7,8,9,10,11,13,17,18,19,20,21,22,23,26,27,28,29,30,31,32,33,34,35,38,39,40,41,43,44,45,46].has(id)
	if (dir == 2):
		return [7,8,10,11,17,19,21,28,29,33,34,35,46].has(id)
	if (dir == 3):
		return [2,5,6,7,8,9,10,11,14,15,16,17,20,21,22,23,27,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46].has(id)
	if (dir == 4):
		return [3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,21,22,23,25,28,29,31,32,33,34,35,38,39,42,44,45,46].has(id)
	if (dir == 5):
		return [5,9,10,11,16,22,30,34,35,41,42,44,45].has(id)
	if (dir == 6):
		return [3,4,5,6,8,9,10,11,15,16,18,19,20,21,22,23,24,25,26,27,29,30,32,33,34,35,37,39,41,42,43,44,45,46].has(id)
	if (dir == 7):
		return [4,5,6,9,10,18,22,23,29,32,33,35,46].has(id)
	return false;

func full_collision():
	for i in range(id_debut, id_fin + 1):
		if (!tileset.has_source(i)):
			continue
		if (tileset.get_physics_layers_count() < 1):
			tileset.add_physics_layer()
		var tileatlas = tileset.get_source(i) as TileSetAtlasSource
		for k in range(0, tileatlas.get_tiles_count()):
			var data = tileatlas.get_tile_data(tileatlas.get_tile_id(k),0)
			if (data.get_collision_polygons_count(0) < 1):
				data.add_collision_polygon(0)
			var size = Vector2(tileset.tile_size)
			data.set_collision_polygon_points(0, 0, [
				Vector2(-0.5, -0.5) * size, 
				Vector2( 0.5, -0.5) * size, 
				Vector2( 0.5,  0.5) * size, 
				Vector2(-0.5,  0.5) * size])
