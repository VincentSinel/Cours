# @tool permet d'executer ce script depuis l'éditeur et donc d'afficher 
# le cercle de la zone de déplacement dans l'éditeur.
@tool
# Ce script gère une zone de déplacement auquel est assigné un zombie. Celui-ci se déplace à l'intérieur
# Si il en est sorti, il y reviendra par la suite
class_name ZoneDeplacement extends Node2D

### EDITEUR : Permet l'affichage d'un rond vert pour la zone de déplacement
@export var rayon : float = 100.0:
	set(nouveau_rayon): # Cette fonction s'execute automatiquement lorsque l'on modifie le rayon
		rayon = nouveau_rayon
		# Lance un rafraichissement du rendu
		queue_redraw()

# Fonction de dessin
func _draw() -> void:
	# On execute le tracé uniquement dans l'éditeur
	if (Engine.is_editor_hint()):
		# On dessine un cercle
		draw_circle(Vector2.ZERO, rayon, Color.GREEN, false)
### FIN EDITEUR

@onready var _rayon_carre = rayon * rayon

# Selection d'un point aléatoire dans la zone de déplacement
func PointAleatoire() -> Vector2:
	# Calcul la position d'un point aléatoire dans la zone.
	# La zone étant ronde, on prend un rayon aléatoire et un angle aléatoire pour avoir la position
	var point = randf() * rayon * Vector2.from_angle(randf() * PI * 2)
	# On retourne la position à partir de la position de la zone
	return point + global_position
