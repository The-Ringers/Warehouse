CREATE TABLE inventory (
    inventory_id SERIAL PRIMARY KEY,
    warehouse_id INTEGER NOT NULL REFERENCES warehouses(warehouse_id),
    price DECIMAL CONSTRAINT positive_price CHECK (price > 0),
    quantity INTEGER NOT NULL,
    sku VARCHAR(12),
    description VARCHAR(140) NOT NULL,
    category VARCHAR(20) NOT NULL
);