// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
    // Définir ici les attributs de la 'classe'
    this.debutX = 0;
    this.debutY = 0;
    this.finX = 0;
    this.finY = 0;
    var pressed = false;



    // Developper les 3 fonctions gérant les événements
    this.press = function(evenement){
        pressed = true;
        var pos = getMousePosition(canvas,evenement);
        this.debutX =this. finX = pos.x;
        this.debutY = this.finY = pos.y;
        interactor.startInteraction(this);
    }.bind(this);



    this.move = function(evenement){
        if(pressed){
            var pos = getMousePosition(canvas,evenement);
            this.finX = pos.x;
            this.finY = pos.y;
            interactor.updateInteraction(this);
        }

    }.bind(this);



    this.unPress = function(evenement){
        if(pressed){
            interactor.endInteraction(this);
            pressed = false;
        }

    }.bind(this);
    // Associer les fonctions précédentes aux évènements du canvas.
    canvas.addEventListener('mousedown', this.press, false);
    canvas.addEventListener('mousemove', this.move, false);
    canvas.addEventListener('mouseup', this.unPress, false);
}


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

