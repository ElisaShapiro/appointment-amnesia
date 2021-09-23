class Appointment < ApplicationRecord
  belongs_to :user
  belongs_to :provider
  belongs_to :category
end
