# Ce script défini ce qu'est une entité et donne des actions de base associé
class_name Entite_Base extends Node2D

signal Repousse(origine, direction)
signal Meurt()
signal Reapparait()
signal SubitDegat(origine, vie_restante, degat)

# Les familles définissent qui peut faire mal à qui. NONE signifie faire mal à tous le monde.
enum FamilleType {Ami, Enemie, NONE}

@export var reapparition : bool = false
@export var tempReapparition : float = 5.0
@export var vie : float = 1.0
@export var famille : FamilleType
@export var tempInvulnerabilite : float = 1.0
@export var inventaireMort : Array[ObjetData] = []

var _vie : float = 1.0
var _mort : bool = false
var _invulnerable : bool = false
# Cette variable permet de désactiver le lancement automatique de la réapparition pour pouvoir gérer soit même quand le faire.
var _reapparition_override = false
var _timer_reapparition : Timer
var _timer_invulnerabilite : Timer
var entite : Entite_Base = self

# Test si l'objet est mort
func IsMort():
	return _mort

# Défini si la réapparition de l'objet est manuel (true) ou automatique (false)
func SetReapparitionOverride(_value):
	_reapparition_override = _value

# Lorsque le noeud est prêt
func _ready() -> void:
	# Au départ, on initialise l'objet
	call_deferred("Initialisation")

# Initalisation de l'entité
func Initialisation() -> void:
	# On remet l'objet en vie en lui réassignant sa vie de départ
	_mort = false
	_vie = vie
	# On emet la réapparition permettant de définir d'autre paramètre unique au différentes entité
	Reapparait.emit()

# Assigner des dégats
func Degat(_origine : Entite_Base, _value: float) -> void:
	# Si la source des dégats est de la même famille ou que l'objet est mort, 
	# on ne prend pas en compte les dégats
	if ((_origine.famille == famille && _origine.famille != FamilleType.NONE) || _mort): return
	
	# Si l'objet est invulnerable, on n'applique pas de dégat
	if (_invulnerable): return
	
	# On enlève la vie
	_vie -= _value
	# On emet la prise de dégats
	SubitDegat.emit(_origine, _vie, _value)
	# Si la vie est nul ou négative, l'objet est mort
	if (_vie <= 0):
		_mort = true
		Mort()
	else: # Sinon, on lance les frames d'invulnérabilité
		LancerTimerInvulnerabilite()

# Lance la mort de l'entité
func Mort() -> void:
	# Si l'objet doit réapparaitre, on lance le timer de réapparition si on ne le bloque pas
	if (reapparition && !_reapparition_override):
		LancerTimerReapparition()
	# On emet la mort de l'objet
	Meurt.emit()

# Créer les objets de l'entité à sa mort
func LacherObjets():
	# Pour chaque objet défini dans l'inventaire
	for objet in inventaireMort:
		# On créer un nouveau noeud d'objet collectable
		var a = Global.objetNode.instantiate()
		# On défini les informations de l'objet
		a.objetData = objet
		# On le place proche de notre entité
		a.global_position = Vector2(randf_range(-8, 8), randf_range(-8, 8)) + global_position
		# On ajoute cet objet à notre monde
		Global.monde.add_child(a)

# Repousse l'entité
func Repousser(_origine : Entite_Base,_direction : Vector2):
	# Si l'entité est morte ou invulnérable, on ne fait rien
	if (_mort || _invulnerable): return
	# Lorsque l'on repousse l'objet, on emet un signal avec la directions dans lequel on le repousse
	Repousse.emit(_origine, _direction)

# Lance le timer d'invulnérabilité
func LancerTimerInvulnerabilite():
	if (tempInvulnerabilite > 0):
		# On rend l'objet invulnerable
		_invulnerable = true
		# On créer un nouveau timer, on lui définit le temps de réapparition et on l'ajoute à notre objet
		_timer_invulnerabilite = Timer.new()
		_timer_invulnerabilite.wait_time = tempInvulnerabilite
		_timer_invulnerabilite.one_shot = true
		_timer_invulnerabilite.autostart = true
		_timer_invulnerabilite.timeout.connect(_invulnerabilite_timeout)
		# On l'ajoute à notre objet
		add_child(_timer_invulnerabilite)

# Lorsque le timer d'invulnérabilité se termine
func _invulnerabilite_timeout():
	# on supprime le timer
	_timer_invulnerabilite.call_deferred("queue_free")
	# On désactive l'invulnérabilité
	_invulnerable = false

# Lance le timer de réapparition de l'entité
func LancerTimerReapparition():
	# Si le temps de réapparition est plus grand que 0
	if (tempReapparition > 0):
		# On créer un nouveau timer, on lui définit le temps de réapparition et on l'ajoute à notre objet
		_timer_reapparition = Timer.new()
		_timer_reapparition.wait_time = tempReapparition
		_timer_reapparition.one_shot = true
		_timer_reapparition.autostart = true
		_timer_reapparition.timeout.connect(_reapparition_timeout)
		# On l'ajoute à notre objet
		add_child(_timer_reapparition)
	else: # Sinon on créer l'objet immédiatement
		Initialisation()

# Lorsque le timer de réapparition est terminé
func _reapparition_timeout():
	# On supprime le timer
	_timer_reapparition.call_deferred("queue_free")
	# On réinitialise l'objet
	Initialisation()
