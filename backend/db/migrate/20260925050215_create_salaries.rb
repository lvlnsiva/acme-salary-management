class CreateSalaries < ActiveRecord::Migration[7.2]
  def change
    create_table :salaries do |t|
      t.references :employee, null: false, foreign_key: true
      t.decimal :amount
      t.string :currency
      t.date :effective_from
      t.date :effective_to

      t.timestamps
    end
  end
end
