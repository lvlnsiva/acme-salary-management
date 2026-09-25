# ACME Salary Management — AI Usage

## Purpose

This project was developed using AI assistance as part of the assessment's requirement to work effectively in an AI-driven development environment.

AI was used as an engineering assistant rather than as an unchecked code generator. Generated suggestions were reviewed, adapted to the project requirements, implemented incrementally, and validated through local tests and application execution.

## Areas Where AI Was Used

### Requirements and Product Framing

AI was used to help structure the initial requirements into:

- Goal
- Primary user persona
- Problem statement
- In-scope functionality
- Out-of-scope functionality
- User stories
- Non-functional requirements
- Assumptions
- Success criteria

The final requirements were reviewed against the assessment brief before implementation.

### Architecture

AI was used to evaluate architectural options including:

- Rails API with React frontend
- Modular monolith vs microservices
- PostgreSQL vs NoSQL
- Server-side pagination
- Separate salary history records
- Database-level aggregation

The final architecture decisions were documented in:

- `docs/architecture.md`
- `docs/tradeoffs.md`

### Implementation

AI was used to assist with implementation of:

- Rails models and associations
- Database migrations
- API routes
- Controllers
- Model validations
- API request tests
- Search and filtering
- Pagination
- Salary history
- Salary insights
- Seed-data generation
- Performance considerations

Implementation decisions were checked against the actual application structure rather than copied blindly.

### Testing

AI was used to suggest meaningful test scenarios for:

- Employee validation
- Employee CRUD operations
- Search
- Country filtering
- Department filtering
- Pagination
- Salary creation
- Salary validation
- Salary history
- Salary insights

Tests were executed locally with Rails' Minitest framework.

The test suite was used as the primary validation mechanism for backend behavior.

### Performance

AI was used to identify considerations relevant to the 10,000-employee requirement, including:

- Server-side pagination
- Database filtering
- Database indexes
- Avoiding unnecessary N+1 queries
- Database aggregation
- Bulk seed operations
- Batch processing

These decisions are documented in `docs/performance.md`.

## Representative AI Instructions

Examples of the types of instructions used during development include:

### Requirements

"Review the assessment requirements and help convert them into a focused requirements document. Separate core functionality from deliberate exclusions."

### Architecture

"Design a maintainable Rails API and React architecture for an employee salary management application supporting approximately 10,000 employees. Explain the important trade-offs."

### TDD

"Implement this feature incrementally using a test-first approach. Start with the test, then implement the minimum code required to make it pass."

### API Design

"Review the Rails API endpoint and identify meaningful request and response test cases for search, filtering, pagination, CRUD, and validation."

### Performance

"Review this implementation for performance concerns when the employee dataset contains approximately 10,000 records. Focus on database queries, pagination, indexes, and memory usage."

### Code Review

"Review the current implementation for correctness, maintainability, unnecessary complexity, and alignment with the stated requirements."

## Human Review and Validation

AI-generated suggestions were not accepted automatically.

For each implementation step:

1. The requirement was identified.
2. An implementation approach was discussed.
3. Code was implemented incrementally.
4. Tests were added or updated.
5. The application was executed locally.
6. Test results were reviewed.
7. The implementation was committed only after validation.

Where an AI suggestion did not match the actual project requirements, the implementation was adjusted or the suggestion was rejected.

## Development Principles

AI assistance was used to accelerate development while retaining human ownership of:

- Requirements
- Architecture decisions
- Scope decisions
- Trade-offs
- Code review
- Test validation
- Final implementation decisions

The goal was to use AI to improve development speed and reasoning quality without treating generated output as inherently correct.
