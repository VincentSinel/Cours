# Ce script gère un zombie basique avec tous ses paramètres.
class_name Zombie extends CharacterBody2D

enum Etat {Passif, Chasse}

@export var distanceChasseMax : float = 400.0
@export var distanceAttaqueMax : float = 20.0
@export var vitesse : float = 30.0
@export var vitesseChasse : float = 80.0
@export var zone_deplacement : ZoneDeplacement
@export var degatAttaque : float = 5.0
@export var decal : Texture2D

@export var argent : int = 0
@export var objets : Dictionary[String, int] = {}

@onready var entite : Entite_Base = $Entite_Base
@onready var detection : Area2D = $Detection
@onready var animationZombie : AnimatedSprite2D = $AnimatedSprite2D
@onready var navigationAgent : NavigationAgent2D = $NavigationAgent2D
@onready var animationAttaque : AnimatedSprite2D = $AnimationAttaque
@onready var timerAttente : Timer = $Attente

var _etat : Etat = Etat.Passif
var _cible : Entite_Base
var _ajout_vitesse = Vector2.ZERO

# Mise a jour des frame lié à la physics du jeu (collision etc...)
func _physics_process(_delta: float) -> void:
	
	# Si le monstre est mort on arrête les mises à jours
	if (entite.IsMort()):
		return;
	
	# Si le zombie est mode chasse
	if (_etat == Etat.Chasse):
		# On redéfini la position cible de son déplacement
		navigationAgent.target_position = _cible.global_position
		# On récupère la distance avec le personnage
		var distance = navigationAgent.distance_to_target()
		# Si l'objet à pourchasser est trop loin, on arrête le mode chasse
		if (distance > distanceChasseMax):
			StopChasse()
		elif (distance < distanceAttaqueMax):
			Attaque()
	
	# Si une vitesse supplémentaire est appliqué, on le réduit petit à petit
	if (_ajout_vitesse.length_squared() > 0):
		# On la multiplie par 0.8
		_ajout_vitesse *= 0.8
		# Si elle devient trop faible on l'annule totalement
		if (_ajout_vitesse.length_squared() < 1):
			_ajout_vitesse = Vector2.ZERO
	
	# Si le déplacement jusqu'au point cible est fini, on arrête la mise a jour de position
	if navigationAgent.is_navigation_finished():
		return
	
	# On récupère la position à atteindre
	var nouvelle_position = navigationAgent.get_next_path_position()
	# On calcul la vitesse cible de notre zombie
	var vitesse_cible = global_position.direction_to(nouvelle_position)
	if (_etat == Etat.Chasse):
		vitesse_cible *= vitesseChasse
	else:
		vitesse_cible *= vitesse
	# On assigne cette vitesse de déplacement a l'agent de navigation (C'est lui qui gère le pathfinding)
	navigationAgent.set_velocity(vitesse_cible)

# Démarre le timer d'attente avant l'assignation d'une nouvelle position au zombie
func DemarrerTimerAttente():
	# Défini un temps aléatoire compris entre 2 et 5 sec (2 + 3) 
	timerAttente.start(2.0 + randf() * 3.0)

# Démarre le mode chase sur une entité donné
func Chasse(_entite : Entite_Base):
	# Si la cible est déjà morte, pas de chasse
	if (_entite.IsMort()):
		return
	# On définit l'entité comme cible
	_cible = _entite;
	# Si ce n'est déjà fait, on assigne l'événement lié à la mort potentiel de l'entité pour arrêter la chasse
	if (!_cible.Meurt.is_connected(StopChasse)):
		_cible.Meurt.connect(StopChasse)
	# On définit l'état du monstre en mode chasse
	_etat = Etat.Chasse
	# On arrête le timer d'attente qui déplace le zombie à une position aléatoire
	timerAttente.stop()
	# On joue un son pour signifier le début de la chasse (on change le "pitch" du son pour créer de la diversité)
	$Sons/Chasse.pitch_scale = randf_range(0.8,1.2)
	$Sons/Chasse.play()

# Attaque la cible
func Attaque():
	# Si le timer d'attente entre les attaques est fini
	if ($AttaqueCooldown.time_left == 0):
		# On tourne l'animation de l'ataque vers la cible
		animationAttaque.rotation = animationAttaque.global_position.angle_to_point(_cible.global_position)
		# On relance l'animation
		animationAttaque.play("default")
		# On applique des dégats à la cible
		_cible.Degat(entite, degatAttaque)
		# On joue un son d'attaque (on change le "pitch" du son pour créer de la diversité)
		$Sons/Attaque.pitch_scale = randf_range(0.8,1.2)
		$Sons/Attaque.play()
		# On relance le temps d'attente avant la prochaine attaque
		$AttaqueCooldown.start()

# Fin du mode chasse
func StopChasse():
	# Si la chasse n'a pas démarrer, rien à changer
	if (_etat == Etat.Passif): return;
	# Si le signal de mort de la cible est connecté, on la déconnecte
	if (_cible.Meurt.is_connected(StopChasse)):
		_cible.Meurt.disconnect(StopChasse)
	# On déréférence la cible
	_cible = null
	# On repasse en mode passif
	_etat = Etat.Passif
	# On redémarre le timer d'attente avant l'assignation d'une nouvelle position
	DemarrerTimerAttente()

# Lorsque l'agent de navigation à calculer la vitesse de déplacement, on l'assigne et on déplace le zombie
func _on_navigation_agent_2d_velocity_computed(safe_velocity: Vector2) -> void:
	# On récupère la vitesse calculé et on ajoute notre surplus (pour l'effet repoussoir des attaques)
	velocity = safe_velocity + _ajout_vitesse
	# On effectue le déplacement
	move_and_slide()
	# On met à jour l'animation du zombie
	ChangerAnimation(safe_velocity)

# Lorsque le timer d'attente se termine
func _on_attente_timeout() -> void:
	# On défini une nouvelle position cible
	DefinirPositionCible()

# Lorsque la navigation est terminé
func _on_navigation_agent_2d_navigation_finished() -> void:
	# Si l'état est passif, on démarre le timer d'attente
	if (_etat == Etat.Passif):
		DemarrerTimerAttente()

# Défini une position cible à l'intérieur de la zone de déplacement
func DefinirPositionCible():
	# On assign une nouvelle position cible
	navigationAgent.target_position = zone_deplacement.PointAleatoire()
	# On joue un bruit (on change le "pitch" du son pour créer de la diversité)
	$Sons/Bruits.pitch_scale = randf_range(0.8,1.2)
	$Sons/Bruits.play()

# Changement de l'animation du zombie
func ChangerAnimation(dir : Vector2):
	# Test si la vitesse n'est pas nul pour changer la direction du personnage
	if (dir.length_squared() > 0):
		# Si la vitesse vertical est supérieur à celle horizontale, 
		# le personnage se tourne vers le haut ou le bas
		if (abs(dir.y) >= abs(dir.x)):
			if (dir.y > 0):
				animationZombie.play("Bas")
			else:
				animationZombie.play("Haut")
		else: # Sinon il se tourne vers la gauche ou la droite
			if (dir.x > 0):
				animationZombie.play("Droite")
			else:
				animationZombie.play("Gauche")
		# On fait tourner la zone de détection vers la direction du déplacement
		detection.rotation = Vector2.ZERO.angle_to_point(dir)
	else: # Si le zombie ne bouge pas
		# On arrête l'animation
		animationZombie.stop()
		# On défini la frame à zéro
		animationZombie.frame = 0

# Lorsque le zombie meurt
func _on_entite_base_meurt() -> void:
	# On arrête la potentielle attente 
	timerAttente.stop()
	# On arrête l'animation
	animationZombie.stop()
	# On défini la frame à zéro
	animationZombie.frame = 0
	# On arrête la potentielle chase
	StopChasse()
	# On cache les textures
	animationZombie.hide()
	animationAttaque.hide()
	$Detection/ZoneVision.hide()	
	# Ajoute une decal d'explosion au sol
	Global.monde.AjouterDecal(decal, global_position, 30)
	# On lance l'apparition de particules
	Particules()
	# On lache les objets
	entite.call_deferred("LacherObjets")
	# On joue un son d'explosion liquide (on change le "pitch" du son pour créer de la diversité)
	$Sons/Mort.pitch_scale = randf_range(0.8,1.2)
	$Sons/Mort.play()

func Particules():
	# On démarre l'animation de chaque particules
	$Particules/Part1.restart()
	$Particules/Part2.restart()
	$Particules/Part3.restart()

# Quand les particules ont terminé de disparaitre
func _on_particules_finished() -> void:
	# Supprime le zombie
	call_deferred("queue_free")

# Lorsque le zombie est repoussé
func _on_entite_base_repousse(_origine : Entite_Base, direction: Variant) -> void:
	# On défini la vitesse suplémentaire dans la direciton donné
	_ajout_vitesse = direction

# Lorsque le zombie subit des dégats
func _on_entite_base_subit_degat(_origine : Entite_Base, vie_restante: Variant, degat: Variant) -> void:
	# Le zombie cherche à attaquer l'origine des dégats
	Chasse(_origine)

# Lorsque une entité entre dans la zone de détection
func _on_detection_body_entered(body: Node2D) -> void:
	# Si c'est le joueur
	if (body is Joueur):
		# On l'assigne comme objet à chasser
		Chasse(body.entite)
