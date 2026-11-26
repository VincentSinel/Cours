# Ce script gère le joueur
class_name Joueur extends CharacterBody2D

enum DirectionPerso {Haut, Bas, Droite, Gauche}

@onready var entite : Entite_Base = $Entite_Base
@onready var animationPerso : AnimatedSprite2D = $Perso
@onready var pointDeDepart : Vector2 = global_position

@export var vitesse : float = 100.0
@export var degatCouteau : float = 1.0
@export var balle : PackedScene
@export var nombreBalleDepart : int = 20

var _stop : bool = true
var _repousser : bool = false
var _direction_perso : DirectionPerso = DirectionPerso.Bas

# Permet d'empêcher le joueur de bouger
func Stop():
	_stop = true

# Permet de ré-autoriser le joueur à bouger
func Go():
	_stop = false

# Défini le point de départ du joueur
func SetPointDepart(_pos : Vector2, _change = false):
	# Défini le point de réapparition du joueur
	pointDeDepart = _pos
	if (_change): # Si on le souhaite, la position peut-être appliqué directement au joueur
		global_position = pointDeDepart

# Lorsque le noeud est prêt
func _ready() -> void:
	# On désactive la réapparition automatique de cette entité
	entite.SetReapparitionOverride(true)
	# On réassigne la vie du personnage (car les personnage sont présent dans chaque scène)
	entite.vie = Global.viePersonnage

# Lorsque le joueur réapparait
func _on_reapparait() -> void:
	# On remet la vie de la dernière réapparition
	Global.viePersonnage = entite.vie
	# On remet le personnage à la position de départ
	global_position = pointDeDepart
	# On désactive le potentiel effet de répultion
	_repousser = false
	# On rafraichit l'HUD
	Global.monde.hud.ReassigneTout()
	# On annule les animations de coup
	$AnimationPlayer.play("RESET")
	# On lance l'affichage de l'écran
	Global.FadeOut();
	# On redéfini la direction sur bas en position par default
	animationPerso.play("Bas")
	animationPerso.stop()
	animationPerso.frame = 0
	# On annule la potentiel inversion de direction
	animationPerso.flip_h = false

# A chaque frame physics (collision)
func _physics_process(_delta: float) -> void:
	# Si le personnage est mort, on ne fait plus rien
	if (entite.IsMort() || _stop): return
	
	if (!_repousser): # Si il ne subit pas une répulsion
		# On défini la vitesse selon les touches enfoncées
		velocity = Vector2.ZERO
		if (Input.is_action_pressed("Bas")):
			velocity.y += 1.0
		if (Input.is_action_pressed("Haut")):
			velocity.y -= 1.0
		if (Input.is_action_pressed("Droite")):
			velocity.x += 1.0
		if (Input.is_action_pressed("Gauche")):
			velocity.x -= 1.0
			
		velocity = velocity.normalized() * vitesse
		
		# On change la direction du personnage
		Change_Direction()
		# On change l'animation
		Change_Animation()
	else: # Sinon il subit une répulsion
		# On réduit la force de répulsion
		velocity *= 0.8
		# Si la force est devenue trop faible, on désactive la répulsion
		if (velocity.length_squared() < 0.1):
			_repousser = false
	
	# On déplace le joueur
	move_and_slide()
	
	if (!_repousser): # Si il ne subit pas de répulsion, il peut attaquer
		if (Input.is_action_just_pressed("Tir")):
			Tir()
		if (Input.is_action_just_pressed("Couteau")):
			Couteau()

# Chaque frame visuel
func _process(_delta: float) -> void:
	# On calcul la direction en direction du pointeur de souris
	var _dir = global_position.angle_to_point(get_global_mouse_position())
	# On tourne le pistolet dans cette direction
	$Gun.rotation = _dir
	# Si le pistolet est du côté gauche, on inverse sa vue pour qu'il reste bien orienté
	$Gun.flip_v = abs(_dir) > PI / 2

# Calcul la direction du personnage
func Change_Direction():
	# Test si la vitesse n'est pas nul pour changer la direction du personnage
	if (velocity.length_squared() > 0):
		# Si la vitesse vertical est supérieur à celle horizontale, 
		# le personnage se tourne vers le haut ou le base
		if (abs(velocity.y) >= abs(velocity.x)):
			if (velocity.y > 0):
				_direction_perso = DirectionPerso.Bas
			else:
				_direction_perso = DirectionPerso.Haut
		else: # Sinon il se tourne vers la gauche ou la droite
			if (velocity.x > 0):
				_direction_perso = DirectionPerso.Droite
			else:
				_direction_perso = DirectionPerso.Gauche

# Change l'animation du personnage
func Change_Animation():
	# Changement de l'animation du personnage
	if (_direction_perso == DirectionPerso.Bas):
		animationPerso.play("Bas")
	elif (_direction_perso == DirectionPerso.Haut):
		animationPerso.play("Haut")
	elif (_direction_perso == DirectionPerso.Droite):
		animationPerso.play("Droite")
	elif (_direction_perso == DirectionPerso.Gauche):
		animationPerso.play("Gauche")
	# Si la vitesse est nul, l'animation ne doit pas avancer
	if (velocity.length_squared() == 0):
		animationPerso.stop()
		animationPerso.frame = 0
	else: # Sinon, on joue les bruit de pas
		# Si le temps entre deux bruit est écoulé
		if ($BruitPasIntervalle.time_left == 0):
			# On joue un bruit de pas
			$Sons/Pas.pitch_scale = randf_range(0.8,1.2)
			$Sons/Pas.play()
			# On relance le décompte avant le prochain bruit
			$BruitPasIntervalle.start()

# Lorsque l'on tire
func Tir():
	# Si le delai entre deux tire n'est pas écoulé, on annule
	if ($Tir_Delai.time_left != 0): return
	# Si l'inventaire contient assez de balle, on en retire une
	if (Global.inventaire.AjouterObjet("balle", -1)):
		# On créer le noeud de la balle
		var _balle = balle.instantiate()
		# On la place au point de départ sur le pistolet
		_balle.global_position = $Gun/BalleStart.global_position
		# On l'oriente en direction de la souris
		_balle.rotation = _balle.global_position.angle_to_point(get_global_mouse_position())
		# On définit la source de la balle comme étant notre joueur
		_balle.origine = entite
		# On ajoute la balle au monde
		get_parent().add_child(_balle)
		# On joue l'animation de feu en bout de pistolet
		$Gun/Feu.play("default")
		# On lance le timer pour le prochain tir
		$Tir_Delai.start()
		# On joue un bruit de tir
		$Sons/Tir.pitch_scale = randf_range(0.8,1.2)
		$Sons/Tir.play()
	else: # Si on a pas assez de balle
		# On joue un bruit de tir à vide
		$Sons/TirVide.pitch_scale = randf_range(0.8,1.2)
		$Sons/TirVide.play()
		# On lance un delai de tir plus court
		$Tir_Delai.start(0.4)

# Coup de couteau
func Couteau():
	# On vérifie que le couteau est utilisable (cooldown à zéro)
	if ($Couteau_Delai.time_left != 0): return
	
	# On joue l'animation du couteau correct
	if (_direction_perso == DirectionPerso.Bas):
		$AnimationPlayer.play("Couteau_Bas")
	elif (_direction_perso == DirectionPerso.Haut):
		$AnimationPlayer.play("Couteau_Haut")
	elif (_direction_perso == DirectionPerso.Droite):
		$AnimationPlayer.play("Couteau_Droite")
	elif (_direction_perso == DirectionPerso.Gauche):
		$AnimationPlayer.play("Couteau_Gauche")
	
	# On redémarre le compteur de cooldown du couteau
	$Couteau_Delai.start()

# Lorsque le couteau entre en collision avec un autre objet
func _on_couteau_degat_body_entered(_body: Node2D) -> void:
	# Si une entité est entré dans le zone du couteau, on lui applique des dégats
	if _body.is_in_group("Entité"):
		# On applique des dégats à l'entité
		_body.entite.Degat(entite, degatCouteau)

# Lorsque l'on est repoussé
func _on_entity_repousse(_origine : Entite_Base, _direction: Variant) -> void:
	# On annule le potentiel coup de couteau
	$AnimationPlayer.play("RESET")
	# définit l'état du joueur comme repoussé
	_repousser = true
	# Assigne l'inverse de la direction pour que le personnage se tourne en direction opposé
	velocity = _direction * -1
	# Redéfini la direction du personnage
	Change_Direction()
	# Réinverse la direction de la vitesse pour déplacer le personnage du bon côté
	velocity *= -1
	# Défini l'animation sur la répulsion
	animationPerso.play("Repulsion")
	if (_direction_perso == DirectionPerso.Bas):
		animationPerso.frame = 0
	elif (_direction_perso == DirectionPerso.Haut):
		animationPerso.frame = 1
	elif (_direction_perso == DirectionPerso.Droite):
		animationPerso.frame = 2
	elif (_direction_perso == DirectionPerso.Gauche):
		animationPerso.frame = 3

# Lorsque l'on meurt
func _on_meurt() -> void:
	# On joue l'animation de mort
	animationPerso.play('Mort_D')
	# On oriente correctement l'animation
	if (velocity.x >= 0):
		animationPerso.flip_h = false
	else:
		animationPerso.flip_h = true

# Lorsque l'on subit des dégats
func _on_subit_degat(_origine : Entite_Base, _vie_restante: Variant, _degat: Variant) -> void:
	## On change la vie restante du personnage
	#Global.viePersonnage = _vie_restante
	# On joue un bruit de dégat
	$Sons/Degat.pitch_scale = randf_range(0.8,1.2)
	$Sons/Degat.play()

# Lorsque l'animation du personnage est fini
func _on_perso_animation_finished() -> void:
	# Si l'entité est morte
	if (entite.IsMort()):
		# On lance le masquage de l'écran
		Global.FadeIn();
		# On lance le timer de réapparition
		entite.LancerTimerReapparition()
