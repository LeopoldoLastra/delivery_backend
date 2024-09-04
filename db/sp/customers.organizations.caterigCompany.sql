DROP FUNCTION get_customers_by_catering_company(INT);


CREATE OR REPLACE FUNCTION get_customers_by_catering_company(catering_company_id INT)

RETURNS TABLE(
    id_customer INT,
    customer_name VARCHAR,
    customer_last_name VARCHAR,
    id_organization INT,
    organization_name VARCHAR
) AS $$

BEGIN
    RETURN QUERY
    SELECT
        c.id_customer,
        c.customer_name,
        c.customer_last_name,
        o.id_organization,
        o.organization_name
    FROM
        customers c
    INNER JOIN
        organizations o ON c.id_organization = o.id_organization
    INNER JOIN
        organizations_caterings oc ON o.id_organization = oc.id_organization
    WHERE
        oc.id_catering_company = catering_company_id;
END;
$$ LANGUAGE plpgsql;
