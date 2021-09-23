class Provider < ApplicationRecord
    has_many :appointments, dependent: :destroy 
    has_many :users, through: :appointments
    has_many :medications, dependent: :destroy 
end
