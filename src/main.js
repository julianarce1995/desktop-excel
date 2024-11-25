import { app, BrowserWindow, ipcMain } from "electron";
import {
  connection,
  closeDB,
  insertUser,
  getInfo,
} from "./db/connection.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, "preload.mjs"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile("./src/renderer/index.html");

  ipcMain.handle("get-data", async () => {
    try {
      const info = await getInfo();
      return info;
    } catch (error) {
      console.error("Error al obtener info:", error);
      throw error;
    }
  });

  ipcMain.on("create-data", async () => {
    try {
      await insertUser();
    } catch (error) {
      console.error("Error al crear info:", error);
      throw error;
    }
  });
  /*
  async function usersF() {
    const users = await getUsers();
    console.log(users);
    
    mainWindow.webContents.send("usersCualquiera", users); 
  }

  mainWindow.webContents.on("did-finish-load", () => {
    usersF();
  });*/
};

app.whenReady().then(async () => {
  try {
    createWindow();
    await connection();
  } catch (error) {
    console.error("Error durante la inicialización:", error);
  }
});
 
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("before-quit", () => {
  closeDB();
});