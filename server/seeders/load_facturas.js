import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { pool } from "../conection.js";

export async function load_Bills() {
  const rutaArchivo = path.resolve("server/data/bill.csv");
  const bill = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(rutaArchivo)
      .pipe(csv())
      .on("data", (row) => {
        bill.push([
          row.number_bill || null,
          row.Period_billing || null,
          parseFloat(row.amount_billing) || null,
          parseFloat(row.amount_paid) || 0,
          row.name_platform || null,
        ]);
      })
      .on("end", async () => {
        try {
          const sql = `INSERT INTO bills (number_bill, Period_billing, amount_billing, amount_paid, name_platform) VALUES ?`;
          const [result] = await pool.query(sql, [bill]);

          console.log(`✅ correct insert ${result.affectedRows} bills.`);
          resolve();
        } catch (error) {
          console.error("❌ Error insert bills:", error.message);
          reject(error);
        }
      })
      .on("error", (err) => {
        console.error(
          "❌ Error to read files csv:",
          err.message
        );
        reject(err);
      });
  });
}
