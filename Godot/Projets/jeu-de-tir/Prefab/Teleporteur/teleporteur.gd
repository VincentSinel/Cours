extends Area2D

@export var sceneCible : String = ""
@export var indexPointDepart : int = 0

# Lorsque qu'un objet entre dans la zone
func _on_body_entered(body: Node2D) -> void:
	# Si c'est le joueur
	if (body is Joueur):
		# On défini l'index du point de départ a utiliser sur la nouvelle carte
		Global.indexPointDeDepart = indexPointDepart;
		# On connect la fin du masquage de l'écran au changement de monde
		Global.monde.Fin_FadeIn.connect(_change_scene)
		# On démarre le masquage de l'écran
		Global.FadeIn()

# Lorsque le changement de scène doit avoir lieu
func _change_scene():
	# On change la scène actuelle
	get_tree().change_scene_to_file("res://Scenes/" + sceneCible + ".tscn")
