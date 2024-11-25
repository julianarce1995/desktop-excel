const { contextBridge, ipcRenderer } = require("electron");

let data = {
  getData: () => ipcRenderer.invoke("get-data"),
  createData: () => ipcRenderer.send("create-data"),
};

console.log(data);

contextBridge.exposeInMainWorld("fun", data);

/*
let data = {
  usersCualquiera: (callback) => ipcRenderer.on("usersCualquiera", (event, args) => { callback(args) }),
};

console.log(data, "hola");

contextBridge.exposeInMainWorld("data", data);
*/
