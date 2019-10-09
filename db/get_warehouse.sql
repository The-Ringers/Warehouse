SELECT * FROM warehouses
WHERE warehouse_id IN (
    SELECT warehouse_id FROM warehouse_registry
    WHERE user_id = $1
);