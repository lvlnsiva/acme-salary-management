require "test_helper"

class Api::V1::SalariesControllerTest < ActionDispatch::IntegrationTest
  test "GET salaries returns employee salary history" do
    employee = employees(:one)
    employee.salaries.delete_all

    employee.salaries.create!(
      amount: 50000,
      currency: "INR",
      effective_from: Date.new(2026, 1, 1)
    )

    get "/api/v1/employees/#{employee.id}/salaries"

    assert_response :success

    body = JSON.parse(response.body)

    assert_equal 1, body.size
    assert_equal "INR", body.first["currency"]
  end

  test "POST salary creates salary record" do
    employee = employees(:one)

    assert_difference("Salary.count", 1) do
      post "/api/v1/employees/#{employee.id}/salaries", params: {
        salary: {
          amount: 60000,
          currency: "INR",
          effective_from: "2026-01-01"
        }
      }
    end

    assert_response :created
  end

  test "POST salary rejects negative amount" do
    employee = employees(:one)

    assert_no_difference("Salary.count") do
      post "/api/v1/employees/#{employee.id}/salaries", params: {
        salary: {
          amount: -100,
          currency: "INR",
          effective_from: "2026-01-01"
        }
      }
    end

    assert_response :unprocessable_entity
  end
end
