import { useEffect, useState } from 'react'
import './App.css'

const API_URL = '/api/v1'

const countries = [
  { id: '1', name: 'India' },
  { id: '2', name: 'United States' },
  { id: '3', name: 'United Kingdom' },
  { id: '4', name: 'Australia' },
  { id: '5', name: 'Canada' },
]

const departments = [
  { id: '1', name: 'Engineering' },
  { id: '2', name: 'Human Resources' },
  { id: '3', name: 'Finance' },
  { id: '4', name: 'Sales' },
  { id: '5', name: 'Marketing' },
  { id: '6', name: 'Operations' },
  { id: '7', name: 'Customer Support' },
]

function App() {
  const [employees, setEmployees] = useState([])
  const [meta, setMeta] = useState({
    page: 1,
    per_page: 20,
    total_count: 0,
    total_pages: 0,
  })

  const [insights, setInsights] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('')
  const [department, setDepartment] = useState('')
  const [page, setPage] = useState(1)

  const [loading, setLoading] = useState(false)
  const [insightsLoading, setInsightsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadEmployees() {
      setLoading(true)
      setError('')

      const params = new URLSearchParams({
        page,
        per_page: 20,
      })

      if (search.trim()) {
        params.set('search', search.trim())
      }

      if (country) {
        params.set('country', country)
      }

      if (department) {
        params.set('department', department)
      }

      try {
        const response = await fetch(
          `${API_URL}/employees?${params.toString()}`,
          {
            signal: controller.signal,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to load employees')
        }

        const result = await response.json()

        setEmployees(result.data || [])
        setMeta(
          result.meta || {
            page: 1,
            per_page: 20,
            total_count: 0,
            total_pages: 0,
          }
        )
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    loadEmployees()

    return () => controller.abort()
  }, [page, search, country, department])

  useEffect(() => {
    async function loadInsights() {
      setInsightsLoading(true)

      try {
        const response = await fetch(`${API_URL}/insights`)

        if (!response.ok) {
          throw new Error('Failed to load insights')
        }

        const result = await response.json()
        setInsights(result)
      } catch {
        setInsights(null)
      } finally {
        setInsightsLoading(false)
      }
    }

    loadInsights()
  }, [])

  function handleSearchChange(event) {
    setSearch(event.target.value)
    setPage(1)
  }

  function handleCountryChange(event) {
    setCountry(event.target.value)
    setPage(1)
  }

  function handleDepartmentChange(event) {
    setDepartment(event.target.value)
    setPage(1)
  }

  function clearFilters() {
    setSearch('')
    setCountry('')
    setDepartment('')
    setPage(1)
  }

  function formatCurrency(value, currency = 'USD') {
    const amount = Number(value || 0)

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  function getEmployeeName(employee) {
    return (
      employee.name ||
      [employee.first_name, employee.last_name].filter(Boolean).join(' ') ||
      '—'
    )
  }

  function getEmployeeSalary(employee) {
    if (
      employee.current_salary &&
      typeof employee.current_salary === 'object'
    ) {
      return formatCurrency(
        employee.current_salary.amount,
        employee.current_salary.currency || 'USD'
      )
    }

    return '—'
  }
  function getCountryName(employee) {
    if (employee.country?.name) {
      return employee.country.name
    }

    if (typeof employee.country === 'string') {
      return employee.country
    }

    const countryId = String(employee.country_id || '')

    return (
      countries.find((country) => country.id === countryId)?.name ||
      '—'
    )
  }

  function getDepartmentName(employee) {
    if (employee.department?.name) {
      return employee.department.name
    }

    if (typeof employee.department === 'string') {
      return employee.department
    }

    const departmentId = String(employee.department_id || '')

    return (
      departments.find(
        (department) => department.id === departmentId
      )?.name || '—'
    )
  }

  function getInsightName(key) {
    try {
      const parsed = JSON.parse(key)

      if (Array.isArray(parsed)) {
        return {
          name: parsed[0],
          currency: parsed[1] || 'USD',
        }
      }
    } catch {
      // Keep the original key.
    }

    return {
      name: key,
      currency: 'USD',
    }
  }

  function renderAverageSalaryRows(data) {
    return Object.entries(data || {}).map(([key, average]) => {
      const { name, currency } = getInsightName(key)

      return (
        <div className="insight-row" key={key}>
          <span>{name}</span>
          <strong>{formatCurrency(average, currency)}</strong>
        </div>
      )
    })
  }

  function renderCountRows(data) {
    return Object.entries(data || {}).map(([name, count]) => (
      <div className="insight-row" key={name}>
        <span>{name}</span>
        <strong>{Number(count).toLocaleString()}</strong>
      </div>
    ))
  }

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <div className="brand-mark">A</div>

          <div>
            <h1>ACME</h1>
            <p>Salary Management</p>
          </div>
        </div>

        <div className="header-user">
          <div className="avatar">HR</div>

          <div>
            <strong>HR Manager</strong>
            <span>Administrator</span>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="welcome">
          <div>
            <p className="eyebrow">EMPLOYEE MANAGEMENT</p>

            <h2>Employee Overview</h2>

            <p className="subtitle">
              Manage employee information and compensation from one place.
            </p>
          </div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span className="stat-label">Total Employees</span>

            <strong>
              {Number(meta.total_count || 0).toLocaleString()}
            </strong>

            <span className="stat-detail">
              Employees in the organization
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Current Page</span>

            <strong>{meta.page || 1}</strong>

            <span className="stat-detail">
              of {meta.total_pages || 1} pages
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Employees Shown</span>

            <strong>{employees.length}</strong>

            <span className="stat-detail">
              Results on this page
            </span>
          </div>
        </section>

        <section className="employee-section">
          <div className="section-header">
            <h2>Employees</h2>

            <p>
              Search and filter employees to view their compensation details.
            </p>
          </div>

          <div className="filters">
            <div className="search-wrapper">
              <input
                type="search"
                className="search-input"
                placeholder="Search by name, employee number or email..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>

            <select
              className="filter-select"
              value={country}
              onChange={handleCountryChange}
            >
              <option value="">All Countries</option>

              {countries.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              className="filter-select"
              value={department}
              onChange={handleDepartmentChange}
            >
              <option value="">All Departments</option>

              {departments.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="clear-button"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="table-wrapper">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Employee #</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Department</th>
                  <th>Job Title</th>
                  <th>Salary</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="loading-row">
                      Loading employees...
                    </td>
                  </tr>
                ) : employees.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-row">
                      No employees found.
                    </td>
                  </tr>
                ) : (
                  employees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="employee-row"
                      onClick={() => setSelectedEmployee(employee)}
                    >
                      <td className="employee-number">
                        {employee.employee_number || '—'}
                      </td>

                      <td className="employee-name">
                        {getEmployeeName(employee)}
                      </td>

                      <td>{getCountryName(employee)}</td>

                      <td>{getDepartmentName(employee)}</td>

                      <td>{employee.job_title || '—'}</td>

                      <td className="salary">
                        {getEmployeeSalary(employee)}
                      </td>

                      <td>
                        <span className="status">
                          {employee.employment_status || 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <span className="pagination-info">
              Showing {employees.length} of{' '}
              {Number(meta.total_count || 0).toLocaleString()} employees
            </span>

            <div className="pagination-controls">
              <button
                type="button"
                className="pagination-button"
                disabled={page <= 1}
                onClick={() => setPage((current) => current - 1)}
              >
                Previous
              </button>

              <span className="pagination-current">
                Page {meta.page || page} of {meta.total_pages || 1}
              </span>

              <button
                type="button"
                className="pagination-button"
                disabled={
                  !meta.total_pages || page >= meta.total_pages
                }
                onClick={() => setPage((current) => current + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <section className="insights-section">
          <div className="section-heading">
            <h2>Compensation Insights</h2>
          </div>

          {insightsLoading ? (
            <div className="insights-card">
              <p className="insights-empty">
                Loading compensation insights...
              </p>
            </div>
          ) : insights ? (
            <div className="insights-card">
              <details className="insight-accordion">
                <summary>Average Salary by Country</summary>

                <div className="insight-list">
                  {renderAverageSalaryRows(
                    insights.average_salary_by_country
                  )}
                </div>
              </details>

              <details className="insight-accordion">
                <summary>Average Salary by Department</summary>

                <div className="insight-list">
                  {renderAverageSalaryRows(
                    insights.average_salary_by_department
                  )}
                </div>
              </details>

              <details className="insight-accordion">
                <summary>Employee Count by Country</summary>

                <div className="insight-list">
                  {renderCountRows(
                    insights.employee_count_by_country
                  )}
                </div>
              </details>

              <details className="insight-accordion">
                <summary>Employee Count by Department</summary>

                <div className="insight-list">
                  {renderCountRows(
                    insights.employee_count_by_department
                  )}
                </div>
              </details>
            </div>
          ) : (
            <div className="insights-card">
              <p className="insights-empty">
                Compensation insights are currently unavailable.
              </p>
            </div>
          )}
        </section>
      </main>

      {selectedEmployee && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedEmployee(null)}
        >
          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>{getEmployeeName(selectedEmployee)}</h2>

                <p>
                  {selectedEmployee.employee_number ||
                    'Employee details'}
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setSelectedEmployee(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="employee-details">
                <div className="detail-item">
                  <span className="detail-label">
                    Employee Number
                  </span>

                  <span className="detail-value">
                    {selectedEmployee.employee_number || '—'}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Email</span>

                  <span className="detail-value">
                    {selectedEmployee.email || '—'}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Country</span>

                  <span className="detail-value">
                    {getCountryName(selectedEmployee)}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Department</span>

                  <span className="detail-value">
                    {getDepartmentName(selectedEmployee)}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Job Title</span>

                  <span className="detail-value">
                    {selectedEmployee.job_title || '—'}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Status</span>

                  <span className="detail-value">
                    {selectedEmployee.employment_status ||
                      'Active'}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Current Salary</span>

                  <span className="detail-value">
                    {getEmployeeSalary(selectedEmployee)}
                  </span>
                </div>
              </div>

              {Array.isArray(selectedEmployee.salary_history) &&
                selectedEmployee.salary_history.length > 0 && (
                  <div className="salary-history">
                    <h3>Salary History</h3>

                    <div className="salary-history-list">
                      {selectedEmployee.salary_history.map(
                        (salary, index) => (
                          <div
                            className="salary-history-row"
                            key={salary.id || index}
                          >
                            <span className="salary-history-date">
                              {salary.effective_from || '—'}
                            </span>

                            <span className="salary-history-amount">
                              {formatCurrency(
                                salary.amount,
                                salary.currency || 'USD'
                              )}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App