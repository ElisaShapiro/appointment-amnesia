class Medication < ApplicationRecord
  belongs_to :user
  belongs_to :provider
end
