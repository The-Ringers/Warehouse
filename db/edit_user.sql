UPDATE users
SET first_name = $1, last_name = $2, role = $3, email = $4
WHERE user_id = $5