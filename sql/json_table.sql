CREATE TABLE IF NOT EXISTS json(
    query CHAR(10) PRIMARY KEY,
    id VARCHAR(20),
    data VARCHAR(500),
    name VARCHAR(300),
    comment VARCHAR(30000),
    reference VARCHAR(8000),
    formula VARCHAR(20000),
    example VARCHAR(5000),
    xref VARCHAR(1000)
) 