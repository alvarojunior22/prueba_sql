import { TabulatorFull as tabulator } from 'tabulator-tables'
import 'tabulator-tables/dist/css/tabulator_simple.min.css'

const URL = 'http://localhost:3000/cliente'

async function fetchClients() {
  try {
    console.log(`trying to connect with ${URL}/cliente`)

    const res = await fetch(URL)

    if (!res.ok) {
      throw new Error(`Api error: ${res.statusText} (${res.status})`)
    }

    const data = res.json()

    return data
  } catch (error) {
    console.error(error, 'error loading custumer data')
    return []
  }
}

function getClientColumnDefinitions() {
  return [
    { title: "ID Identificación", field: "number_identification", width: 150, headerFilter: "input" },
    { title: "Nombre Completo", field: "full_name", hozAlign: "left", headerFilter: "input" },
    { title: "Dirección", field: "address", hozAlign: "left" },
    { title: "Teléfono", field: "phone", hozAlign: "center" },
    { title: "Email", field: "email", hozAlign: "left", headerFilter: "input" },
    // Puedes agregar botones de acción (Ej: Editar, Eliminar) aquí
  ];
}

async function initTable() {
  try {
    const Data = await fetchClients()

    const Table = new tabulator('#clientes-table', {
      data: Data,
      columns: getClientColumnDefinitions(),
      layout: "fitColumns",
      pagination: true,
      paginationSize: 10,
      resizableColumnFit: true,
      tooltips: true,

      placeholder: "Cargando datos o no hay clientes registrados...",
      footerElement: "<span>Total de Clientes: " + Data.length + "</span>"
    })
    
    console.log("Tabulator is loading data")
  } catch (error) {
    console.error("error loading data", error)
  }
}

document.addEventListener('DOMContentLoaded',initTable)