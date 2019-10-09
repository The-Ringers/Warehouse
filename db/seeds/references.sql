ALTER TABLE companies
ADD COLUMN owner_id INTEGER NOT NULL REFERENCES users(user_id);

ALTER TABLE warehouses
ADD COLUMN company_id INTEGER NOT NULL REFERENCES companies(company_id);