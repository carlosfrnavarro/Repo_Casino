$(document).ready(function(){
    // Manejar el clic en el botón para cambiar a la pantalla de registro
    $('#goRight').on('click', function(){
        $('#slideBox').animate({
            'marginLeft': '0'
        });
        $('.topLayer').animate({
            'marginLeft': '100%'
        });
    });

    // Manejar el clic en el botón para cambiar a la pantalla de inicio de sesión
    $('#goLeft').on('click', function(){
        if (window.innerWidth > 769){
            $('#slideBox').animate({
                'marginLeft': '50%'
            });
        }
        else {
            $('#slideBox').animate({
                'marginLeft': '20%'
            });
        }
        $('.topLayer').animate({
            'marginLeft': '0'
        });
    });

    // Simulación de inicio de sesión
    $('#form-login').on('submit', function(e){
        e.preventDefault(); // Evitar el envío real del formulario

        // Obtener los valores de los campos del formulario
        var username = $('#username-login').val().trim();
        var password = $('#password-login').val().trim();

        // Validar que ambos campos estén llenos
        if(username === "" || password === "") {
            alert("Por favor, rellene todos los campos.");
        } else {
            window.location.href = 'casino.html'; // Redirigir a la página del casino
        }
    });

    /* ====================== *
     *  Iniciar Canvas        *
     * ====================== */
    paper.install(window);
    paper.setup(document.getElementById("canvas"));

    var canvasWidth, canvasHeight, canvasMiddleX, canvasMiddleY;
    var shapeGroup = new paper.Group();
    var positionArray = [];

    function getCanvasBounds() {
        canvasWidth = view.size.width;
        canvasHeight = view.size.height;
        canvasMiddleX = canvasWidth / 2;
        canvasMiddleY = canvasHeight / 2;
        positionArray = [
            {x: (canvasMiddleX / 2) + 100, y: 100},
            {x: 200, y: canvasMiddleY},
            {x: (canvasMiddleX - 50) + (canvasMiddleX / 2), y: 150},
            {x: 0, y: canvasMiddleY + 100},
            {x: canvasWidth - 130, y: canvasHeight - 75},
            {x: canvasMiddleX + 80, y: canvasHeight - 50},
            {x: canvasWidth + 60, y: canvasMiddleY - 50},
            {x: canvasMiddleX + 100, y: canvasMiddleY + 100}
        ];
    }

    function initializeShapes() {
        getCanvasBounds();

        var shapePathData = [
            'M231,352l445-156L600,0L452,54L331,3L0,48L231,352',
        ];

        for (var i = 0; i < shapePathData.length; i++) {
            var headerShape = new paper.Path({
                strokeColor: 'rgba(255, 255, 255, 0.5)',
                strokeWidth: 2,
                parent: shapeGroup,
            });
            headerShape.pathData = shapePathData[i];
            headerShape.scale(2);
            headerShape.position = new paper.Point(positionArray[i].x, positionArray[i].y);
        }
    }

    initializeShapes();

    view.onFrame = function(event) {
        for (var i = 0; i < shapeGroup.children.length; i++) {
            var child = shapeGroup.children[i];
            if (i % 2 === 0) {
                child.rotate(-0.1);
            } else {
                child.rotate(0.1);
            }
        }
    };

    view.onResize = function(event) {
        getCanvasBounds();
        for (var i = 0; i < shapeGroup.children.length; i++) {
            shapeGroup.children[i].position = new paper.Point(positionArray[i].x, positionArray[i].y);
        }
    };
});
