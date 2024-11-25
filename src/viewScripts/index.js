document.addEventListener("DOMContentLoaded", async () => {

})

const resultContainer = document.getElementById("result");
const creatingContainer = document.getElementById("creating");
const loadButton = document.getElementById("load-button");
const createButton = document.getElementById("create-button");

loadButton.addEventListener("click", async () => {
  resultContainer.innerHTML = "Cargando...";
  try {
    const data = await window.fun.getData();
    console.log(data, "la data esta aqui");
    renderData(data);
  } catch (error) {
    resultContainer.innerHTML = "¡Error al cargar los datos!";
  }
});

function renderData(data) {
  if (data && data.length > 0) {
    const content = data
      .map(
        (item) =>
          `<span>Despiojado = ${item.Despiojado}</span>
          <br/>
          <span>Razon = ${item.Razon}</span>
          <br/>
          <span>Tarifa = ${item.Tarifa}</span>
          <br/>
          <span>TienePiojos = ${item.TienePiojos}</span>
        `
      )
      .join("");
    resultContainer.innerHTML = content;
  } else {
    resultContainer.innerHTML = "No hay datos disponibles";
  }
}

createButton.addEventListener("click", async () => {
  creatingContainer.innerHTML = "Cargando...";
  try {
    await window.fun.createData();
  } catch (error) {
    creatingContainer.innerHTML = "¡Error al crear los datos!";
  }
});
/*
console.log(window.data.usersCualquiera, "holaaaaaaaaaaaaaaaaaa");

window.api.obtenerUsuarios().then((usuarios) => {
  console.log("Usuarios:", usuarios);
});
*/