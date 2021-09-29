\echo 'Delete and recreate netflix db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE netflix;
CREATE DATABASE netflix;
\connect netflix;

\i netflix-schema.sql;

\echo 'Delete and recreate netflix_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE netflix_test;
CREATE DATABASE netflix_test;
\connect netflix_test;

\i netflix-schema.sql;
