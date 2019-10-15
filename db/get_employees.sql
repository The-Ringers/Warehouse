SELECT u.first_name, u.last_name, u.role, u.email FROM users AS u
JOIN warehouse_registry AS wr
ON wr.user_id = u.user_id
WHERE wr.warehouse_id = $1 AND u.active = true;