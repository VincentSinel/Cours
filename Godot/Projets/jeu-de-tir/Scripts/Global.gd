# Ce script est un script global (accessible partout et défini dans les paramètres du projet)
extends Node

var vieMaxPersonnage : float = 100.0
var viePersonnage : float = vieMaxPersonnage
var inventaire : Inventaire = Inventaire.new()
var indexPointDeDepart : int = 0
@onready var objetNode : PackedScene = preload("res://Prefab/Objet/objet.tscn")

var monde : Monde

# Lorsque le noeud est prêt
func _ready() -> void:
	# On ajoute le nombre de balle initiale du personnage
	inventaire.AjouterObjet("balle", 30)

# Définition du monde actuel
func SetMonde(_monde : Monde):
	monde = _monde

# Lance le masquage de l'écran
func FadeIn(_time : float = 1.0):
	# Effectue l'appel sur le monde défini
	monde.FadeIn(_time)

# Lance le démasquage de l'écran
func FadeOut(_time : float = 1.0):
	# Effectue l'appel sur le monde défini
	monde.FadeOut(_time)
