class Salary < ApplicationRecord
  belongs_to :employee

  validates :amount, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :currency, presence: true
  validates :effective_from, presence: true
end
