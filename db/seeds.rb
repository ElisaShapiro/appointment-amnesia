# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Destroying old data"
User.destroy_all
Category.destroy_all
Provider.destroy_all
Event.destroy_all
Appointment.destroy_all
Medication.destroy_all

puts "Seeding Users"
User.create(email: "email1@1.com", password: "1", name: "SeedOne", age: "31", summary: "The first test account for appointment amnesia", avatar: "https://i.imgur.com/usmTWoa.jpg")
User.create(email: "email2@2.com", password: "2", name: "SeedTwo", age: "18", summary: "The second test account for appointment amnesia", avatar: "https://i.imgur.com/usmTWoa.jpg")

puts "Seeding Categories"
Category.create(category_name: "Visit Summary")
Category.create(category_name: "Test Category")

puts "Seeding Providers"
Provider.create(provider_name: "First Provider", phone_number: "123-456-7890", address: "123 Fake Street, New York, NY")
Provider.create(provider_name: "Second Provider", phone_number: "098-765-4321", address: "321 Fake Street, Edgartown, MA")

puts "Seeding Appointments" 
Appointment.create(appointment_time: 2.days.ago, user_id: 1, provider_id: 1, category_id: 1)
Appointment.create(appointment_time: 4.days.ago, user_id: 1, provider_id: 2, category_id: 2)

puts "Seeding Events"
Event.create(content: "This is the content text for event 1", event_time: 3.days.ago, severity: 5, user_id: 1, category_id: 1)
Event.create(content: "This is the content text for event 2", event_time: 5.days.ago, severity: 1, user_id: 1, category_id: 2)

puts "Seeding Medications"
Medication.create(medication_name: "Med1", dosage: "1 pill", user_id: 1, provider_id: 1)
Medication.create(medication_name: "Med2", dosage: "2 pills", user_id: 1, provider_id: 2)

