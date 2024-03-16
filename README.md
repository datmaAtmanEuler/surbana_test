# surbana_test
<strong>Test application apply for Surbana Technologies Pte.Ltd. Company at Full stack developer</strong>

1. Prerequirements:
   - Install PostgreSQL: for testing purpose I installed and set superadmin (postges) password is 123
   - Install the "ltree" extension:
     <pre>
        create extension if not exists ltree;
     </pre>
   - create table locations with id (serial) as primary key, name (location name), address_path (store address), area (store location area in m2)
   <pre>
       create table locations (
       	id serial primary key,
       	name varchar(255),
       	address_path ltree,
       	area float
       );
   </pre>
   - Install these middlewares: express, body-parser, pg and morgan (for HTTP request logging)
      <pre>
         npm install express body-parser pg morgan
      </pre>
2. Running application:
   <pre>
      node server.js
   </pre>
