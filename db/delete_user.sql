UPDATE users
SET active = false
WHERE user_id = $1;