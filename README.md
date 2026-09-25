# ACME Salary Management

A web-based employee and salary management application built for HR teams to manage employee information, salaries, salary history, and compensation insights.

## Overview

ACME Salary Management replaces spreadsheet-based employee salary management with a simple web application.

The application supports:

* Employee management
* Employee search and filtering
* Pagination for large employee datasets
* Employee details and organization information
* Current salary and salary history
* Compensation insights
* Employee create, update, and delete operations
* REST APIs for employee and salary data

The application is seeded with **10,000 employees** to demonstrate performance with a realistic dataset.

## Requirements

The application was designed for an HR Manager who needs to:

* Quickly find employees
* Filter employees by country and department
* View employee and salary information
* Review salary history
* Add, update, and remove employee records
* View compensation insights across countries and departments

## Architecture

```text
React Frontend
      |
      | REST / JSON
      v
Ruby on Rails API
      |
      v
PostgreSQL
```

The application uses a modular monolith approach.

### Main Domains

* Employee Management
* Salary Management
* Salary History
* Search and Filtering
* Pagination
* Compensation Insights

Detailed architecture information is available in:

* `docs/architecture.md`
* `docs/tradeoffs.md`
* `docs/performance.md`
* `docs/requirements.md`
* `docs/ai-usage.md`

## Tech Stack

### Backend

* Ruby 3.1.2
* Ruby on Rails
* PostgreSQL
* REST APIs
* ActiveRecord
* Rails testing framework

### Frontend

* React
* Vite
* JavaScript
* CSS

### Development

* Git
* RSpec/Rails testing tools where applicable
* REST/JSON communication between frontend and backend

## Features

### Employee Management

HR can:

* View employees
* Search by employee number, name, or email
* Filter by country
* Filter by department
* Add employees
* Edit employees
* Delete employees
* View employee details

### Salary Management

Employee details include:

* Current salary
* Currency
* Salary effective date
* Salary history

Salary records are stored separately from employees so historical salary information is preserved.

### Compensation Insights

The application provides:

* Employee count by country
* Employee count by department
* Average salary by country
* Average salary by department

Salary averages remain grouped by currency to avoid incorrectly comparing monetary values from different currencies.

## Database

The main relational entities are:

```text
Country
   |
   +---- Employee ---- Department
             |
             +---- Salary
```

### Employee

Important fields include:

* Employee number
* First name
* Last name
* Email
* Country
* Department
* Job title
* Employment status

Employee number and email are unique.

### Salary

Important fields include:

* Employee
* Amount
* Currency
* Effective from
* Effective to

Salary history is preserved using effective dates.

## Local Setup

### Prerequisites

Install:

* Ruby 3.1.2
* Bundler
* PostgreSQL
* Node.js
* npm

### Clone the Repository

```bash
git clone <repository-url>
cd acme-salary-management
```

### Backend Setup

```bash
cd backend
bundle install
```

Configure the PostgreSQL database as required by the local environment.

Create and migrate the database:

```bash
bundle exec rails db:create
bundle exec rails db:migrate
```

Seed the application:

```bash
bundle exec rails db:seed
```

The seed process creates approximately **10,000 employee records** along with related countries, departments, and salary data.

### Start the Backend

```bash
cd backend
bundle exec rails server
```

The Rails API runs on:

```text
http://localhost:3000
```

### Frontend Setup

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will provide the frontend URL shown in the terminal.

## API Endpoints

### Employees

```text
GET    /api/v1/employees
GET    /api/v1/employees/:id
POST   /api/v1/employees
PATCH  /api/v1/employees/:id
DELETE /api/v1/employees/:id
```

### Employee Search and Filtering

```text
GET /api/v1/employees?search=...
GET /api/v1/employees?country=...
GET /api/v1/employees?department=...
GET /api/v1/employees?page=1&per_page=20
```

Filters can also be combined.

### Salaries

```text
GET  /api/v1/employees/:employee_id/salaries
POST /api/v1/employees/:employee_id/salaries
```

### Compensation Insights

```text
GET /api/v1/insights
```

## Pagination

Employee results are paginated on the backend.

The API returns metadata including:

```json
{
  "page": 1,
  "per_page": 20,
  "total_count": 10000,
  "total_pages": 500
}
```

The backend limits the maximum `per_page` value to prevent unnecessarily large responses.

## Performance Considerations

The application was designed with the 10,000-employee dataset in mind.

Key decisions include:

* Database-level search and filtering
* Backend pagination
* Limited API response sizes
* ActiveRecord eager loading for related employee data
* Database aggregation for compensation insights
* Stable ordering for paginated employee results
* No loading of all employees into the browser

More details are available in `docs/performance.md`.

## Testing

Run the backend test suite:

```bash
cd backend
bundle exec rails test
```

The test suite covers important API and application behavior.

The current test suite passes with:

```text
14 runs, 41 assertions, 0 failures, 0 errors, 0 skips
```

## Frontend Production Build

Build the React application with:

```bash
cd frontend
npm run build
```

The production build is generated by Vite.

## Design Decisions and Trade-offs

The application intentionally uses a simple architecture:

* Rails provides the REST API and business/data layer.
* React provides the HR-facing user interface.
* PostgreSQL provides relational data storage.
* The application is kept as a modular monolith rather than introducing unnecessary microservices.

The UI focuses on the assessment requirements rather than adding unnecessary dashboard functionality.

Further decisions are documented in:

```text
docs/tradeoffs.md
```

## AI Usage

AI assistance was used during development for:

* Exploring implementation approaches
* Reviewing code structure
* Identifying potential issues
* Improving documentation
* Supporting debugging and development decisions

Human review was used to validate the generated suggestions and make the final implementation decisions.

Detailed information is available in:

```text
docs/ai-usage.md
```

## Project Structure

```text
acme-salary-management/
├── backend/
│   ├── app/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── ...
│   ├── config/
│   ├── db/
│   └── test/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── ...
│   └── package.json
│
├── docs/
│   ├── architecture.md
│   ├── ai-usage.md
│   ├── performance.md
│   ├── requirements.md
│   └── tradeoffs.md
│
└── README.md
```

## Deployment

The application is intended to be deployed with:

* Rails API
* PostgreSQL database
* React/Vite frontend

Deployment configuration and environment-specific values should be supplied through environment variables rather than committed to the repository.

## Demo

The application demo covers:

1. Employee list
2. Search
3. Country and department filtering
4. Pagination
5. Employee details
6. Current salary and salary history
7. Add employee
8. Edit employee
9. Delete employee
10. Compensation insights
11. Architecture overview
12. Automated tests

## Assessment Focus

The implementation focuses on demonstrating:

* Clean REST API design
* Relational database modeling
* React frontend development
* Backend pagination and filtering
* Handling of a 10,000-record dataset
* Salary history modeling
* CRUD functionality
* Automated testing
* Maintainable application structure
* Documented engineering decisions
