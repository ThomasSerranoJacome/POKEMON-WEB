function buscarPokemon() {

  let nombre = document.getElementById("input").value.toLowerCase();

  let url = "https://pokeapi.co/api/v2/pokemon/" + nombre;

  fetch(url)

    .then(function(respuesta) {
      return respuesta.json();
    })

    .then(function(datos) {


      var nombre  = datos.name;                                     
      var imagen  = datos.sprites.front_default;                     
      var tipo    = datos.types[0].type.name;                        
      var altura  = datos.height / 10 + " m";                      
      var peso    = datos.weight / 10 + " kg";          

      document.getElementById("resultado").innerHTML =
        "<img src='" + imagen + "'>" +
        "<h2>" + nombre + "</h2>" +
        "<p>Tipo: " + tipo + "</p>" +
        "<p>Altura: " + altura + "</p>" +
        "<p>Peso: " + peso + "</p>";
    })

    .catch(function(error) {
      document.getElementById("resultado").innerHTML =
        "<p>Pokémon no encontrado. Verifica el nombre.</p>";
    });

}
