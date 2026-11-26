# Ce script gère une balle
extends Area2D

@export var vitesse : float = 500.0
@export var degat : float = 1.0
@export var repulsionForce : float = 100.0

var origine : Entite_Base

# A chaque frame physics (Collision)
func _physics_process(_delta: float) -> void:
	global_position += vitesse * Vector2.from_angle(rotation) * _delta

# Lorsqu'elle entre en contact avec un objet
func _on_body_entered(body: Node2D) -> void:
	# Si l'objet est dans le groupe des entité
	if (body.is_in_group("Entité")):
		# Si le body est lui-même on ne le considère pas
		if (body.entite == origine): return
		# Effet repulsif de l'explosion
		body.entite.Repousser(origine, Vector2.from_angle(rotation) * repulsionForce)
		# Assignation des degat à l'objet
		body.entite.Degat(origine, degat)
	# On supprime la balle
	call_deferred("queue_free")

# Lorsqu'elle entre en contact avec une zone d'un objet (Hitbox)
func _on_area_entered(area: Area2D) -> void:
	# On vérifie que la zone est dans le groupe des HitBox
	if (area.is_in_group("HitBox")):
		# On défini la cible
		var target = null
		if (area.is_in_group("Entité")): target = area # Si la zone est elle-même une entité
		elif (area.get_parent().is_in_group("Entité")): target = area.get_parent() # Si c'est son parent l'entité
		
		# Si la cible a été trouvé
		if (target):
			# Effet repulsif de l'explosion
			target.entite.Repousser(origine, Vector2.from_angle(rotation) * repulsionForce)
			# Assignation des degat à l'objet
			target.entite.Degat(origine, degat)
			# On supprime la balle
			call_deferred("queue_free")

# Lorsque le timer d'auto suppression de la balle se termine
# Ce timer évite que la balle ne sorte de la zone et existe indéfiniment
func _on_auto_suppression_timeout() -> void:
	# On supprime la balle
	call_deferred("queue_free")
