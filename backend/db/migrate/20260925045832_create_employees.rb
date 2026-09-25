class CreateEmployees < ActiveRecord::Migration[7.2]
  def change
    create_table :employees do |t|
      t.string :employee_number
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :job_title
      t.string :employment_status

      t.timestamps
    end
  end
end
