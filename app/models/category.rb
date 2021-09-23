class Category < ApplicationRecord
    has_many :events, dependent: :destroy 
    has_many :users, through: :events
    has_many :appointments, dependent: :destroy 
end
