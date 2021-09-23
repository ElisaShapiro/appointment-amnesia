class CreateMedications < ActiveRecord::Migration[6.1]
  def change
    create_table :medications do |t|
      t.string :medication_name
      t.string :dosage
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :provider, null: false, foreign_key: true

      t.timestamps
    end
  end
end
