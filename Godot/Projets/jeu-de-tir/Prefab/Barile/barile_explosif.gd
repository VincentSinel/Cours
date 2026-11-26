# @tool permet d'executer ce script depuis l'éditeur et donc d'afficher 
# le cercle de la zone de dégat dans l'éditeur.
@tool
# Ce script gère un barile explosif
extends Entite_Base

### EDITEUR : Permet l'affichage d'un rond rouge pour la zone d'action
@export var rayonDegat : float = 100.0:
	set(nouveau_rayon): # Cette fonction s'execute automatiquement lorsque l'on modifie le rayon
		rayonDegat = nouveau_rayon
		# Lance un rafraichissement du rendu
		queue_redraw()

func _draw() -> void:
	# On execute le tracé uniquement dans l'éditeur
	if (Engine.is_editor_hint()):
		# On dessine un cercle
		draw_circle(Vector2.ZERO, rayonDegat, Color.RED, false)
### FIN EDITEUR

@export var degatMax : float = 100.0
@export var repulsionForce : float = 500.0
@export var decal : Texture2D

# Lorsque le noeud est prêt
func _ready() -> void:
	# On désactive la réapparition automatique de notre entité pour décider nous même 
	# quand la faire réapparaitre si besoin.
	SetReapparitionOverride(true)
	# On définit la taille de la zone de dégats
	$Zone_Degat/CollisionShape2D.shape.radius = rayonDegat


# Lorsque le barile explose
func Explosion():
	# On cache le barile
	$Sprite2D.hide()
	# On ajoute une decal d'explosion au sol
	Global.monde.AjouterDecal(decal, global_position, tempReapparition if reapparition else 10)
	# On récupére tous les objets présent dans la zone de dégat
	var nodes = $Zone_Degat.get_overlapping_bodies()
	# On boucle sur chaque objet
	for node in nodes:
		# Si l'objet est aussi une entité, elle est impacté par l'explosion
		if node.is_in_group("Entité") && node != self:
			# On calcul de la quantité de dégat pris par l'objet en fonction de sa distance avec le tonneau
			var distance_objet = node.global_position.distance_to(global_position)
			var rayon_degat = $Zone_Degat/CollisionShape2D.shape.radius
			var degat = max(1.0 - (distance_objet / rayon_degat), 0.0) * degatMax
			# On applique la repulsif de l'explosion
			node.entite.Repousser(entite, global_position.direction_to(node.global_position) * repulsionForce)
			# On assignation des degat à l'entité
			node.entite.Degat(entite, degat)
	
	# On lance la création de particule suite à l'explosion
	Particules()
	# On joue un son d'explosion (on change le "pitch" du son pour créer de la diversité)
	$Sons/Explosion.pitch_scale = randf_range(0.8,1.2)
	$Sons/Explosion.play()
	
	# Si le braile est défini comme pouvant réapparaitre, on lance la réapparition
	if (reapparition):
		# On réinitialise l'animation
		$AnimationPlayer.play("RESET")
		# On lance la réapparition
		LancerTimerReapparition()
		# On désactive sa collision pour pouvoir passer au travers en attendant qu'il réapparaisse
		$CollisionShape2D.disabled = true
		# On lance un rafraichissement de la zone de navigation pour autoriser les monstres à passer dessus
		Global.monde.RafraichirNavigationRegion()

# Lance l'animation des particules
func Particules():
	$Particules/Part1.restart()
	$Particules/Part2.restart()
	$Particules/Part3.restart()

# Lorsque l'animation du barile se termine
func _on_animation_player_animation_finished(_anim_name: StringName) -> void:
	# On vérifie que l'animation est la bonne
	if (_anim_name == "Explosion"):
		# On effectue l'explosion du tonneau
		Explosion()

# Lorsque les particules ont toutes disparues
func _on_particules_finished() -> void:
	# Supprime l'objet si celui-ci ne doit pas réapparaitre (une fois les particules disparues)
	if (!reapparition):
		call_deferred("queue_free")
		# on lance un rafraichissement de la zone de navigation pour autoriser les monstres à passer dessus
		Global.monde.RafraichirNavigationRegion()

# Lorsque le barile meurt
func _on_meurt() -> void:
	# Lance l'animation d'explosion
	$AnimationPlayer.play("Explosion")

# Lorsque le barile réapparait
func _on_reapparait() -> void:
	# Réinitialise l'animation
	$AnimationPlayer.play("RESET")
	# Affiche le tonneau
	$Sprite2D.show()
	# Fait réapparaitre la collision
	$CollisionShape2D.disabled = false
	# On lance un rafraichissement de la zone de navigation pour empêcher les monstres de passer dessus
	Global.monde.RafraichirNavigationRegion()
