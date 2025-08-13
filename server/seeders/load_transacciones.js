import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { pool } from "../conection.js";

export async function load_transactions() {
  const rutaArchivo = path.resolve("server/data/transactions.csv");
  const transacciones = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(rutaArchivo)
      .pipe(csv())
      .on("data", (row) => {
        transacciones.push([
          row.id_transaction,
          row.date_hour,
          parseFloat(row.amount) || 0,
          row.state,
          row.Type_transaction,
          row.number_identification,
          row.number_bill
          
        ]);
        
      })

      
      .on("end", async () => {
        try {
          const sql = `INSERT INTO transactions (id_transaction, date_hour, amount, state, Type_transaction, number_identification, number_bill) VALUES ?`;
          const [result] = await pool.query(sql, [transacciones]);

          console.log(`✅ correct insert ${result.affectedRows} transactions.`);
          resolve();
        } catch (error) {
          console.error("❌ Error insert transactions:", error.message);
          reject(error);
        }
      })
      .on("error", (err) => {
        console.error(
          "❌ Error to read csv transactions:",
          err.message
        );
        reject(err);
      });
  });
}
