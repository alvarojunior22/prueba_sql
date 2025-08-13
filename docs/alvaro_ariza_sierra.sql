create database alvaro_ariza_sierra;
use alvaro_ariza_sierra;

CREATE TABLE custumers (
    number_identification  varchar(50) UNIQUE PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    address TEXT,
    phone VARCHAR(100),
    email VARCHAR(100) UNIQUE
);




CREATE TABLE bills (
    number_bill VARCHAR(100) UNIQUE PRIMARY KEY,
    period_billing VARCHAR(100) NOT NULL,
    amount_billing DECIMAL(12,2) NOT NULL,
    amount_paid DECIMAL(12,2) NOT NULL DEFAULT 0,
    name_platform ENUM('nequi', 'daviplata')
    
);


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
