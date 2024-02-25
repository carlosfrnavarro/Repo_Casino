function updateTime() {
  const now = new Date();
  const hours = formatTime(now.getHours());
  const minutes = formatTime(now.getMinutes());
  const seconds = formatTime(now.getSeconds());

  const timeString = `${hours}:${minutes}:${seconds}`;

  document.getElementById('time').innerText = timeString;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Actualizar el tiempo cada segundo
setInterval(updateTime, 1000);

// Actualizar el tiempo inmediatamente al cargar la página
updateTime();


class Galgo {
  constructor(id, nombre, numero, color, aceleracion, velocidad, experiencia) {
    this.id = id;
    this.nombre = nombre;
    this.numero = numero;
    this.color = color;
    this.aceleracion = aceleracion;
    this.velocidad = velocidad;
    this.experiencia = experiencia;
    this.distancia = 0;
  }

  calcularCuota() {
    const factorDesempeno = this.velocidad * this.aceleracion * this.experiencia;
    const valorBase = 1000;
    return valorBase / factorDesempeno + 1.00;
  }

  calcularGanancia(apuesta) {
    // Calcula la ganancia en función de la cuota y la cantidad apostada
    this.ganancia = this.calcularCuota() * apuesta;
    return this.ganancia;
  }
}

//combobox
const selectElement = document.getElementById('opciones');

// Recupera la opción seleccionada del almacenamiento local
const selectedOption = localStorage.getItem('selectedOption');

// Establece la opción seleccionada si existe
if (selectedOption) {
  selectElement.value = selectedOption;
}

selectElement.addEventListener('change', function () {
  // Obtiene el valor seleccionado
  const selectedOption = selectElement.value;

  // Almacena la opción seleccionada en el almacenamiento local
  localStorage.setItem('selectedOption', selectedOption);

  // Recarga la página
  location.reload();
});

const galgos = [];

//instancias de clase galgo
const galgo1 = new Galgo(1, "cr7", "7", "#7A6FBE", 18, 20, 18);
const galgo2 = new Galgo(2, "messi", "10", "#885EAD", 12, 18, 7);
const galgo3 = new Galgo(3, "zidane", "5", "#4B0082", 15, 25, 6);
const galgo4 = new Galgo(4, "iniesta", "6", "#9370DB", 11, 20, 5);
const galgo5 = new Galgo(5, "rodry", "20", "#BA55D3", 13, 18, 7);
const galgo6 = new Galgo(6, "grizi", "17", "#800080", 9, 25, 6);
const galgo7 = new Galgo(7, "vini", "9", "#DA70D6", 15, 25, 6);
const galgo8 = new Galgo(8, "ramos", "4", "#D8BFD8", 12, 25, 6);
const galgo9 = new Galgo(9, "joselu", "14", "#DDA0DD", 6, 20, 5);
const galgo10 = new Galgo(10, "paco", "26", "#EE82EE", 16, 18, 7);
const galgo11 = new Galgo(11, "goldi", "69", "#FF00FF", 9, 25, 6);
const galgo12 = new Galgo(12, "modric", "30", "#FF69B4", 8, 20, 5);
const galgo13 = new Galgo(13, "xavi", "8", "#FFB6C1", 12, 18, 7);
const galgo14 = new Galgo(14, "kroos", "28", "#FFC0CB", 15, 25, 6);
const galgo15 = new Galgo(15, "pepe", "3", "#DB7093", 13, 25, 6);
const galgo16 = new Galgo(16, "pique", "42", "#C71585", 15, 25, 6);
const galgo17 = new Galgo(17, "kane", "19", "#000661", 10, 20, 5);
const galgo18 = new Galgo(18, "jude", "22", "#D2B48C", 12, 18, 7);
const galgo19 = new Galgo(19, "harry", "99", "#FFDAB9", 15, 25, 6);
const galgo20 = new Galgo(20, "unai", "1", "#47043e", 15, 25, 6);


galgos.push(galgo1, galgo2, galgo3, galgo4, galgo5, galgo6, galgo7, galgo8,
  galgo9, galgo10, galgo11, galgo12, galgo13, galgo14, galgo15, galgo16,
  galgo17, galgo18, galgo19, galgo20);


  let galgosSeleccionados = [];

  function seleccionarGallosAleatorios() {
    const galgosMezclados = galgos.sort(() => 0.5 - Math.random());
    return galgosMezclados.slice(0, 8);
  }
  
  function mostrarInformacionGallos() {
    galgosSeleccionados.forEach((galgo, index) => {
      const num = index + 1;
  
      // Actualizar elementos en el primer contenedor
      const numeroElementPrimerContenedor = document.getElementById(`numero${num}`);
      if (numeroElementPrimerContenedor) {
        numeroElementPrimerContenedor.innerText = galgo.numero;
        numeroElementPrimerContenedor.style.backgroundColor = galgo.color;
      }
  
      const nombreElementPrimerContenedor = document.getElementById(`nombre${num}`);
      if (nombreElementPrimerContenedor) {
        nombreElementPrimerContenedor.innerText = galgo.nombre;
      }
  
      const cuotaElementPrimerContenedor = document.getElementById(`cuota${num}`);
      if (cuotaElementPrimerContenedor) {
        cuotaElementPrimerContenedor.innerText = galgo.calcularCuota().toFixed(2);
      }
  
      // Actualizar elementos en el segundo contenedor
      const numeroElementSegundoContenedor = document.querySelector(`.segundo-contenedor #numero${num}`);
      if (numeroElementSegundoContenedor) {
        numeroElementSegundoContenedor.innerText = galgo.numero;
        numeroElementSegundoContenedor.style.backgroundColor = galgo.color;
      }
  
      const nombreElementSegundoContenedor = document.querySelector(`.segundo-contenedor #nombre${num}`);
      if (nombreElementSegundoContenedor) {
        nombreElementSegundoContenedor.innerText = galgo.nombre;
      }
  
      const gananciaElementSegundoContenedor = document.querySelector(`.segundo-contenedor #ganancia${num}`);
      if (gananciaElementSegundoContenedor) {
        gananciaElementSegundoContenedor.innerText = `| G. Potencial: ${(galgo.calcularCuota() * apuestaActual).toFixed(2)} fichas`;
      }
    });
  }
  
  
  function actualizarTablaClasificacion() {
    galgosSeleccionados.forEach((galgo, index) => {
      const num = index + 1;
      const tdElement = document.getElementById(`posicion${num}`);
      if (tdElement) {
        tdElement.innerText = galgo.numero;
        tdElement.style.backgroundColor = galgo.color; // Aplicar color de fondo
        tdElement.style.color = "white"; // Asegurar que el texto sea blanco para mejor contraste
      }
    });
  }

  document.getElementById('btnIniciarCarrera').addEventListener('click', function() {
    iniciarCarrera();
    this.style.display = 'none'; // Oculta el botón
});

  
for (let i = 1; i <= 8; i++) {
  document.getElementById(`apuesta${i}`).addEventListener("click", function() {
    realizarApuesta(i);
  });
}

function realizarApuesta(galgoIndex) {
  if (apuestaActual > 0) {
    galgoApostado = galgosSeleccionados[galgoIndex - 1];
    alert(`Has apostado ${apuestaActual} fichas a ${galgoApostado.nombre}, buena suerte!`);
    iniciarCarrera(); // Inicia la carrera
    document.getElementById('btnIniciarCarrera').style.display = 'none'; // Oculta el botón de iniciar carrera
  } else {
    alert("Primero debe ingresar una apuesta.");
  }
}

  
  function actualizarSeccionApuestas() {
    galgosSeleccionados.forEach((galgo, index) => {
        const num = index + 1;
        const fieldset = document.getElementById(`fieldset_apuesta_${num}`);
        if (fieldset) {
            const numeroElement = fieldset.querySelector(`p#numero${num}`);
            const nombreElement = fieldset.querySelector(`p#nombre${num}`);
            const gananciaElement = fieldset.querySelector(`p#ganancia${num}`);
            if (numeroElement && nombreElement && gananciaElement) {
                numeroElement.innerText = galgo.numero;
                nombreElement.innerText = galgo.nombre;
                const gananciaPotencial = (galgo.calcularCuota() * apuestaActual).toFixed(2);
                gananciaElement.innerText = `| G. Potencial: ${gananciaPotencial} fichas`;
            }
        }
    });
}


let carreraTerminada = false;

function iniciarCarrera() {
  let galgosTerminados = 0;
  let ordenLlegada = [];
  carreraTerminada = false;

  galgosSeleccionados.forEach((galgo, index) => {
      const num = index + 1;
      const velocidadTotal = galgo.velocidad + galgo.aceleracion + galgo.experiencia;
      let progreso = 0;

      const barraProgreso = document.querySelector(`#progreso${num}`);
      if (barraProgreso) {
          barraProgreso.style.backgroundColor = galgo.color;
      }

      const intervalo = setInterval(() => {
          progreso += velocidadTotal / 200;
          if (progreso >= 100) {
              progreso = 100;
              clearInterval(intervalo);

              if (!ordenLlegada.includes(galgo.id)) {
                  ordenLlegada.push(galgo.id);
                  galgosTerminados++;
              }

              if (galgosTerminados === galgosSeleccionados.length && !carreraTerminada) {
                  carreraTerminada = true;
                  mostrarResultados(ordenLlegada);
              }
          }
          galgo.distancia = progreso;
          if (barraProgreso) {
              barraProgreso.style.width = `${progreso}%`;
          }
      }, 50);
  });
}


function actualizarTablaClasificacionDinamica() {
  const galgosOrdenados = [...galgosSeleccionados].sort((a, b) => b.distancia - a.distancia);
  galgosOrdenados.forEach((galgo, index) => {
    const num = index + 1;
    const barraProgreso = document.getElementById(`progreso${num}`);
    if (barraProgreso) {
        barraProgreso.style.backgroundColor = galgo.color;
    }
  });
}

  
function mostrarResultados(ordenLlegada) {
  let ganadores = ordenLlegada.map(id => 
      galgosSeleccionados.find(galgo => galgo.id === id));

  // Actualizar tabla de clasificación con el orden final
  ganadores.forEach((galgo, index) => {
      const tdElement = document.getElementById(`posicion${index + 1}`);
      if (tdElement) {
          tdElement.innerText = galgo.numero;
      }
  });

  const legendClasificacion = document.querySelector('.fieldset-clasificacion legend');
  if (legendClasificacion) {
    legendClasificacion.textContent = "Clasificación Final";
  }

  // Mostrar alerta con los tres primeros ganadores
  alert(`Ganadores: 1º ${ganadores[0].nombre}, 2º ${ganadores[1].nombre}, 3º ${ganadores[2].nombre}`);

  // Calcular y mostrar las ganancias
  calcularGanancias(ordenLlegada);
}



  let apuestaActual = 0;
  let galgoApostado = null;
  
  document.getElementById("BtnApostar").addEventListener("click", function() {
    const inputApuesta = prompt("Ingrese la cantidad de fichas a apostar:");
    const cantidadApostada = parseInt(inputApuesta);
    if (!isNaN(cantidadApostada) && cantidadApostada > 0 && cantidadApostada <= model.saldo) {
        apuestaActual = cantidadApostada;
        model.apuestaTotal += cantidadApostada;
        model.saldo -= cantidadApostada;
        view.actSaldo();
        view.actApuestaTotal();
        actualizarSeccionApuestas();
    } else {
        alert("Cantidad inválida o saldo insuficiente.");
    }
});




function calcularGanancias(ordenLlegada) {
  if (galgoApostado) {
      // Encuentra la posición final del galgo apostado
      const posicion = ordenLlegada.findIndex(id => id === galgoApostado.id) + 1;

      let ganancia = 0;
      if (posicion === 1) {
          ganancia = Math.round(galgoApostado.calcularGanancia(apuestaActual)); // 100% de la ganancia
      } else if (posicion === 2) {
          ganancia = Math.round(galgoApostado.calcularGanancia(apuestaActual) * 0.5); // 50% de la ganancia
      } else if (posicion === 3) {
          ganancia = Math.round(galgoApostado.calcularGanancia(apuestaActual) * 0.25); // 25% de la ganancia
      } else if (posicion === 4) {
          ganancia = Math.round(apuestaActual); // Recupera la apuesta
      }

      model.saldo += ganancia; // Actualiza el saldo
      view.actSaldo(); // Actualiza la vista con el nuevo saldo
      alert(`Ganancias: ${ganancia} fichas`);
  }
}






function mostrarEstadisticasGalgos() {
  const cuotaTotal = calcularCuotaTotal(galgosSeleccionados);
  const contenedorEstadisticas = document.getElementById('contenidoEstadisticas');
  contenedorEstadisticas.innerHTML = ''; // Limpiar contenido anterior

  galgosSeleccionados.forEach(galgo => {
      const estadisticasGalgo = document.createElement('div');
      estadisticasGalgo.classList.add('estadisticas-galgo');

      const probabilidadVictoria = calcularProbabilidadVictoria(galgo, cuotaTotal);

      const info = `
          <p>Nombre: ${galgo.nombre.toUpperCase()}</p>  // Nombre en mayúsculas
          <p>Número: ${galgo.numero}</p>
          <p>Velocidad: ${galgo.velocidad}</p>
          <p>Experiencia: ${galgo.experiencia}</p>
          <p>Aceleración: ${galgo.aceleracion}</p>
          <p>Probabilidad de Victoria: ${probabilidadVictoria}%</p>
      `;

      estadisticasGalgo.innerHTML = info;
      contenedorEstadisticas.appendChild(estadisticasGalgo);
  });
}



// Obtener el modal
var modal = document.getElementById("modalEstadisticas");

// Obtener el botón que abre el modal
var btn = document.getElementById("btnVerEstadisticas");

// Obtener el elemento <span> que cierra el modal
var span = document.getElementsByClassName("close")[1]; // Cambia el índice a 1 para seleccionar el segundo elemento <span>

span.onclick = function() {
    modal.style.display = "none";
}

// Cuando el usuario hace clic en el botón, abre el modal
btn.onclick = function() {
    modal.style.display = "block";
    mostrarEstadisticasGalgos();
}


span.onclick = function() {
    modal.style.display = "none";
}

// Cierra el modal si el usuario hace clic fuera de él
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function calcularCuotaTotal(galgos) {
  let sumaInversa = 0;
  galgos.forEach(galgo => {
      sumaInversa += 1 / galgo.calcularCuota();
  });
  return 1 / sumaInversa;
}

function calcularProbabilidadVictoria(galgo, cuotaTotal) {
  const cuotaIndividual = galgo.calcularCuota();
  const probabilidad = (cuotaTotal / cuotaIndividual) * 100;
  return probabilidad.toFixed(2); // Redondea a dos decimales
}

function mostrarEstadisticasGalgos() {
  const cuotaTotal = calcularCuotaTotal(galgosSeleccionados);
  const contenedorEstadisticas = document.getElementById('contenidoEstadisticas');
  contenedorEstadisticas.innerHTML = ''; // Limpiar contenido anterior

  galgosSeleccionados.forEach(galgo => {
      const estadisticasGalgo = document.createElement('div');
      estadisticasGalgo.classList.add('estadisticas-galgo');

      const probabilidadVictoria = calcularProbabilidadVictoria(galgo, cuotaTotal);

      const info = `
          <p>Nombre: ${galgo.nombre}</p>
          <p>Número: ${galgo.numero}</p>
          <p>Velocidad: ${galgo.velocidad}</p>
          <p>Experiencia: ${galgo.experiencia}</p>
          <p>Aceleración: ${galgo.aceleracion}</p>
          <p>Probabilidad de Victoria: ${probabilidadVictoria}%</p>
      `;

      estadisticasGalgo.innerHTML = info;
      contenedorEstadisticas.appendChild(estadisticasGalgo);
  });
}


document.getElementById('btnAyuda').addEventListener('click', function(event) {
  event.preventDefault(); // Previene el comportamiento por defecto del enlace
  document.getElementById('modalAyuda').style.display = 'block';
});

// Código existente para manejar el cierre del modal
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  document.getElementById('modalAyuda').style.display = 'none';
}

window.onclick = function(event) {
  var modal = document.getElementById('modalAyuda');
  if (event.target == modal) {
      modal.style.display = 'none';
  }
}




//MVC
const model = {
  saldo: 0,
};

const view = {
  actSaldo: function () {
    // Mostrar el saldo sin decimales
    document.getElementById("dinero_banco").innerHTML = `Saldo: ${model.saldo} fichas`;
  },
  actApuestaTotal: function() {
    document.querySelector('.apuesta').innerHTML = `APUESTA TOTAL: ${model.apuestaTotal} fichas`;
}
};

const controller = {
  init: function () {
    var btn_Ingresar = document.getElementById("BtnIngresar");
    btn_Ingresar.addEventListener("click", this.ingresarSaldo.bind(this));

    var btn_Retirar = document.getElementById("BtnRetirar");
    btn_Retirar.addEventListener("click", this.retirarDinero.bind(this));
  },
  ingresarSaldo: function () {
    // Solicitar al usuario la cantidad de dinero a ingresar
    var input_pruebaIng = prompt("Ingrese la cantidad de fichas:");

    // Convertir la entrada a un número entero
    input_pruebaIng = parseInt(input_pruebaIng);

    // Verificar si la entrada es un número entero válido y positivo
    if (!isNaN(input_pruebaIng) && input_pruebaIng > 0) {
      // Actualizar el saldo
      model.saldo += input_pruebaIng;
      view.actSaldo();
    } else {
      alert("Por favor, ingrese una cantidad válida y positiva.");
    }
  },
  retirarDinero: function () {
    if (model.saldo > 0) {
      // Retirar dinero solo si el saldo es mayor que 0
      model.saldo = 0;
      view.actSaldo();
    } else {
      alert("No hay saldo para retirar.");
    }
  },
  apostar: function () {
    // Solicitar al usuario la cantidad de fichas a apostar
    var input_apuesta = prompt("Ingresa la cantidad de fichas que quieres apostar:");

    // Convertir la entrada a un número entero
    input_apuesta = parseInt(input_apuesta);

    // Verificar si la entrada es un número entero válido y positivo
    if (!isNaN(input_apuesta) && input_apuesta > 0) {
      // Verificar si hay suficientes fichas para realizar la apuesta
      if (input_apuesta <= model.saldo) {
        // Actualizar el modelo y la vista
        model.saldo -= input_apuesta;
        model.apuestaTotal += input_apuesta;

        // Actualizar la vista con la nueva apuesta total
        document.querySelector('.apuesta').innerHTML = `APUESTA TOTAL: ${model.apuestaTotal} fichas`;
        
        view.actSaldo();
      } else {
        alert("No hay suficientes fichas para realizar esa apuesta.");
      }
    } else {
      alert("Por favor, ingrese una cantidad válida y positiva.");
    }
  },
};

model.apuestaTotal = 0;

controller.init();

document.addEventListener('DOMContentLoaded', () => {
  galgosSeleccionados = seleccionarGallosAleatorios();
  mostrarInformacionGallos();
  actualizarTablaClasificacion();
  actualizarSeccionApuestas();
  document.getElementById('btnIniciarCarrera').addEventListener('click', iniciarCarrera);
});