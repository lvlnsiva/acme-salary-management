require "test_helper"

class Api::V1::EmployeesControllerTest < ActionDispatch::IntegrationTest
  test "GET employees returns paginated employees" do
    get "/api/v1/employees", params: { page: 1, per_page: 1 }

    assert_response :success

    body = JSON.parse(response.body)

    assert_equal 1, body["data"].size
    assert_equal 1, body["meta"]["page"]
    assert_equal 1, body["meta"]["per_page"]
  end

  test "GET employees supports search" do
    get "/api/v1/employees", params: { search: "John" }

    assert_response :success

    body = JSON.parse(response.body)

    assert_equal 1, body["data"].size
    assert_equal "john.doe@example.com", body["data"].first["email"]
  end

  test "GET employees supports country filter" do
    get "/api/v1/employees", params: { country: countries(:one).id }

    assert_response :success

    body = JSON.parse(response.body)

    assert_equal 2, body["data"].size
  end

  test "GET employees supports department filter" do
    get "/api/v1/employees", params: { department: departments(:two).id }

    assert_response :success

    body = JSON.parse(response.body)

    assert_equal 1, body["data"].size
  end

  test "GET employee returns employee" do
    employee = employees(:one)

    get "/api/v1/employees/#{employee.id}"

    assert_response :success

    body = JSON.parse(response.body)

    assert_equal employee.email, body["email"]
  end

  test "POST employee creates employee" do
    assert_difference("Employee.count", 1) do
      post "/api/v1/employees", params: {
        employee: {
          employee_number: "EMP003",
          first_name: "Robert",
          last_name: "Brown",
          email: "robert.brown@example.com",
          job_title: "Developer",
          employment_status: "active",
          country_id: countries(:one).id,
          department_id: departments(:one).id
        }
      }
    end

    assert_response :created
  end

  test "PATCH employee updates employee" do
    employee = employees(:one)

    patch "/api/v1/employees/#{employee.id}", params: {
      employee: { job_title: "Senior Engineer" }
    }

    assert_response :success
    assert_equal "Senior Engineer", JSON.parse(response.body)["job_title"]
  end

  test "DELETE employee deletes employee" do
    employee = employees(:one)

    assert_difference("Employee.count", -1) do
      delete "/api/v1/employees/#{employee.id}"
    end

    assert_response :no_content
  end
end
