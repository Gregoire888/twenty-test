# Twenty Test

## Data Model

In order to store metadata and users' data, we will need the following tables/collection :

### Metadata

#### TableMetadata

- id
- name
- userId

=> Unicity on (userId, name)
=> Indexes to create for queries : 'name', 'userId'

#### ColumnMetadata

- id
- name
- tableId

=> Unicity on (tableId, name)

## APIs

We start with simple REST APIs using NestJS as it will do all the scaffolding for us.
For simplicity and development speed, we will use NestJS's default "3-tier" architecture. For an Open-Source project, it would also have the benefit of being able to quickly onboard any developper used to the NestJS framework.

## Stack & Dependencies

### DB

Given the need for flexibility, a NoSQL could be a wise choice here. However, the required flexibility can be achieved with an SQL database as well.
We will use PostgresSQL as it is the default Open Source SQL DB and happens to be `twenty`'s choice as well.

### ORM

To easily communicate w/ the DB, we will use an ORM. The default ORM used with NestJS is TypeORM which offers a lot of flexibility.

### Left To Do

- Complete Metadata module queries to "run migrations"
- test repositories w/ mocks
- test services w/ mocks
- test controllers w/ mocks
- add integration tests w/ in memory DB 