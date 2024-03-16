# surbana_test
<strong>Test application apply for Surbana Technologies Pte.Ltd. Company at Full stack developer</strong>

1. Prerequirements:
   - Install PostgreSQL: for testing purpose I installed and set superadmin (postges) password is 123
   - Install the "ltree" extension:
       create extension if not exists ltree;
   - create table locations with id (serial) as primary key, name (location name), address_path (store address), area (store location area in m2)
     create table locations (
    	id serial primary key,
    	name varchar(255),
    	address_path ltree,
    	area float
    );
   - Install these middlewares: express, body-parser, pg and morgan (for HTTP request logging)
     npm install express body-parser pg morgan
2. Running application:
   node server.js
