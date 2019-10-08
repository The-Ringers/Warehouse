CREATE TABLE warehouse_registry (
   registry_id SERIAL PRIMARY KEY,
   warehouse_id INTEGER NOT NULL REFERENCES warehouses(warehouse_id),
   user_id INTEGER NOT NULL REFERENCES users(user_id)
);
