# Data normalization and CRUD + query system development

Financial information management that organizes and structures information in a **SQL** database, facilitating its loading, storage, and subsequent management using a **CRUD** system.
The backend is built with **Node.js** and **Express**, the database is managed with **MySQL**.

---

## Technologies used

- Node.js
- Express.js
- csv-parser (To load data from files CSV)
- dotenv
- MySQL





1. Install dependencies:

```bash
cd backen
npm install
```



4. Initialize the backend:

```bash
npm run start
```

## Database documentation

### Database name

`alvaro_ariza_sierra`

---


### Tables

#### **clients**

|
CREATE TABLE custumers (
    number_identification  varchar(50) UNIQUE PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    address TEXT,
    phone VARCHAR(100),
    email VARCHAR(100) UNIQUE
);

**bills**

CREATE TABLE bills (
    number_bill VARCHAR(100) UNIQUE PRIMARY KEY,
    period_billing VARCHAR(100) NOT NULL,
    amount_billing DECIMAL(12,2) NOT NULL,
    amount_paid DECIMAL(12,2) NOT NULL DEFAULT 0,
    name_platform ENUM('nequi', 'daviplata')

);


**transaction**

CREATE TABLE transactions (
    id_transaction INT PRIMARY KEY,
    date_hour DATETIME NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    state ENUM('Pendiente','Completada','Fallida') ,
    type_transaction VARCHAR(50) NOT NULL,
	number_identification VARCHAR(50),
    number_bill VARCHAR(50),
    FOREIGN KEY (number_identification) REFERENCES custumers(number_identification),
    FOREIGN KEY (number_bill) REFERENCES bills(number_bill)
);





## API  Endpoins Documentation


**Get All Clients Data**

**URL:** GET [`/cliente`]
**Description:**
retruns a list of all clients and its personal information

**response 200 example:**

```json
{
    "number_identification": "112231541",
    "full_name": "Jennifer Phelps",
    "address": "392 Smith Corners Apt. 737\nEast Angeltown, MO 64086",
    "phone": "248.695.2117",
    "email": "echristian@hotmail.com"
  },
```

