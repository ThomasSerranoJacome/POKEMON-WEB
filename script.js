function buscarPokemon() {

  const nombre = document.getElementById("input").value.toLowerCase();
  const url = "https://pokeapi.co/api/v2/pokemon/" + nombre;

  fetch(url)
    .then(response => response.json())
    .then(datos => {

      const nombrePoke = datos.name;
      const imagen     = datos.sprites.front_default;
      const tipo       = datos.types[0].type.name;
      const altura     = datos.height / 10 + " m";
      const peso       = datos.weight / 10 + " kg";

      const resultado = document.getElementById("resultado");
      resultado.textContent = "";

      const img = document.createElement("img");
      img.src = imagen;

      const h2 = document.createElement("h2");
      h2.textContent = nombrePoke;

      const pTipo = document.createElement("p");
      pTipo.textContent = "Tipo: " + tipo;

      const pAltura = document.createElement("p");
      pAltura.textContent = "Altura: " + altura;

      const pPeso = document.createElement("p");
      pPeso.textContent = "Peso: " + peso;

      resultado.appendChild(img);
      resultado.appendChild(h2);
      resultado.appendChild(pTipo);
      resultado.appendChild(pAltura);
      resultado.appendChild(pPeso);
    })
    .catch(error => {
      const resultado = document.getElementById("resultado");
      resultado.textContent = "Pokémon no encontrado. Verifica el nombre.";
    });
}


function cargarTipos() {

  fetch("https://pokeapi.co/api/v2/type")
    .then(response => response.json())
    .then(datos => {

      const select = document.getElementById("selectTipo");

      datos.results.forEach(tipo => {
        const option = document.createElement("option");
        option.value = tipo.name;
        option.textContent = tipo.name;
        select.appendChild(option);
      });
    });
}


function buscarPorTipo() {

  const tipo = document.getElementById("selectTipo").value;
  if (!tipo) return;

  const url = "https://pokeapi.co/api/v2/type/" + tipo;

  fetch(url)
    .then(response => response.json())
    .then(datos => {

      const resultadoTipo = document.getElementById("resultadoTipo");
      resultadoTipo.textContent = "";

      const titulo = document.createElement("h2");
      titulo.textContent = "Tipo: " + tipo;

      const lista = document.createElement("ul");

      datos.pokemon.slice(0, 10).forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.pokemon.name;
        lista.appendChild(li);
      });

      resultadoTipo.appendChild(titulo);
      resultadoTipo.appendChild(lista);
    })
    .catch(error => {
      document.getElementById("resultadoTipo").textContent = "Error al buscar.";
    });
}


function buscarEvolucion() {

  const nombre = document.getElementById("inputEvo").value.toLowerCase();

  fetch("https://pokeapi.co/api/v2/pokemon-species/" + nombre)
    .then(response => response.json())
    .then(especie => {

      const urlCadena = especie.evolution_chain.url;
      return fetch(urlCadena);
    })
    .then(response => response.json())
    .then(datos => {

      const resultadoEvo = document.getElementById("resultadoEvo");
      resultadoEvo.textContent = "";

      const titulo = document.createElement("h2");
      titulo.textContent = "Evoluciones";

      const lista = document.createElement("ul");

      const li1 = document.createElement("li");
      li1.textContent = datos.chain.species.name;
      lista.appendChild(li1);

      if (datos.chain.evolves_to.length > 0) {
        const li2 = document.createElement("li");
        li2.textContent = datos.chain.evolves_to[0].species.name;
        lista.appendChild(li2);

        if (datos.chain.evolves_to[0].evolves_to.length > 0) {
          const li3 = document.createElement("li");
          li3.textContent = datos.chain.evolves_to[0].evolves_to[0].species.name;
          lista.appendChild(li3);
        }
      }

      resultadoEvo.appendChild(titulo);
      resultadoEvo.appendChild(lista);
    })
    .catch(error => {
      document.getElementById("resultadoEvo").textContent = "Pokémon no encontrado.";
    });
}


cargarTipos();