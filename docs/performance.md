Performance Considerations
Goal
The application is designed to support an organization with approximately 10,000 employees without requiring a major architectural change as the dataset grows.
The current design focuses on efficient database access, server-side pagination, appropriate indexing, and bulk operations for seed data.
Server-Side Pagination
The employee API does not load all employees into memory for a list request.
The API supports:
	•	page
	•	per_page
	•	maximum per_page of 100
	•	total record count
	•	total page count
Example:
GET /api/v1/employees?page=1&per_page=20
The database performs the LIMIT and OFFSET operations, keeping API responses bounded as the employee count grows.
Server-Side Search and Filtering
Employee search and filtering are performed by the database rather than filtering the complete employee collection in application memory.
Supported filters include:
	•	Employee name
	•	Email
	•	Employee number
	•	Country
	•	Department
This keeps the amount of data transferred from the database and processed by the application bounded.
Database Indexes
Indexes are used for frequently accessed and uniqueness-sensitive fields.
Current indexes include:
Employees
	•	Unique index on employee_number
	•	Unique index on email
Salaries
	•	Index on employee_id
	•	Index on effective_from
	•	Unique composite index on employee_id and effective_from
The composite salary index also prevents duplicate salary records for the same employee and effective date.
Indexes are intended to support common lookup patterns while enforcing important data-integrity constraints.
Avoiding N+1 Queries
Employee relationships are represented using database associations.
Queries that require related data should use joins or eager loading where appropriate rather than repeatedly querying associated records.
For example, the insights API uses database joins:
Employee.joins(:country)
        .group("countries.name")
        .count
This allows aggregation to be performed by the database rather than loading all employees into Ruby.
Rails recommends batch processing such as find_each when iterating over large datasets to avoid loading the complete collection into memory at once.
Bulk Seed Operations
The seed dataset contains:
	•	10,000 employees
	•	15,000 salary records
The seed uses bulk database operations such as insert_all and upsert_all rather than performing 10,000 individual Active Record saves.
Employee and salary records are generated as bulk data and inserted directly into the database.
This reduces the number of database round trips during initial data generation.
Batch Processing
Salary seed processing uses find_each when iterating through employees.
This allows Rails to process employees in batches rather than loading the complete employee collection into memory. Rails documents find_each specifically for processing large datasets in memory-friendly batches.
Salary History
Salary history is stored as separate records rather than overwriting an employee's current salary.
This allows the system to retain historical salary information while keeping salary queries associated with the employee.
A unique constraint on:
employee_id + effective_from
prevents duplicate salary records for the same employee and effective date.
API Response Size
Employee list endpoints use pagination to keep response sizes bounded.
The API does not return the complete employee dataset in a single request.
This approach allows the application to continue supporting larger datasets without changing the API design.
Current Scale
The seed dataset has been tested with:
Employees:        10,000
Current salaries: 10,000
Historical salaries: 5,000
Total salaries:   15,000
The application is designed with the expectation that the employee dataset can grow beyond 10,000 records without requiring a major architectural change.
Future Optimization Options
If the dataset or traffic grows significantly beyond the assessment scope, potential future optimizations include:
	•	Additional composite indexes based on production query patterns
	•	Keyset pagination for very large datasets
	•	Database query analysis using EXPLAIN
	•	Read replicas for read-heavy workloads
	•	Caching for frequently requested dashboard metrics
	•	Background jobs for expensive reporting operations
	•	Dedicated search infrastructure if search requirements become substantially more complex
These optimizations are intentionally not introduced prematurely because the current assessment scope does not require them.

