class AddPerformanceIndexes < ActiveRecord::Migration[7.2]
  def change
    add_index :employees, :employee_number, unique: true
    add_index :employees, :email, unique: true
    add_index :salaries, :effective_from
  end
end
