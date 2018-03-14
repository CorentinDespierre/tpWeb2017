
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
    var editingMode = { rect: 0, line: 1, circ: 2 };

    function Pencil(ctx, drawing, canvas) {
        this.currEditingMode = editingMode.line;
        this.currLineWidth = 5;
        this.currColour = '#000000';
        this.currentShape = 0;

        // Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

        this.DnD = new DnD(canvas, this);

        this.getAttrib = function(){
            this.currLineWidth = document.getElementById('spinnerWidth').value;
            this.currColour = document.getElementById('colour').value;

            if(document.getElementById('buttonRect').checked){
                this.currEditingMode = editingMode.rect;
            }
            else if(document.getElementById('buttonLine').checked){
                this.currEditingMode = editingMode.line;
            }

        }
        // Implémentez ici les 3 fonctions startInteraction, updateInteraction et endInteraction
        this.startInteraction = function(){

            this.getAttrib();

            if(this.currEditingMode == editingMode.line){
                this.currentShape = new Line(
                    this.DnD.debutX,
                    this.DnD.debutY,
                    this.DnD.debutX,
                    this.DnD.debutY,
                    this.currColour,
                    this.currLineWidth);
            }
            else if(this.currEditingMode == editingMode.rect){
                this.currentShape = new Rectangle(
                    this.DnD.debutX,
                    this.DnD.debutY,
                    0,
                    0,
                    this.currColour,
                    this.currLineWidth);
            }

            this.currentShape.paint(ctx, canvas);
        }.bind(this);





        this.updateInteraction = function(){

            if(this.currEditingMode == editingMode.line){
                this.currentShape = new Line(
                    this.DnD.debutX,
                    this.DnD.debutY,
                    this.DnD.finX,
                    this.DnD.finY,
                    this.currColour,
                    this.currLineWidth);
            }
            else if(this.currEditingMode == editingMode.rect){
                this.currentShape = new Rectangle(
                    this.DnD.debutX,this.DnD.debutY,
                    this.DnD.finX-this.DnD.debutX,
                    this.DnD.finY-this.DnD.debutY,
                    this.currColour,this.currLineWidth);
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawing.paint(ctx, canvas);
            this.currentShape.paint(ctx, canvas);
        }.bind(this);




        this.endInteraction = function(){

            if(this.currEditingMode == editingMode.line){
                this.currentShape = new Line(
                    this.DnD.debutX,
                    this.DnD.debutY,
                    this.DnD.finX,
                    this.DnD.finY,
                    this.currColour,
                    this.currLineWidth);
            }
            else if(this.currEditingMode == editingMode.rect){
                this.currentShape = new Rectangle(this.DnD.debutX,
                    this.DnD.debutY,
                    this.DnD.finX-this.DnD.debutX,
                    this.DnD.finY-this.DnD.debutY,
                    this.currColour,
                    this.currLineWidth);
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawing.shapeAdd(this.currentShape);
            drawing.paint(ctx, canvas);
            this.currentShape = 0;
            drawing.updateShapeList();

        }.bind(this);

    }
	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
};


