require "test_helper"

class Api::V1::InsightsControllerTest < ActionDispatch::IntegrationTest
  test "GET insights returns employee and salary metrics" do
    employee = employees(:one)
    employee.salaries.delete_all

    employee.salaries.create!(
      amount: 50000,
      currency: "INR",
      effective_from: Date.new(2026, 1, 1)
    )

    get "/api/v1/insights"

    assert_response :success

    body = JSON.parse(response.body)

    assert body.key?("employee_count_by_country")
    assert body.key?("employee_count_by_department")
    assert body.key?("average_salary_by_country")
    assert body.key?("average_salary_by_department")
  end
end
