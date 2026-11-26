# Ce script permet de gérer un inventaire
class_name Inventaire

signal AjoutObjet(nom, quantite, total)
signal AjoutArgent(quantite, total)

@export var argent : int = 0

var Objets : Dictionary[String, int] = {}

# Ajoute de l'argent à l'inventaire, renvoie true si l'argent a pu être ajouter,
# false sinon. La quantité peut-être négative.
func AjouterArgent(_quantite : int)-> bool:
	# Test si l'ajout est possible
	if (Possible_AjoutArgent(_quantite)):
		# Change l'argent
		argent += _quantite
		# Envoie un signal permettant entre autre de mettre a jour l'HUD
		AjoutArgent.emit(_quantite, argent)
		# Renvoie vrai pour signaler que le montant à pu être ajouté
		return true
	else:
		# Renvoie faux pour signaler que le montant n'à pas pu être ajouté
		return false

# Test si il est possible d'ajouter une certaine quantité d'argent dans l'inventaire.
# La quantité peut-être négative
func Possible_AjoutArgent(_quantite : int)-> bool:
	if (_quantite >= 0): # Si la quantité est positive on peut toujours l'ajouter
		return true
	else: # Sinon
		if (argent >= abs(_quantite)): # On test que l'on a assez d'argent
			return true # Si oui on renvoie vrai
		return false # Si non on renvoie faux


# Test si un objet est présent dans l'inventaire
func Contient(_nom : String) -> bool:
	return Compte(_nom) > 0

# Renvoie le nombre d'objet d'un certain contenue dans l'inventaire
func Compte(_nom : String) -> int:
	if (Objets.has(_nom)): # Si l'inventaire contient le nom de l'objet
		return Objets[_nom] # On renvoie le nombre de l'inventaire
	else: # Sinon
		return 0 # On renvoie 0


# Ajoute un objet à l'inventaire, renvoie true si l'objet a correctement pu être ajouter,
# false sinon. La quantité peut-être négative.
func AjouterObjet(_nom : String, _quantite : int)-> bool:
	# Test si l'ajout est possible
	if (Possible_AjoutObjet(_nom, _quantite)):
		# Si l'inventaire contient déjà l'objet
		if (Objets.has(_nom)):
			# On ajoute la quantité a celle déjà présente
			Objets[_nom] += _quantite
		else: # sinon
			# On créer l'objet avec la quantité
			Objets[_nom] = _quantite
		# On emet un changement d'inventaire
		AjoutObjet.emit(_nom, _quantite, Objets[_nom])
		# On renvoie vrai pour signaler que l'ajout a réussi
		return true
	else: # Sinon
		# On renvoie faux
		return false


# Test si il est possible d'ajouter une certaine quantité d'un objet dans l'inventaire.
# La quantité peut-être négative
func Possible_AjoutObjet(_nom : String, _quantite : int)-> bool:
	# Si la quantité est positive, on peut toujours l'ajouter
	if (_quantite >= 0):
		return true
	else: # Sinon
		# Si l'objet existe dans l'inventaire
		if (Objets.has(_nom)):
			# Si il y a la bonne quantité
			if (Objets[_nom] >= abs(_quantite)):
				# L'ajout est possible
				return true
		# Sinon c'est impossible
		return false
