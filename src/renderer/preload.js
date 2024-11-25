import { contextBridge, ipcRenderer } from "electron";

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

contextBridge.exposeInMainWorld("electron", {
  getUsers: () => ipcRenderer.invoke("getUsers"), // Exponer la función de obtener usuarios
  onDatabaseUsers: (callback) => ipcRenderer.on("database-users", callback), // Exponer el evento
});