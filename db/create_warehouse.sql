INSERT INTO warehouses
(company_id, branch_name, address, city, state, zip)
VALUES
($1, $2, $3, $4, $5, $6)
RETURNING warehouse_id, branch_name, address, city, state, zip;