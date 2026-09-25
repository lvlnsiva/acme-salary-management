require "test_helper"

class EmployeeTest < ActiveSupport::TestCase
  test "requires employee number" do
    employee = Employee.new
    assert_not employee.valid?
    assert_includes employee.errors[:employee_number], "can't be blank"
  end

  test "requires email" do
    employee = Employee.new
    assert_not employee.valid?
    assert_includes employee.errors[:email], "can't be blank"
  end
end
