class User < ApplicationRecord
    has_secure_password
    #validations
    validates :name, presence: true, uniqueness: :true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
    #associations
    has_many :events, dependent: :destroy 
    has_many :categories, through: :events
    has_many :appointments, dependent: :destroy 
    has_many :providers, through: :appointments
    has_many :medications, dependent: :destroy 
    
    #custom methods
    def user_categories
        category_array = []
        self.appointments.each{|appointment| category_array.push(appointment.category)}
        self.events.each{|event| category_array.push(event.category)}
        return category_array.uniq
    end
    def user_providers
        provider_array =[]
        self.appointments.each{|appointment| provider_array.push(appointment.provider)}
        self.medications.each{|medication| provider_array.push(medication.provider)}
        return provider_array.uniq
    end
end
