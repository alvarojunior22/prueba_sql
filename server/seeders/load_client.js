import fs from 'fs';
import path from 'path';
import csv from "csv-parser";
import { pool } from "../conection.js";

export async function load_Custumers() {
  const rutaArchivo = path.resolve('server/data/custumer.csv');
  const clientes = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(rutaArchivo)
      .pipe(csv())
      .on("data", (row) => {
        clientes.push([
          row.number_identification,
          row.full_name.trim(),
          row.address,
          row.phone,
          row.email,
        ]);
      })
      .on('end', async () => {
        try {
          const sql = `INSERT INTO custumers
            (number_identification,full_name,address,phone,email) VALUES ?`;
          const [result] = await pool.query(sql, [clientes]);

          console.log(`✅ Se insertaron ${result.affectedRows} custumers.`);
          resolve();
        } catch (error) {
          console.error('❌ Error insert custumers:', error.message);
          reject(error);
        }
      })
      .on('error', (err) => {
        console.error('❌ Error to read the file csv:', err.message);
        reject(err);
      });
  });
}
