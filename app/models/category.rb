class Category < ApplicationRecord
    has_many :events
    has_many :users, through: :events
    has_many :appointments
end
