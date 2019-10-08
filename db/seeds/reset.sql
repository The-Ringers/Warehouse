CREATE TABLE companies (
  company_id SERIAL PRIMARY KEY,
  name VARCHAR(40),
  address VARCHAR(120),
  city VARCHAR(40),
  state VARCHAR(2),
  zip VARCHAR(20),
  owner_id INTEGER NOT NULL
);

CREATE TABLE warehouses (
    warehouse_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    branch_name VARCHAR(100),
    address VARCHAR(120),
    city VARCHAR(40),
    state VARCHAR(2),
    zip VARCHAR(20)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(320) NOT NULL,
    password TEXT NOT NULL,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    role roles NOT NULL
);

ALTER TABLE companies
ADD COLUMN owner_id INTEGER NOT NULL REFERENCES users(user_id);

ALTER TABLE warehouses
ADD COLUMN company_id INTEGER NOT NULL REFERENCES companies(company_id);

CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    company_name VARCHAR(40),
    address VARCHAR(120),
    city VARCHAR(40),
    state VARCHAR(2),
    zip VARCHAR(20),
    email VARCHAR(320) NOT NULL,
    phone VARCHAR(15)
);

CREATE TABLE inventory (
    inventory_id SERIAL PRIMARY KEY,
    warehouse_id INTEGER NOT NULL REFERENCES warehouses(warehouse_id),
    price DECIMAL CONSTRAINT positive_price CHECK (price > 0),
    quantity INTEGER NOT NULL CONSTRAINT positive_price CHECK (amount > 0),
    sku VARCHAR(12),
    description VARCHAR(140) NOT NULL,
    category VARCHAR(20) NOT NULL
);

CREATE TABLE sales (
    sales_id SERIAL PRIMARY KEY,
    warehouse_id INTEGER NOT NULL REFERENCES warehouses(warehouse_id),
    company_id INTEGER NOT NULL REFERENCES companies(company_id),
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    customer_id INTEGER NOT NULL REFERENCES customers(customer_id),
    category sales_category NOT NULL,
    payment payment_type, 
    subtotal DECIMAL NOT NULL CONSTRAINT positive_price CHECK (amount > 0),
    tax DECIMAL NOT NULL CONSTRAINT positive_price CHECK (amount > 0),
    total DECIMAL NOT NULL CONSTRAINT positive_price CHECK (amount > 0),
    pdf BYTEA
);

CREATE TABLE sale_details (
    sale_details_id SERIAL PRIMARY KEY,
    sales_id INTEGER NOT NULL REFERENCES sales(sales_id),
    inventory_id INTEGER NOT NULL REFERENCES inventory(inventory_id),
    amount INTEGER NOT NULL CONSTRAINT positive_price CHECK (amount > 0)
);