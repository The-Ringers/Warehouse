INSERT INTO users
(email, password, first_name, last_name, role)
VALUES
($1, $2, $3, $4, $5)
RETURNING email, password, first_name, last_name, role;