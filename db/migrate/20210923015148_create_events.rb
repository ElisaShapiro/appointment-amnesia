class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.datetime :event_time
      t.integer :severity
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
