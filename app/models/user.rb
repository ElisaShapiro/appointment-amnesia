class User < ApplicationRecord
    has_secure_password
    #validations
    validates :name, presence: true, uniqueness: :true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
    #associations
    has_many :events, dependent: :destroy 
    has_many :categories, through: :events
    has_many :appointments dependent: :destroy 
    has_many :providers, through: :appointments
    has_many :medications dependent: :destroy 
end
