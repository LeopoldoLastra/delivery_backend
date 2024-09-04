

DROP TABLE IF EXISTS customers_by_organization;
DROP TABLE IF EXISTS order_by_customers_by_organization;
DROP TABLE IF EXISTS menus_in_orders_by_organization;


CREATE OR REPLACE FUNCTION get_orders_by_organization_and_month(organizationId INTEGER, monthName TEXT)
RETURNS TABLE (
    date DATE,
    id_menu INT,
    total_menus INT
) AS $$
BEGIN
    RETURN QUERY
    WITH customers_by_organization AS (
        SELECT id_customer
        FROM customers
        WHERE id_organization = organizationId
    ),
    order_by_customers_by_organization AS (
        SELECT o.id_order, o.id_customer, o.month::TEXT AS month, o.year
        FROM orders o
        INNER JOIN customers_by_organization c
            ON o.id_customer = c.id_customer
        WHERE o.month::TEXT = monthName
    ),
    menus_in_orders_by_organization AS (
        SELECT oco.id_order, oco.month, oco.year, mo.id_menu, mo.date
        FROM order_by_customers_by_organization oco
        LEFT JOIN menus_orders mo ON oco.id_order = mo.id_order
    )
    SELECT moo.date, moo.id_menu, COUNT(*)::INTEGER AS total_menus
    FROM menus_in_orders_by_organization moo
    GROUP BY moo.date, moo.id_menu;
END;
$$ LANGUAGE plpgsql;






CREATE OR REPLACE FUNCTION get_menus_to_prepare(organizationId INTEGER, startDate DATE, endDate DATE)
RETURNS TABLE (
    date DATE,
    id_menu INT,
    total_menus INT
) AS $$
BEGIN
    RETURN QUERY
    WITH customers_by_organization AS (
        SELECT id_customer
        FROM customers
        WHERE id_organization = organizationId
    ),
    order_by_customers_by_organization AS (
        SELECT o.id_order, o.id_customer, o.month::TEXT AS month, o.year
        FROM orders o
        INNER JOIN customers_by_organization c
            ON o.id_customer = c.id_customer
    ),
    menus_in_orders_by_organization AS (
        SELECT oco.id_order, oco.month, oco.year, mo.id_menu, mo.date
        FROM order_by_customers_by_organization oco
        LEFT JOIN menus_orders mo ON oco.id_order = mo.id_order
        WHERE mo.date BETWEEN startDate AND endDate
    ),
    menus_with_name_in_orders_by_organization AS (
        SELECT moo.date, moo.id_menu, COUNT(*)::INTEGER AS total_menus
        FROM menus_in_orders_by_organization moo
        GROUP BY moo.date, moo.id_menu
    ),
    menus_to_prepare AS (
        SELECT mwn.date, mwn.id_menu, mwn.total_menus,  m.menu_name::TEXT
        FROM menus_with_name_in_orders_by_organization mwn
        LEFT JOIN menus m ON mwn.id_menu = m.id_menu
    )
    SELECT mtp.date, mtp.id_menu, mtp.total_menus, mtp.menu_name
    FROM menus_to_prepare mtp;
END;
$$ LANGUAGE plpgsql;
