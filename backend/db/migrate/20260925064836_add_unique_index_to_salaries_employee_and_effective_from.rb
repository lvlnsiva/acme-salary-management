class AddUniqueIndexToSalariesEmployeeAndEffectiveFrom < ActiveRecord::Migration[7.2]
  def change
    add_index :salaries, [:employee_id, :effective_from], unique: true
  end
end
