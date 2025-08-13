import { load_Custumers } from "./load_client.js";
import { load_Bills } from "./load_facturas.js";
import {load_transactions} from "./load_transacciones.js"

const seederToRun = process.argv[2];

(async () => {
  try {
    console.log("🚀 Iniciando seeders...");

    switch (seederToRun) {
      case "todo":
        await load_Custumers();
        await load_Bills();
        await load_transactions();
        console.log("todos los seeders  se han ejecutado correctamente")
        break
      case "custumer":
        await load_Custumers();
        console.log("los seeders de custumers se han ejecutado correctamente")
        break
      case "bill":
        await load_Bills();
        console.log("los seeders de bills se han ejecutado correctamente")
        break
      case "transaction":
        await load_transactions();
        console.log("los seeders de transaction se han ejecutado correctamente")
        break
      default:
        console.log("argumento no valido, por favor especifica el seeders")
    }

    console.log("✅ Todos los seeders ejecutados correctamente.");
  } catch (error) {
    console.error("❌ Error ejecutando los seeders:", error.message);
  } finally {
    process.exit();
  }
})();
