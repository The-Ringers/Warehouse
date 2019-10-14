INSERT INTO companies
(name, address, city, state, zip, owner_id)
VALUES
($1, $2, $3, $4, $5, $6)
RETURNING company_id, name, address, city, state, zip