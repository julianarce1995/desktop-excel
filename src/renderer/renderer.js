import { ipcRenderer } from "electron";

async function fetchData() {
  const data = await ipcRenderer.invoke("get-data");
  console.log(data); // Datos que llegan del proceso principal
}

fetchData();
