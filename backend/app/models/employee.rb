class Employee < ApplicationRecord
  validates :employee_number, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
end
