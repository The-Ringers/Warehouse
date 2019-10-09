CREATE TABLE sale_details (
    sale_details_id SERIAL PRIMARY KEY,
    sales_id INTEGER NOT NULL REFERENCES sales(sales_id),
    inventory_id INTEGER NOT NULL REFERENCES inventory(inventory_id),
    amount INTEGER NOT NULL CONSTRAINT positive_amount CHECK (amount > 0)
);