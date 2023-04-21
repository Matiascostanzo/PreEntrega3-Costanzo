// Paso 1: Mostrar la lista de destinos disponibles
// Paso 2: Que el usuario ingrese el codigo del destino que quiere ir y corroborar que esté en el array de destinos
// Paso 3: Preguntarle al usuario si esta seguro de querer agregar esa Excursion
// Paso 4: Si confirma, agregarlo al carrito , sino, volver Atras
// Paso 5: Preguntarle si quiere seguir agregando algun destino, si si, volver a solicitar que el usuario ingrese un codigo, sino, mostrar el total del carrito y finalizar
let destinoEncontrado = [];

//Recorre el array de destinos con un forEach y los muestra
function mostrarDestinos() {
  console.log("Destinos disponibles:");
  destinos.forEach(function (destino) {
    console.log(destino);
  });
}

//Recorre el array de carrito de compras con un forEach y los muestra
function mostrarCarrito() {
  carrito.forEach(function (carro) {
    alert("Estas son tus compras: " + carro.nombre + " - " + carro.precio); // Mostrar solo el nombre y el precio de cada elemento en el carrito
  });

  const precioTotal = new Eleccion(carrito);
  alert(
    "El precio total de las excursiones en el carrito es de: " +
      precioTotal.subtotal()
  );
}

//El usuario elije el codigo del destino que quiere visitar
function elegirDestino(nombreDestino) {
  //Busca el codigo ingresado por el usuario en el array destinos
  destinoEncontrado = destinos.find(
    (destino) => destino.nombre === nombreDestino
  );
  while (destinoEncontrado === undefined) {
    alert(
      "El codigo ingresado es invalido, por favor ingresar un codigo valido"
    );

    destinoEncontrado = destinos.find(
      (destino) => destino.nombre === nombreDestino
    );
  }

  alert(
    "Destino elegido: " +
      destinoEncontrado.nombre +
      ", " +
      destinoEncontrado.pais +
      ", $USD " +
      destinoEncontrado.precio +
      "."
  );
}

function agregarAlCarrito() {
  let eleccion = confirm(
    "¿Quieres agregar ese destino a tu carrito de compras?"
  );
  //Si el usuario confirma que quiere agregar esa excursion, la agrega al carrito
  if (eleccion === true) {
    console.log("Se agregó la excursion al carrito");
    carrito.push(destinoEncontrado);
    actualizarCarrito();
  } else {
    console.log("Se eliminó la excursion:" + destinoEncontrado.nombre);
  }
}

//Si el usuario quiere seguir agregando excursiones, llamo a las funciones elegisDestino y agregarAlCarrito
function elegirOtro() {
  let decision = true;
  while (decision) {
    decision = confirm("¿Quieres seguir agregando excursiones al carrito?");
    if (decision) {
      elegirDestino();
      agregarAlCarrito();
    }
  }
}

//Funcion principal que llama al resto de las funciones y al final reinicio el carrito a 0
function compras() {
  mostrarDestinos();
  elegirDestino();
  agregarAlCarrito();
  elegirOtro();
  mostrarCarrito();
  carrito.length = 0;
}

//Eventos:

//Eventos para el buscador

const input = document.querySelector(".src");
const resultsWrapper = document.querySelector(".results");

//Funcion para mostrar los resultados de la busqueda del usuario

const showResults = (results) => {
  resultsWrapper.innerHTML = "";
  //Crea una lista desordenada en el html y una clase llamada results-list
  const resultsList = document.createElement("ul");
  resultsList.classList.add("results-list");
  resultsWrapper.appendChild(resultsList);

  //Se recorre el array de resultados y se crea por cada elemento encontrado, un elemento li y se lo agrega a la clase result-item
  results.forEach((result) => {
    const li = document.createElement("li");
    li.classList.add("result-item");
    li.textContent = result.nombre + " (" + result.pais + ")";
    //Cuando hago click en el resultado que me muestra, me autocompleta en el buscador eso mismo que me apareció en la lista
    li.addEventListener("click", () => {
      input.value = result.nombre + " (" + result.pais + ")";
      resultsWrapper.style.display = "none";
    });
    //Cuando el mouse esta sobre una de las opciones, crea una clase llamada result-item-hover la cual tiene ciertos atributos que cambian el color de fondo para que el usuario se de cuenta que puede hacerle click
    li.addEventListener("mouseover", () => {
      li.classList.add("result-item-hover");
    });
    li.addEventListener("mouseout", () => {
      li.classList.remove("result-item-hover");
    });
    resultsList.appendChild(li);
  });

  resultsWrapper.style.display = "block";
};

const filterDestinos = (searchText) => {
  return destinos.filter((destino) =>
    `${destino.nombre} (${destino.pais})`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );
};

input.addEventListener("input", (e) => {
  const searchText = e.target.value;

  if (searchText.length > 0) {
    const filteredDestinos = filterDestinos(searchText);
    showResults(filteredDestinos);
  } else {
    resultsWrapper.style.display = "none";
  }
});

document.addEventListener("click", (e) => {
  if (!resultsWrapper.contains(e.target)) {
    resultsWrapper.style.display = "none";
  }
});

//Evento para reservar
//Selecciona todos los botones de "Reservar" por su clase
const botonesReservar = document.querySelectorAll(".reservar");

//Itera sobre cada botón de "Reservar" y agrega un evento de clic a cada uno
botonesReservar.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    event.preventDefault(); //Previene la acción por defecto del enlace

    const nombreDestino = boton.dataset.name; //Obtiene el valor del atributo "data-name"
    elegirDestino(nombreDestino); //Llama a la función "elegirDestino" con el nombre del destino seleccionado
    agregarAlCarrito();
  });
});

//Evento para agregar al carrito
function actualizarCarrito() {
  const carritoCount = document.getElementById("cart-count");
  carritoCount.innerHTML = carrito.length;
}

//Evento para mostrar el carrito al hacer click

const cartIcon = document.querySelector(".cart-icon");

cartIcon.addEventListener("click", () => {
  mostrarCarrito();
});
