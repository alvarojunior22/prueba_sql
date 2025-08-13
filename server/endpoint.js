import express from "express"
import { pool } from "./conection.js";


const app = express()

app.use(express.json())

app.get("/cliente", async (req, res) => {
  try {
    const query = `
        SELECT * from custumers;
        `;


    const [filas] = await pool.query(query);
    return res.json(filas);
  } catch (error) {
    res.status(500).json({
      status: "error",
      enpoint: req.originalUrl,
      method: req.method,
      message: error.message,
    });
  }
});



app.post("/cliente/:id", async (req, res) => {
  try {
    const { number_identification, full_name, address, phone, email } =
      req.body;

    const {id} = req.params
    const query = `
        INSERT INTO custumers(number_identification,full_name,address,phone,email)
        VALUES (?, ?, ?, ?, ?)`;

    const [result] = await pool.query(query, [
      number_identification,
      full_name,
      address,
      phone,
      email,
      id
    ]);

    res.status(201).json({
      mensaje: "cliente creado exitosamente",
      id_prestamo: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message,
    });
  }
});



app.delete("/cliente/:number_identification", async (req, res) => {
  const { number_identification } = req.params;
  

  try {
    const [client] = await pool.query(
      "DELETE FROM custumers WHERE number_identification = ?;",
      [ number_identification]
    );

    if (client.affectedRows > 0) {
      res.status(202).json({ message: "client delete" });
    } else {
      res.status(404).json({ message: "client not found" });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      error: error.message,
    });
  }
});




app.put("/cliente/:number_identification", async (req, res) => {
  const { number_identification } = req.params;
  const { new_number_identification, full_name, address, phone, email } = req.body;

  try {
    const [client] = await pool.query(
      "UPDATE custumers SET number_identification = ? ,full_name = ?, address = ?, phone = ?, email = ? WHERE number_identification = ?;",
      [new_number_identification,full_name, address, phone, email, number_identification]
    );

    if (client.affectedRows > 0) {
      res.status(202).json({ message: "client updated" });
    } else {
      res.status(404).json({ message: "client not found" });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      error: error.message,
    });
  }
});






app.listen(3000, () => {
  console.log("corriendo desde http://localhost:3000");
});
