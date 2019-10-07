CREATE TABLE sales (
    sales_id SERIAL PRIMARY KEY,
    warehouse_id INTEGER NOT NULL REFERENCES warehouses(warehouse_id),
    company_id INTEGER NOT NULL REFERENCES companies(company_id),
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    customer_id INTEGER NOT NULL REFERENCES customers(customer_id),
    category sales_category NOT NULL,
    payment payment_type, 
    subtotal DECIMAL NOT NULL,
    tax DECIMAL NOT NULL,
    total DECIMAL NOT NULL,
    pdf BLOB
);