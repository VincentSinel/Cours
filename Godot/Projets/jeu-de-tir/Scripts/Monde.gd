# Ce script gère un niveau
class_name Monde extends Node2D

signal Fin_FadeIn()
signal Fin_FadeOut()

@export var PointsDepart : Array[Node2D] = []

@onready var fade_tween = get_tree().create_tween()
@onready var camera : Camera2D = $Camera2D
@onready var joueur : Joueur = $Objets/Joueur
@onready var navigationRegion : NavigationRegion2D = $NavigationRegion2D
@onready var hud : HUD = $HUD

var _decals = []
var _rafraichissementEnAttente = false

# Lorsque le noeud est prêt
func _ready() -> void:
	# On vérifie que le nombre de point de depart n'est pas nul (Sinon il y a un problème et le jeu plante)
	assert(PointsDepart.size() > 0, "Aucun point de départ configuré dans le monde :" + name)
	
	# Assignation du joueur a l'HUD
	hud.SetJoueur(joueur)
	# Affiche l'overlay (fondu au noir) à la création de la scene
	$Overlay.show()
	# Definit la couleur de l'overlay à noir
	$Overlay/ColorRect.color = Color.BLACK
	# Assigne se monde comme l'actuel dans les paramètres globaux
	Global.SetMonde(self);
	# Défini le point de départ en fonction de l'index définit
	joueur.SetPointDepart(
		PointsDepart[Global.indexPointDeDepart % PointsDepart.size()].global_position, 
		true)
	# Lance l'apparition de l'écran
	FadeOut();

# Lance le démasquage de l'écran
func FadeOut(_time : float = 1.0):
	# On vérifie que le monde a fini de charger
	if (is_node_ready()):
		# On supprime le précédent Tween
		fade_tween.kill()
		# On en créer un nouveau
		fade_tween = get_tree().create_tween()
		# On définit l'objectif (rendre l'overlay transparent)
		fade_tween.tween_property($Overlay/ColorRect, "color", Color(0,0,0,0), _time)
		# On définit un appel en fin d'animation
		fade_tween.tween_callback(FadeOutFini)

# Lorsque le démasquage de l'écran se termine
func FadeOutFini():
	# On débloque les déplacement du joueur
	joueur.Go()
	# Emet le signal de fin de démasquage
	Fin_FadeOut.emit()

# Lance la masquage de l'écran
func FadeIn(_time : float = 1.0):
	# On vérifie que le monde a fini de charger
	if (is_node_ready()):
		# On supprime le précédent Tween
		fade_tween.kill()
		# On en créer un nouveau
		fade_tween = get_tree().create_tween()
		# On définit l'objectif (rendre l'overlay noir)
		fade_tween.tween_property($Overlay/ColorRect, "color", Color.BLACK, _time)
		# On définit un appel en fin d'animation
		fade_tween.tween_callback(FadeInFini)
		# On bloque les déplacement du joueur
		joueur.Stop()

# Lorsque le masquage de l'écran se termine
func FadeInFini():
	# Emet le signal de fin de masquage
	Fin_FadeIn.emit()

# Chaque frame
func _process(_delta: float) -> void:
	# On déplace la caméra sur le joueur
	camera.global_position = joueur.global_position
	
	# On met à jour le temps d'apparition des décals
	if (_decals.size() > 0):
		for element in _decals:
			element["duree"] -= _delta
		# On relance un dessin
		queue_redraw()
		
	# On rafraichi la region de navigation si nécessaire
	if _rafraichissementEnAttente:
		RafraichirNavigationRegion()

# Ajoute un décal dans le mondre
func AjouterDecal(_texture : Texture2D, _position : Vector2, _duree : float = 1000000):
	# On ajoute un élément avec tous les paramètres
	_decals.append({
		"element": _texture, # Texture à dessiner
		"position": _position - _texture.get_size() / 2.0, # Position du dessin
		"duree": _duree # Durée de vie restante
	})

# Dessin supplémentaire dans le monde
func _draw() -> void:
	var index = 0
	# On parcours l'ensembles des décals
	while (index < _decals.size()):
		var decal = _decals[index]
		
		# On dessine le décal
		draw_texture(
			decal["element"], 
			decal["position"], 
			Color(1,1,1,clamp(decal["duree"], 0.0, 1.0)) # On le fait disparaitre petit à petit si la durée restante est plus petite qu'une seconde
		)
		# Si la durée est terminé, on supprime le décal de la liste
		if (decal["duree"] < 0):
			_decals.remove_at(index)
		else:
			index += 1

# Rafraichissement de la région de naviation
func RafraichirNavigationRegion():
	# Si une région est déjà en préparation, on renouvelle la demande plus tard
	if (navigationRegion.is_baking()):
		_rafraichissementEnAttente = true
	else: # Sinon on lance un rafraichissement immédiatement
		_rafraichissementEnAttente = false
		navigationRegion.bake_navigation_polygon()
