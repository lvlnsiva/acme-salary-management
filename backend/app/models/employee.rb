class Employee < ApplicationRecord
  belongs_to :country
  belongs_to :department
  has_many :salaries, dependent: :destroy
  has_one :current_salary,
        -> { where(effective_to: nil).order(effective_from: :desc) },
        class_name: "Salary"

  validates :employee_number, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
end
