/*First query: select with join between the two tables, using the fulltext index.
The MATCH clause is using to search Fibonacci in name, comment, reference columns.*/

SELECT json1.query, data, name, comment, reference, link, formula, example, xref 
FROM json1, json2
WHERE json1.query = json2.query 
AND MATCH (name, comment, reference) AGAINST ('Fibonacci');

/*Second query: same of the first query, but the first field of the select shows
the relevance of every selected records. The relevance is a floating point number 
and indicates a similarity measure between the search string and the text in the selected records */

SELECT MATCH (name, comment, reference) AGAINST ('Fibonacci') as relevance, 
json1.query, data, name, comment, reference, link, formula, example, xref 
FROM json1, json2
WHERE json1.query = json2.query;

/*Third query: the selected records are in descending orders (is the default order) of relevance.*/

SELECT MATCH (name, comment, reference) AGAINST ('Fibonacci') as relevance, 
json1.query, data, name, comment, reference, link, formula, example, xref 
FROM json1, json2
WHERE json1.query = json2.query
AND MATCH (name, comment, reference) AGAINST ('Fibonacci'); 

/*Fourth query: is a boolean fulltext search, a search that permits, with the use of some operators, 
to include and to exclude a word in the search or to assign more o less relevance to a word etc... 
For example this query selects the records that have both the words Fibonacci and Catalan*/

SELECT MATCH (name, comment, reference) AGAINST ('+Fibonacci +Catalan' IN BOOLEAN MODE) as relevance, 
json1.query, data, name, comment, reference, link, formula, example, xref 
FROM json1, json2
WHERE json1.query = json2.query 
AND MATCH (name, comment, reference) AGAINST ('+Fibonacci +Catalan' IN BOOLEAN MODE);
