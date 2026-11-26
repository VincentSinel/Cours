# Ce script gère les objet collectable
extends Area2D

var objetData : ObjetData

# Lorsque le noeud est prêt
func _ready() -> void:
	# On défini la texture sur celle de l'objet
	$Sprite2D.texture = objetData.objetTexture
	# On donne une rotation aléatoire
	rotation = randf() * PI * 2

# Lorsqu'un objet entre en contact
func _on_body_entered(body: Node2D) -> void:
	# Si c'est le joueur
	if (body is Joueur):
		# Si l'objet est de l'argent
		if (objetData.argent):
			# On ajoute l'objet à l'inventaire du joueur
			Global.inventaire.AjouterArgent(randi_range(objetData.quantite_min, objetData.quantite_max))
		else: # Sinon c'est un objet autre
			Global.inventaire.AjouterObjet(objetData.nomObjet, randi_range(objetData.quantite_min, objetData.quantite_max))
		# On supprime cette objet collectable
		call_deferred("queue_free")
