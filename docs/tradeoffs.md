# ACME Salary Management — Architecture Trade-offs

## 1. Modular Monolith vs Microservices

### Decision

Use a modular monolith with Rails as the backend.

### Why

The assessment targets an organization with approximately 10,000 employees. A single deployable application is sufficient for this scale and keeps development, testing, deployment, and local setup simple.

The code is organized around clear responsibilities such as employee management, salary management, and insights so that the application can evolve without introducing distributed-system complexity.

### Trade-off

Microservices could provide independent scaling and deployment, but they would also introduce additional operational concerns such as service communication, distributed tracing, deployment coordination, and data ownership.

Microservices can be considered later if specific scaling or organizational requirements justify the additional complexity.

---

## 2. PostgreSQL vs NoSQL

### Decision

Use PostgreSQL as the primary database.

### Why

The domain has clear relational relationships:

- Employee belongs to Country
- Employee belongs to Department
- Employee has many Salary records
- Salary belongs to Employee

The application also requires filtering, grouping, aggregation, uniqueness constraints, and salary history queries.

A relational database provides these capabilities directly and allows important data-integrity rules to be enforced at the database level.

### Trade-off

A NoSQL database could provide a more flexible schema and different horizontal-scaling characteristics, but it would add complexity without providing a clear benefit for this domain.

---

## 3. React Frontend vs Server-Rendered UI

### Decision

Use React for the frontend and Rails as a JSON API.

### Why

The assessment explicitly supports ReactJS or NextJS. React also provides a natural structure for reusable employee-management components such as tables, filters, pagination, employee details, and dashboard widgets.

Keeping the frontend separate from the API also makes the backend independently consumable by other clients in the future.

### Trade-off

A server-rendered Rails application would require less frontend infrastructure and could be simpler for a small application.

The separate React frontend introduces additional build and deployment complexity, but it better matches the requested frontend technology and provides a clear client/API boundary.

---

## 4. Minitest vs RSpec

### Decision

Use Rails' default Minitest framework.

### Why

Minitest is included with Rails and provides the functionality required for model and API tests without introducing another testing dependency.

The assessment emphasizes meaningful, fast, deterministic, and understandable tests rather than a specific testing framework.

### Trade-off

RSpec provides a richer DSL and is widely used in Ruby projects. However, adding RSpec was not necessary for this assessment, so the default Rails testing stack keeps the project smaller.

---

## 5. Separate Salary History vs Current Salary on Employee

### Decision

Store salary records in a separate `salaries` table.

### Why

An employee can have multiple salary records over time. Keeping salary history as separate records prevents historical information from being overwritten.

Each salary record contains:

- amount
- currency
- effective_from
- effective_to

A unique database constraint on `employee_id` and `effective_from` prevents duplicate salary records for the same employee and effective date.

### Trade-off

A single current-salary column on employees would make simple reads easier, but it would lose historical information or require a second mechanism to reconstruct it.

---

## 6. Server-Side Pagination vs Loading All Employees

### Decision

Use server-side pagination.

### Why

The application is designed for approximately 10,000 employees. Returning the entire employee dataset to the browser would increase response size and client-side processing.

The API therefore accepts `page` and `per_page` parameters and performs pagination in the database.

### Trade-off

Pagination adds some API and frontend state management, but provides bounded response sizes and scales better as the dataset grows.

---

## 7. Currency Conversion

### Decision

Do not perform cross-currency salary conversion in the initial implementation.

### Why

Employees can belong to different countries and salary records contain their own currencies.

Calculating an organization-wide salary average across currencies would require an exchange-rate source, conversion-date rules, and decisions about how historical salaries should be converted.

These requirements are outside the initial salary-management scope.

The API therefore keeps salary aggregation separated by currency where applicable.

### Trade-off

The dashboard cannot provide a single comparable salary value across all countries.

This can be added later if the product defines exchange-rate and historical conversion requirements.

---

## 8. Complex Role-Based Access Control

### Decision

Do not implement complex RBAC in the initial version.

### Why

The primary persona for the assessment is an HR Manager, and the assessment does not require a detailed authorization model.

Implementing multiple roles and permission matrices would increase complexity without improving the core salary-management workflow being evaluated.

### Trade-off

The initial application assumes a trusted HR-management context. Production deployment would require authentication and authorization appropriate to the organization's security requirements.

---

## 9. Database Aggregation vs Application-Level Aggregation

### Decision

Perform salary and employee aggregations in database queries.

### Why

The database is better suited to operations such as grouping, counting, averaging, and joining related records.

This also avoids loading the complete dataset into Ruby just to calculate dashboard metrics.

### Trade-off

Database queries can become more complex as reporting requirements grow. Query performance should therefore be monitored and analyzed using the database's query-planning tools when the dataset or traffic increases.

---

## 10. Premature Optimization vs Measured Optimization

### Decision

Implement straightforward database indexes, pagination, and bulk seed operations initially, while deferring advanced optimizations.

### Why

The current requirement is approximately 10,000 employees. The application already uses server-side pagination, relational indexes, database aggregation, and bulk operations.

More advanced techniques such as keyset pagination, caching, read replicas, or dedicated search infrastructure should be introduced based on measured performance requirements rather than assumptions.

### Trade-off

The initial system may require additional optimization at substantially larger scale, but avoiding premature infrastructure complexity keeps the assessment implementation focused and maintainable.
