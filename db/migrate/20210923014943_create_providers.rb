class CreateProviders < ActiveRecord::Migration[6.1]
  def change
    create_table :providers do |t|
      t.string :provider_name
      t.string :phone_number
      t.string :address

      t.timestamps
    end
  end
end
