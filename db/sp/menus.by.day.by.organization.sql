DROP FUNCTION get_customers_by_catering_company(INT);


CREATE OR REPLACE FUNCTION get_menus_by_catering_company_by_day(day_id INT, catering_companie INT)
RETURNS TABLE(
    id_menu INT,
    menu_name VARCHAR,
    menu_description VARCHAR,
    menu_price INT,
    menu_observation VARCHAR,
    id_catering_company INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        m.id_menu,
        m.menu_name,
        m.menu_description,
        m.menu_price,
        m.menu_observation,
        m.id_catering_company
    FROM
        menus m
    INNER JOIN
        menus_days md ON m.id_menu = md.id_menu
    WHERE
        md.id_day = day_id
        AND m.id_catering_company = catering_companie;
END;
$$ LANGUAGE plpgsql;


SELECT * FROM get_menus_by_catering_company_by_day(1, 2);
