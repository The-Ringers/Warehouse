INSERT INTO users
(email, password, first_name, last_name, warehouse_id, role)
VALUES
($1, $2, $3, $4, $5, $6)
RETURNING email, password, first_name, last_name, warehouse_id, role;