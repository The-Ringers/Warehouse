CREATE TABLE warehouses (
    warehouse_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES companies(company_id),
    branch_name VARCHAR(100),
    address VARCHAR(120),
    city VARCHAR(40),
    state VARCHAR(2),
    zip VARCHAR(20)
);