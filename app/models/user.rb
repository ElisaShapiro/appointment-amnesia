class User < ApplicationRecord
    has_secure_password
    #validations
    validates :name, presence: true, uniqueness: :true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
end
