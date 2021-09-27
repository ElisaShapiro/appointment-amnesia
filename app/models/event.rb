class Event < ApplicationRecord
  belongs_to :user
  belongs_to :category

  validates :severity, inclusion: { in: 1..5 }
  # validates :content, :length => { :maximum => 1000, :message => "Maximum character limit reached" }
end
