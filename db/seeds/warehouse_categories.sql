CREATE TABLE warehouse_categories (
    warehouse_id INTEGER REFERENCES warehouses(warehouse_id),
    category VARCHAR(60)
);