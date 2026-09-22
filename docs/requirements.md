# ACME Salary Management — Requirements

## 1. Goal

Build a maintainable web application that enables an HR Manager to manage
employee salary information for an organization with 10,000 employees and
understand how the organization pays its employees.

## 2. Persona

Primary user: HR Manager

## 3. Problem

ACME HR currently manages salary information for approximately 10,000
employees across multiple countries using Excel spreadsheets. This makes
employee salary information difficult to search, maintain, analyze, and
understand.

The application will provide a centralized web-based system for managing
employees, salaries, and salary insights.

## 4. In Scope

- Employee management
- Salary management and salary history
- Country management
- Department management
- Employee search
- Filtering by country and department
- Employee pagination
- Salary insights and dashboard
- Seed data for 10,000 employees

## 5. Core User Stories

- As an HR Manager, I can view employees using a paginated employee list.
- As an HR Manager, I can search employees by name, email, or employee number.
- As an HR Manager, I can filter employees by country and department.
- As an HR Manager, I can view an employee's current salary.
- As an HR Manager, I can view an employee's salary history.
- As an HR Manager, I can add a salary record with an effective date.
- As an HR Manager, I can view salary insights by country and department.
- As an HR Manager, I can understand salary distribution without maintaining
  Excel spreadsheets.

## 6. Out of Scope

The following are deliberately excluded from this version:

- Payroll processing
- Tax calculation
- Employee benefits
- Salary hike/approval workflows
- Loans and settlements
- Insurance management
- Attendance and leave management
- Employee self-service
- Currency conversion
- Cross-currency salary aggregation
- Complex role-based access control

These features are excluded to keep the initial product focused on salary
management and HR salary insights.

## 7. Functional Requirements

### Employees

An employee contains:

- Employee number
- First name
- Last name
- Email
- Country
- Department
- Job title
- Employment status

Employee email and employee number must be unique.

An employee belongs to one country and one department in the initial version.

Employee listing must use server-side pagination.

Search and filtering must be performed by the backend/database rather than
loading all employees into the browser.

### Salaries

An employee can have multiple salary records representing salary history.

Each salary record contains:

- Amount
- Currency
- Effective from
- Effective to

Salary amounts cannot be negative.

The current salary is determined from the applicable effective period.

### Countries

Countries contain:

- Name
- Country code

An employee belongs to one country.

### Departments

Departments contain:

- Name

An employee belongs to one department.

### Dashboard

The dashboard should provide:

- Employee count by country
- Employee count by department
- Average salary by country
- Average salary by department
- Salary distribution

Salary aggregation across different currencies will not be performed unless
a currency conversion strategy is introduced.

## 8. Non-Functional Requirements

- The application should remain maintainable as employee data grows beyond
  10,000 records.
- Employee queries should use database filtering, pagination, and appropriate
  indexes.
- The application should avoid N+1 database queries.
- The API should return clear validation and error responses.
- The application should be testable with automated unit and request tests.
- The architecture should support growth to at least 20,000 employees without
  requiring a major architectural change.

## 9. Assumptions

- The primary user is an HR Manager.
- An employee belongs to one country.
- An employee belongs to one department initially.
- An employee can have multiple salary records.
- Salary history is represented using effective dates.
- Salary currency is stored with each salary record.
- Cross-currency calculations are intentionally excluded.
- The initial application does not implement complex authentication or
  authorization.

## 10. Success Criteria

The solution is successful when an HR Manager can:

1. Manage employee information.
2. Search and filter a dataset of 10,000 employees.
3. View current salary and salary history.
4. Add salary records.
5. Understand salary distribution across countries and departments.
6. Use the application without relying on Excel for these workflows.
