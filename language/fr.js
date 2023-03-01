const { emotes } = require('../config');

module.exports = {
    BOT_MENTION: (prefix) => `Bonjour, dans ce serveur, mon préfixe est \`${prefix}\`.\nUtilisez la commande \`${prefix}help\` afin d'obtenir la liste de mes commandes si vous êtes perdu.`,
    BOT_COOLDOWN: (time, cmd) => `${emotes.cooldown} Il reste **${time}** seconde(s) avant de pouvoir réutiliser la commande \`${cmd}\``,
    WRONG_USAGE: (usage) => `${emotes.x} Ce n'est pas la bonne utilisation.\nUtilisez \`${usage.replace('<prefix>', '')}\``,
    PRIVATE_CMD: `${emotes.x} Cette commande est privée`,
    MISSING_PERMISSION: (permission) => `${emotes.x} Vous ne disposez pas des permissions nécessaires pour utiliser cette commande (\`${permission}\`)`,


    // DISCORD-PLAYER MESSAGES
    TRACKSTART: (title, channel) => `${emotes.music} En train de jouer \`${title}\` dans le salon **${channel.name}**`,
    TRACKADD: (track) => `${emotes.musiccd} \`${track.title}\` a bien été ajouté à la file d'attente (**${track.duration}**)`,
    PLAYLISTADD: (playlist) => `${emotes.music} \`${playlist.title}\` a été ajouté à la file d'attente (**${playlist.tracks.length}** songs)`,
    SEARCHRESULTS: `Entrez le numéro de la musique que vous souhaitez écouter. Ou \`cancel\` pour quitter.`,
    SEARCHINVALIDRESPONSE: `${emotes.v} La recherche a bien été annulé`,
    SEARCHERROR: (length) => `${emotes.x} Le numéro entré n'est pas dans la liste.\nVous devez entrer un nombre entre 1 et **${length}**`,
    SEARCHCANCEL: `${emotes.v} Vous n'avez pas entré de réponse, s'il vous plaît, entrez la commande de nouveau`,
    NORESULTS: (query) => `${emotes.x} Je n'ai pas trouvé de résultats pour \`${query}\`.\nIl est possible que vous ayez entré un lien invalide, ou qu'il y ait trop de musiques dans votre playlist (max 100)`,
    QUEUEEND: `${emotes.x} La musique s'est arrêtée car il n'y a plus de musique dans la file d'attente`,
    CHANNELEMPTY: `${emotes.x} La musique s'est arrêtée car il n'y a plus personne dans le salon vocal`,
    BOTDISCONNECT: `${emotes.x} La musique s'est arrêtée car j'ai été déconnecté du salon vocal`,
    ERROR: [ `${emotes.x} Il n'y a aucune musique en cours.`, `${emotes.x} Je ne peux pas rejoindre le salon vocal, veuillez vérifier mes permissions`,
    `${emotes.x} Une erreur a eu lieu. Si l'erreur persiste, veuillez contacter le serveur de support.` ],


    // SINGLE LINE COMMANDS
    PLAY_ERROR: [ `${emotes.x} Vous devez être dans un salon vocal afin d'utiliser cette commande`, `${emotes.x} Vous devez être dans le même salon vocal que moi`,
    `${emotes.x} Une erreur a eu lieu en essayant d'ajouter la piste audio..` ],
    NOWPLAYING: [ `Chaîne`, `Durée`, "Dans la playlist", "Musique", "Demandée par", "Barre de progression" ],
    QUEUE: [ `File d'attente pour`, "Piste audio actuelle", "Demandée par", "piste audio", "dans la file d'attente" ],
    SHUFFLE: (length) => `${emotes.v} La file d'attente a bien été mélangé (**${length}** pistes audio)`,
    SKIP: (music) => `${emotes.v} La musique \`${music}\` a bien été passée`,
    STOP: `${emotes.v} La musique a bien été arrêtée sur ce serveur`,
    FILTERS_DESC: (usage) => `Utilisez la commande \`${usage}\` afin d'ajouter un filtre sur la musique en cours.`,
    INVITE: [ `Permissions administrateur`, `Permissions de membre`, `Clique ici` ],
    LYRICS: [ `Aucune parole trouvée pour`, `Paroles de` ],
    BACK: `${emotes.v} La musique précédente est en cours`,



    // CLEAR QUEUE COMMAND
    CLEARQUEUE_ERR: `${emotes.x} Il n'y a qu'une seule musique dans la file d'attente`,
    CLEARQUEUE_SUCCESS: (tracks) => `${emotes.v} La file d'attente a bien été supprimé (**${tracks}** pistes audio)`,


    // FILTER COMMAND
    FILTER_ERR: [ `${emotes.x} Veuillez indiquer un filtre valable à ajouter ou retirer.\nUtilisez la commande \`filters\` afin de voir la liste`,
    `${emotes.x} Veuillez entrer un filtre valable, par exemple **8D**, **vribrato**..etc` ],
    FILTER_SUCCESS: [ `${emotes.v} Je suis en train d'ajouter le filtre à la piste audio.\n${emotes.info} : La durée d'application du filtre est relative à la durée de la piste audio`,
    `${emotes.v} Je suis en train de désactiver le filtre.\n${emotes.info} : La durée d'application du filtre est relative à la durée de la piste audio` ],


    // LOOP COMMAND
    LOOP_ERR: (message) => `${emotes.x} Vous devez d'abord désactiver la ${message === 'music' ? 'musique en cours' : "file d'attente"} dans le mode boucle`,
    LOOP_DISABLE: `${emotes.v} La boucle a bien été désactivé`,
    LOOP_ENABLE: [ `${emotes.loopmode} La boucle pour la file d'attente a bien été activée`, `${emotes.loopmode} La boucle a bien été activée, la musique actuelle sera répétée` ],


    // PAUSE COMMAND
    PAUSE_ERR: `${emotes.x} La musique actuelle est déjà en pause`,
    PAUSE_SUCCESS: `${emotes.v} La musique actuelle a bien été mise en pause`,


    // RESUME COMMAND
    RESUME_ERR: `${emotes.x} La musique actuelle est déjà en cours`,
    RESUME_SUCCESS: `${emotes.micro} La musique actuelle a bien été relancée`,


    // VOLUME COMMAND
    VOLUME_ERR: `${emotes.x} Veuillez entrer un nombre valide entre **1** et **100**`,
    VOLUME_SUCCESS: (volume) => `${emotes.volume} Le volume a bien été fixé à \`${volume}%\``,


    // HELP COMMAND
    HELP_ERR: (usage) => `${emotes.x} Je n'ai pas réussi à trouver cette commande\n${emotes.info} : Usage : \`${usage}\``,
    HELP_CAT: [ "Musique", "Informations" ],
    HELP: (username) => `Commandes de ${username}`,
    HELP_EMBED: [ `Ajouter`, "pour plus d'informations" ],
    HELP_CMD: [ `Pas d'alias`, "non requis", "requis", "Catégorie", "Délai", "secondes" ],


    // BOTINFO COMMAND
    BOTINFO_DESCRIPTION: (bot) => `**${bot}** est un bot discord de musique [open-source](https://github.com/antoinemcx/naybor).
Avec l'aide de quelques traducteurs humains, ${bot} est disponible en 2 langues, au moins pour le moment : anglais et français.`,
    BOTINFO: [ 'Développeur', 'Contributeurs', 'Serveurs', 'serveurs', 'Salons', 'Statistiques', 'Connecté dans', 'Commandes', 'Système', 'Platform' ],


    // SETPREFIX COMMAND
    SETPREFIX_ERR: [ `${emotes.x} Le nouveau préfixe ne peut pas dépasser **10** caractères`, `${emotes.x} Le préfixe ne peut pas contenir d'espaces ou de mentions globales ou même de "`],
    SETPREFIX_SUCCESS: (prefix) => `${emotes.v} Le nouveau préfix est désormais \`${prefix}\``,


    // REMOVE COMMAND
    REMOVE_ERR: [ `${emotes.x} Afin de retirer une piste de la file d'attente, il doit y avoir au moins **3** musiques dans la file d'attente`,
    `${emotes.x} Veuillez indiquer une position valide dans la fille d'attente (utilisez la commande \`queue\` pour chercher une position)` ],
    REMOVE_SUCCESS: (song) => `${emotes.v} La musique **${song}** a bien été retiré de la file d'attente`,


    // SEEK COMMAND
    SEEK_ERR: [ `${emotes.x} Veuillez indiquer un temps correct (en secondes)`,
    `${emotes.x} Une erreur est survenue, le temps saisi est incorrect.\nVérifiez que vous avez indiquer un temps en secondes inférieur à la durée de la musique` ],
    SEEK_SUCCESS: (time) => `${emotes.v} La musique a été correctement avancée à ${time}` 
}