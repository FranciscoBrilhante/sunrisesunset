class CreateRecords < ActiveRecord::Migration[8.0]
  def change
    create_table :records do |t|
      t.float :lat
      t.float :lng
      t.date :date
      t.string :data

      t.timestamps
    end
  end
end
