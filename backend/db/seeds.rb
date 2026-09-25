# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# Seed reference data

countries = [
  { name: "India", code: "IN" },
  { name: "United States", code: "US" },
  { name: "United Kingdom", code: "GB" },
  { name: "Australia", code: "AU" },
  { name: "Canada", code: "CA" }
]

countries.each do |country|
  Country.find_or_create_by!(code: country[:code]) do |record|
    record.name = country[:name]
  end
end

departments = [
  "Engineering",
  "Human Resources",
  "Finance",
  "Sales",
  "Marketing",
  "Operations",
  "Customer Support"
]

departments.each do |name|
  Department.find_or_create_by!(name: name)
end

# Seed employees

Faker::Config.random = Random.new(1234)

country_ids = Country.pluck(:id)
department_ids = Department.pluck(:id)

employees = 10_000.times.map do |index|
  {
    employee_number: format("EMP%05d", index + 1),
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: "employee#{index + 1}@example.com",
    job_title: Faker::Job.title,
    employment_status: "active",
    country_id: country_ids.sample,
    department_id: department_ids.sample,
    created_at: Time.current,
    updated_at: Time.current
  }
end

Employee.upsert_all(employees, unique_by: :employee_number)


# Seed salaries

country_currencies = {
  Country.find_by!(code: "IN").id => "INR",
  Country.find_by!(code: "US").id => "USD",
  Country.find_by!(code: "GB").id => "GBP",
  Country.find_by!(code: "AU").id => "AUD",
  Country.find_by!(code: "CA").id => "CAD"
}

salary_records = []

Employee.select(:id, :country_id).find_each do |employee|
  salary_records << {
    employee_id: employee.id,
    amount: rand(40_000..150_000),
    currency: country_currencies.fetch(employee.country_id),
    effective_from: Date.new(2026, 1, 1),
    effective_to: nil,
    created_at: Time.current,
    updated_at: Time.current
  }
end

Salary.upsert_all(
  salary_records,
  unique_by: [:employee_id, :effective_from]
)

# Seed historical salaries

historical_salary_records = []

Employee.where("id % 2 = 0").select(:id, :country_id).find_each do |employee|
  historical_salary_records << {
    employee_id: employee.id,
    amount: rand(30_000..120_000),
    currency: country_currencies.fetch(employee.country_id),
    effective_from: Date.new(2025, 1, 1),
    effective_to: Date.new(2025, 12, 31),
    created_at: Time.current,
    updated_at: Time.current
  }
end

Salary.upsert_all(
  historical_salary_records,
  unique_by: [:employee_id, :effective_from]
)
