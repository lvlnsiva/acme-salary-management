class Employee < ApplicationRecord
  belongs_to :country
  belongs_to :department
  has_many :salaries, dependent: :destroy

  validates :employee_number, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
end
