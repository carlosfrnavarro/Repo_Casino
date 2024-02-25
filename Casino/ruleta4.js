//BARRA DE PROGRESO

var barraDeProgreso = document.getElementById('barraDeProgreso');
var duracionTotal = 30; // Duración total en segundos
var intervalo = 1000; // Intervalo de actualización en milisegundos (1 segundo)
var decremento = 100 / duracionTotal; // Decremento en cada intervalo

var progreso = duracionTotal;

var intervaloID = setInterval(function() {
  barraDeProgreso.value = progreso;
  console.log("Segundo " + (duracionTotal - progreso + 1));

  if (progreso <= 0) {
    clearInterval(intervaloID);
    spin();
  }

  progreso--;
}, intervalo);

function reiniciarBarraDeProgreso() {
    progreso = duracionTotal;
    barraDeProgreso.value = progreso;
    // Reinicia el intervalo para que la barra de progreso disminuya nuevamente
    iniciarIntervalo();
  }
  
  function iniciarIntervalo() {
    clearInterval(intervaloID);  // Detén el intervalo actual antes de iniciar uno nuevo
    intervaloID = setInterval(function() {
      barraDeProgreso.value = progreso;
      console.log("Segundo " + (duracionTotal - progreso + 1));
  
      if (progreso <= 0) {
        clearInterval(intervaloID);
        // Llama a la función spin() cuando la barra de progreso llega a cero
        spin();
        // Reinicia la barra de progreso después de que la ruleta termine de girar
        setTimeout(reiniciarBarraDeProgreso, spinTimeTotal);
      }
  
      progreso--;
    }, intervalo);
  }
  
  // Inicia el intervalo cuando carga la página
  iniciarIntervalo();

//RULETA

var options = ["0", "32", "15", "19", "4", "21", "2", "25", "17", "34", "6", "27", "13", "36", "11", "30", "8", "23", "10", "5", "24", "16", "33", "1", "20", "14", "31", "9", "22", "18", "29", "7", "28", "12", "35", "3", "26"];

var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

document.getElementById("spin").addEventListener("click", spin);

function byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function drawRouletteWheel() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var outsideRadius = 250;
        var textRadius = 230;
        var insideRadius = 100;

        ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,500,500);

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;

        ctx.font = 'bold 12px Helvetica, Arial';
        ctx.fillStyle = "white";

        // Dibuja el círculo central
        ctx.fillStyle = "#fff"; // Cambia el color de fondo aquí
        ctx.beginPath();
        ctx.arc(250, 250, insideRadius, 0, 2 * Math.PI, false);
        ctx.fill();

        for(var i = 0; i < options.length; i++) {
            var angle = startAngle + i * arc;

            switch (i) {
                case 0:
                    ctx.fillStyle = "#3859ff";
                    break;
                case 1:
                case 3:
                case 5:
                case 7:
                case 9:
                case 11:
                case 13:
                case 15:
                case 17:
                case 19:
                case 21:
                case 23:
                case 25:
                case 27:
                case 29:
                case 31:
                case 33:
                case 35:
                    ctx.fillStyle = "#e73ccb";
                    break;
                default:
                    ctx.fillStyle = "#080D3F";
                    break;
            }

            ctx.beginPath();
            ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
            ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();

            ctx.save();
            ctx.shadowOffsetX = -1;
            ctx.shadowOffsetY = -1;
            ctx.shadowBlur    = 0;
            ctx.shadowColor   = "rgb(220,220,220)";
            ctx.fillStyle = "white";
            ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 
                            250 + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            var text = options[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
        } 

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
        ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.fill();
    }
}

function spin() {
    reiniciarBarraDeProgreso();
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
}

function rotateWheel() {
    spinTime += 30;
    if(spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout('rotateWheel()', 30);
}

var numeroGanador;
var ganancias = 0;
var numeroApostado;
var valorFicha;
var saldo= 0

function stopRotateWheel() {
    clearTimeout(spinTimeout);

    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);

    ctx.save();
    ctx.font = 'bold 30px Helvetica, Arial';
    var text = options[index];

    // Agrega el resultado al array
    resultadosRuleta.push(text);

    // Muestra el resultado en el canvas
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);

    ctx.restore();

    numeroGanador = parseInt(text, 10);

    // Verificar si el número ganador coincide con el número apostado
    if (numeroGanador === numeroApostado) {
        // Calcular ganancias si acierta
        ganancias = valorFicha * 36;
        saldo += ganancias;
    } else {
        // Restar la apuesta al saldo si no acierta
        ganancias -= valorFicha;
        saldo += ganancias;
    }

    document.querySelector('.boton-saldo').innerText = 'SALDO: ' + saldo.toFixed(0) + ' FICHAS';

    // Actualiza la lista de resultados en el HTML
    mostrarResultadosEnHTML();

    actualizarHotAndCold();
    actualizarElementosHTML();
}

function easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
}

drawRouletteWheel();


//HORA
function mostrarHora() {
    var fecha = new Date();
    var horas = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();

    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;

    var horaActual = horas + ':' + minutos + ':' + segundos;
    document.getElementById('horaActual').innerText = horaActual;
}

setInterval(mostrarHora, 1000);

mostrarHora();



//INGRESAR DINERO
document.querySelector('.boton-dinero[value="INGRESAR DINERO"]').addEventListener('click', function (event) {
    event.preventDefault();

    var cantidadDinero = parseFloat(prompt('Ingrese la cantidad de dinero:'));

    if (cantidadDinero !== null && !isNaN(cantidadDinero) && parseFloat(cantidadDinero) > 0) {
        // Suma la cantidad de dinero ingresada al saldo actual
        saldoActual += cantidadDinero;

        // Actualiza el texto del saldo
        document.querySelector('.boton-saldo').innerText = 'SALDO: ' + saldoActual.toFixed(0) + ' FICHAS';
    } else {
        alert('Por favor, ingrese una cantidad de dinero válida.');
    }
});


//RETIRAR DINERO
document.querySelector('.boton-dinero[value="RETIRAR DINERO"]').addEventListener('click', function (event) {
    event.preventDefault();

    // Obtener el saldo actual
    var saldoActual = parseFloat(document.querySelector('.boton-saldo').innerText.replace('SALDO: ', '').replace(' FICHAS', ''));

    // Verificar si el saldo es distinto de cero
    if (saldoActual !== 0) {
        // Establecer el saldo en cero
        document.querySelector('.boton-saldo').innerText = 'SALDO: 0 FICHAS';
        alert('Dinero retirado con éxito.');
    } else {
        alert('No hay saldo para retirar.');
    }
});


//RESULTADOS DE LA RULETA
var resultadosRuleta = [];

function mostrarResultadosEnHTML() {    

    // MUESTRA LOS RESULTADOS DE LA RULETA
    var resultadosRuletaElement = document.querySelector(".resultados");
    resultadosRuletaElement.textContent = resultadosRuleta.join(', ');

}

var saldoActual = 0;
var apuestaActual = 0;
var ganancias = 0;

document.querySelector('.boton-saldo').innerText = 'SALDO: ' + saldoActual.toFixed(0) + ' FICHAS';


function seleccionarFicha(valorFicha, event) {
    event.preventDefault(); // Evitar la recarga de la página

    if (progreso > 0) {
        var saldoRedondeado = Math.round(saldoActual * 100) / 100;
        var valorFichaRedondeado = Math.round(valorFicha * 100) / 100;

        if (saldoRedondeado - valorFichaRedondeado >= 0) {
            // Asignar valores a las variables
            valorFicha = valorFichaRedondeado;
            numeroApostado = parseInt(event.target.textContent, 10);

            apuestaActual = valorFicha;
            document.querySelector('.apuesta').textContent = 'VALOR DE LA APUESTA: ' + apuestaActual + ' FICHAS';
        } else {
            alert('Saldo insuficiente para esta apuesta.');
        }
    } else {
        alert('NO VA MÁS');
    }
}




//HOT AND COLD
var hotAndCold = Array.from({ length: 37 }, (_, i) => i); // Inicialmente, del 0 al 36

function actualizarHotAndCold() {
   // Obtener el último resultado de la ruleta
   var ultimoResultado = resultadosRuleta[resultadosRuleta.length - 1];

   // Convertir a número si es una cadena
   ultimoResultado = parseInt(ultimoResultado, 10);

   // Mover el número al principio del array
   if (!isNaN(ultimoResultado)) {
       // Eliminar el número si ya existe en el array
       hotAndCold = hotAndCold.filter(numero => numero !== ultimoResultado);

       // Agregar el número al principio del array
       hotAndCold.unshift(ultimoResultado);
   }

   // Limitar la longitud del array a 10 elementos (puedes ajustar este valor según tus necesidades)
   hotAndCold = hotAndCold.slice(0, 10);

   // Actualizar los elementos HTML con los primeros 5 como "Hot" y los últimos 5 como "Cold"
   actualizarElementosHTML();
}



console.log("Hot & Cold Inicial:", hotAndCold);

function actualizarElementosHTML() {
   // Obtener los elementos HTML
   var hotElement = document.getElementById('hot');
   var coldElement = document.getElementById('cold');

   // Obtener los primeros 5 y los últimos 5 números de hotAndCold
   var hotNumeros = hotAndCold.slice(0, 5).join(', ');
   var coldNumeros = hotAndCold.slice(-5).reverse().join(', ');

   // Actualizar el contenido de los elementos HTML
   hotElement.textContent = 'Hot: ' + hotNumeros;
   coldElement.textContent = 'Cold: ' + coldNumeros;
}
