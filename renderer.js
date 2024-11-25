/*
import { ipcRenderer } from "electron";

const resultContainer = document.getElementById("result");
const creatingContainer = document.getElementById("creating");
const loadButton = document.getElementById("load-button");
const createButton = document.getElementById("create-button");

loadButton.addEventListener("click", async () => {
  resultContainer.innerHTML = "Cargando...";
  try {
    const data = await ipcRenderer.invoke("get-data");
    renderData(data);
  } catch (error) {
    resultContainer.innerHTML = "¡Error al cargar los datos!";
  }
});

function renderData(data) {
  if (data && data.length > 0) {
    const content = data
      .map((item) => `<span>${item.name} - ${item.email}</span>`)
      .join("");
    resultContainer.innerHTML = content;
  } else {
    resultContainer.innerHTML = "No hay datos disponibles";
  }
}

createButton.addEventListener("click", () => {
  creatingContainer.innerHTML = "Cargando...";
  try {
    ipcRenderer.send("create-data");
  } catch (error) {
    creatingContainer.innerHTML = "¡Error al crear los datos!";
  }
});
*/
/*
const indexBridge = {
  users: (callback) => ipcRenderer.on("users", (callback))
}

contextBridge.exposeInMainWorld("indexBridge", indexBridge);
*/
