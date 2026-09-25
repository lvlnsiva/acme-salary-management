# ACME Salary Management — Architecture

## 1. Architecture Overview

The application is a modular web application with a React frontend, Rails JSON API backend, and PostgreSQL relational database.

```text
┌──────────────────────────────┐
│          React UI            │
│                              │
│ Employee List                │
│ Employee Details             │
│ Salary History               │
│ Salary Insights              │
└──────────────┬───────────────┘
               │ HTTP / JSON
               │
┌──────────────▼───────────────┐
│       Rails API Backend      │
│                              │
│ Employee Management          │
│ Salary Management            │
│ Search / Filtering           │
│ Pagination                   │
│ Salary Insights              │
└──────────────┬───────────────┘
               │ ActiveRecord
               │
┌──────────────▼───────────────┐
│         PostgreSQL           │
│                              │
│ Employees                    │
│ Salaries                     │
│ Countries                    │
│ Departments                  │
└──────────────────────────────┘
2. Backend Architecture

Ruby on Rails will be used as a JSON API backend. Responsibilities include employee management, salary management, salary history, search, filtering, pagination, salary insights, validation, and business rules. APIs will be versioned under /api/v1.

A modular monolith architecture is used to keep development and deployment simple while maintaining clear separation between domains. Microservices are intentionally excluded because the initial requirement of 10,000 employees does not require their additional operational complexity.

3. Frontend Architecture

React will be used for the frontend. The UI will contain reusable components for employee listing, employee details, salary history, search, filters, pagination, and salary insights.

App
├── Employees
│   ├── EmployeeFilters
│   ├── EmployeeTable
│   └── Pagination
├── EmployeeDetails
│   ├── EmployeeInformation
│   └── SalaryHistory
└── Dashboard
    └── SalaryInsights
The frontend will consume the Rails API through HTTP/JSON and will avoid loading all 10,000 employees into the browser at once.

4. Data Architecture

PostgreSQL will be used as the relational database.

Country
  └── has_many Employees

Department
  └── has_many Employees

Employee
  ├── belongs_to Country
  ├── belongs_to Department
  └── has_many Salaries

Salary
  └── belongs_to Employee


Schema:
Employee fields:

employee_number
first_name
last_name
email
country_id
department_id
job_title
employment_status

Salary fields:

employee_id
amount
currency
effective_from
effective_to

Employee number and email will be unique. Salary is modeled separately so previous salary records are preserved as history. Salary amounts will use a fixed-precision decimal database type.

5. Search, Filtering and Pagination

Search and filtering will be performed by the backend/database. Supported filters include name, email, employee number, country, and department.

Employee results will use server-side pagination. The application will not load all employees into the browser. Database indexes are used for uniqueness constraints and commonly accessed relationships. Additional indexes can be introduced based on measured production query patterns.

6. Salary Insights

Salary insights will be calculated by the backend using database queries.

Initial insights include:

Employee count by country
Employee count by department
Average salary by country
Average salary by department
Salary distribution is intentionally deferred from the initial API implementation.


7. API Architecture

The API will use versioned, resource-oriented endpoints.

GET    /api/v1/employees
GET    /api/v1/employees/:id
POST   /api/v1/employees
PATCH  /api/v1/employees/:id
DELETE /api/v1/employees/:id

GET    /api/v1/employees/:employee_id/salaries
POST   /api/v1/employees/:employee_id/salaries

GET    /api/v1/insights


8. Data Integrity

Important business rules will be enforced through application validations and database constraints where appropriate.

Key rules include:

Employee number is required and unique.
Email is required and unique.
Employee must belong to a country.
Employee must belong to a department.
Salary amount cannot be negative.
Salary currency is required.
Salary effective date is required.

Note: Database constraints will protect critical invariants even when data is written outside the normal application flow.

9. Testing Architecture

Development will follow Test-Driven Development for core functionality.
RED
 ↓
Write failing test
 ↓
GREEN
 ↓
Implement minimum code
 ↓
REFACTOR
 ↓
COMMIT

Rails' default Minitest framework will be used.

Tests will cover model validations, associations, salary history, API behavior, search, filtering, pagination, salary insights, and seed-data correctness.

Tests should remain fast, deterministic, and understandable.

10. Seed Data Architecture

The application will provide seed data for 10,000 employees as required by the assessment.

The seed process will generate realistic employee, country, department, and salary data while respecting database constraints. Seed performance will be measured and documented separately.


11. Architectural Constraints

The initial implementation intentionally excludes:

Payroll processing
Tax calculation
Benefits management
Salary approval workflows
Attendance and leave management
Employee self-service
Currency conversion
Complex role-based access control
Microservices

These capabilities are outside the focused salary-management scope.

12. Architecture Evolution

The initial architecture uses a modular monolith because it provides simple development, simple deployment, low operational overhead, clear separation of responsibilities, and sufficient scalability for the initial requirement.

The architecture can evolve if future requirements demonstrate a need for additional services or infrastructure.


