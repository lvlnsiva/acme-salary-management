class Employee < ApplicationRecord
  belongs_to :country, optional: true
  belongs_to :department, optional: true

  validates :employee_number, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
end
