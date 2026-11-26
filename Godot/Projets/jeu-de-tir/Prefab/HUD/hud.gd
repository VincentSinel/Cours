class_name HUD extends CanvasLayer

# Lorsque le noeud est prêt
func _ready() -> void:
	# On rafraichi l'HUD
	ReassigneTout()

# On défini le joueur
func SetJoueur(joueur : Joueur):
	# On relie le changement d'inventaire à la mise a jour de l'argent
	Global.inventaire.AjoutArgent.connect(AjoutArgent)
	# On relie le changement d'invenaitre à la mise a jour des objets
	Global.inventaire.AjoutObjet.connect(AjoutObjet)
	# On relie le changement de vie à la mise a jour des objets
	joueur.entite.SubitDegat.connect(JoueurSubitDegat)

# Réassignation de toutes les valeurs
func ReassigneTout():
	# On change la barre de vie
	$Control/VBox/HBox/CenterContainer/ProgressBar.value = Global.viePersonnage / Global.vieMaxPersonnage
	# On change l'indication de la vie
	$Control/VBox/HBox/CenterContainer/Label.text = str(max(0.0, round(Global.viePersonnage)))
	# On change le nombre de balle
	$Control/VBox/HBox2/Label.text = str(Global.inventaire.Compte("balle"))
	# On change l'argent
	$Control/VBox/HBox3/Label.text = str(Global.inventaire.argent)

# Lorsque l'inventaire change
func AjoutObjet(_nom, _quantite, _total):
	# Si c'est les balles qui change
	if (_nom == "balle"):
		# On met a jour le nombre
		$Control/VBox/HBox2/Label.text = str(_total)

# Lorsque l'argent change
func AjoutArgent(_quantite, _total):
	# On met a jour l'argent
	$Control/VBox/HBox3/Label.text = str(_total)

# Lorsque le joueur subit des dégats
func JoueurSubitDegat(_origine : Entite_Base, _vie_restante : float, _degat : float):
	# On redéfini la barre de vie
	$Control/VBox/HBox/CenterContainer/ProgressBar.value = _vie_restante / Global.vieMaxPersonnage
	# On change le texte de la vie
	$Control/VBox/HBox/CenterContainer/Label.text = str(max(0.0, round(_vie_restante)))
