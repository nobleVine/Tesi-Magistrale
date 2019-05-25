DROP TABLE IF EXISTS json2;

DROP TABLE IF EXISTS json1;

CREATE TABLE IF NOT EXISTS json1(
    greeting CHAR(80),
    query CHAR(10) PRIMARY KEY,
    count CHAR(1),
    start CHAR(1),
    number VARCHAR(6),
    id VARCHAR(20),
    data VARCHAR(500),
    name VARCHAR(300),
    comment TEXT,
    reference TEXT,
    link TEXT,
    FULLTEXT(name, comment, reference)
);

CREATE TABLE IF NOT EXISTS json2(
    query CHAR(10) PRIMARY KEY,
    formula TEXT,
    example VARCHAR(5000),
    maple VARCHAR(1500),
    mathematica VARCHAR(1500),
    program TEXT,
    xref VARCHAR(1000),
    keyword VARCHAR(100),
    offset VARCHAR(10),
    author VARCHAR(50),
    nReferences VARCHAR(20),
    revision VARCHAR(20),
    tTime VARCHAR(50),
    created VARCHAR(50),
    FOREIGN KEY(query) REFERENCES json1(query)
)