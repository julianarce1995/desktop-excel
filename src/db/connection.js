import sqlite3 from "sqlite3";
import path from "path";
let db;

export async function connection() {
  try {
    const dbPath = path.join(process.cwd(), "app.db");
  
    // Crear una nueva conexión a la base de datos
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error("Error al conectar a la base de datos", err.message);
      } else {
        console.log("Conectado a la base de datos existente.");
      }
    });
    return db
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error.message);
    throw error;
  }
}

export function closeDB() {
  db.close((err) => {
    if (err) {
      console.error("Error al cerrar la base de datos", err.message);
    } else {
      console.log("Conexión cerrada");
    }
  });
}

export function createTable() {
  const createTables = `
    CREATE TABLE IF NOT EXISTS Entidad (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Sede (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT NOT NULL,
      IdEntidad INTEGER NOT NULL,
      FOREIGN KEY (IdEntidad) REFERENCES Entidad(ID)
    );

    CREATE TABLE IF NOT EXISTS Grupo (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT NOT NULL,
      IdSede INTEGER NOT NULL,
      FOREIGN KEY (IdSede) REFERENCES Sede(ID)
    );

    CREATE TABLE IF NOT EXISTS Brigada (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT NOT NULL,
      Fecha TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Estudiante (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT NOT NULL,
      Edad INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Info (
      IdEstudiante INTEGER NOT NULL,
      IdGrupo INTEGER NOT NULL,
      IdBrigada INTEGER NOT NULL,
      Tarifa REAL NOT NULL,
      Despiojado TEXT CHECK(Despiojado IN ('Si', 'No')) NOT NULL,
      TienePiojos TEXT CHECK(TienePiojos IN ('Si', 'No')) NOT NULL,
      Razon TEXT CHECK(Razon IN ('Ausente', 'No Autorizado', 'Retirado')),
      PRIMARY KEY (IdEstudiante, IdGrupo, IdBrigada),
      FOREIGN KEY (IdEstudiante) REFERENCES Estudiante(ID),
      FOREIGN KEY (IdGrupo) REFERENCES Grupo(ID),
      FOREIGN KEY (IdBrigada) REFERENCES Brigada(ID)
    );
  `;

  db.exec(createTables, (err) => {
    if (err) {
      console.error("Error al crear las tablas:", err.message);
    } else {
      console.log("Tablas creadas correctamente.");
    }
  });
}

export async function getInfo() {
 return new Promise((resolve, reject) => {
   db.all("SELECT * FROM Info", (err, rows) => {
     if (err) {
       return reject(err.message);
     }
     resolve(rows);
   });
 });
}

export async function insertUser() {
  const queries = [
    `INSERT INTO Entidad (Name) VALUES ('Comfama');`,
    `INSERT INTO Sede (Name, IdEntidad) VALUES ('Medellín', (SELECT ID FROM Entidad WHERE Name = 'Comfama'));`,
    `INSERT INTO Grupo (Name, IdSede) VALUES ('Primaria B', (SELECT ID FROM Sede WHERE Name = 'Medellín'));`,
    `INSERT INTO Brigada (Name, Fecha) VALUES ('Brigada A', '2024-11-22');`,
    `INSERT INTO Estudiante (Name, Edad) VALUES ('Juan Pérez', 10);`,
    `INSERT INTO Info (IdEstudiante, IdGrupo, IdBrigada, Tarifa, Despiojado, TienePiojos, Razon) 
  VALUES (
    (SELECT ID FROM Estudiante WHERE Name = 'Juan Pérez'),
    (SELECT ID FROM Grupo WHERE Name = 'Primaria B'),
    (SELECT ID FROM Brigada WHERE Name = 'Brigada A'),
    'Baja', 'Si', 'No', 'Ausente'
  );`,
  ];

  queries.forEach((query) => {
    db.run(query, (err) => {
      if (err) {
        console.error("Error ejecutando la consulta:", err.message);
      } else {
        console.log("Consulta ejecutada correctamente");
      }
    });
  });
}
