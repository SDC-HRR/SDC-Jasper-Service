# Steamy Main Media Module


### Prerequisites
database technology of your choice, I used PostgreSQL.


### Installing

npm run seed (generates 10M primary records of data into a CSV file)

run COPY statement or equivilent to import CSV file into database of your choice

npm run build (creates bundle and watches for changes)

npm start (starts server and watches for changes)


## Built With

React - The web framework used
NPM - Dependency Management
Express - Server Technology used

## Contributor

Brian Hampton (initial contributor): https://github.com/BHamp

Jasper Chauvin (continuing contributor): https://github.com/JasperC1999

See also contributors who participated in this project: https://github.com/orgs/SDC-HRR/people


# CRUD Support from API
 Method | API Endpoint | Description |
--------|--------------|-------------|
**GET** | /media | Gets record from database |
**POST** | /media | Creates one new record in database |
**PUT** | /media | Updates record in database |
**DELETE** | /media | Deletes record from database |
