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
User.create(email: "elisa@123.com", password: "123", name: "Elisa", age: "31", summary: "Appendectomy August 2007. Migraines first onset 2015. Family history of Parkinson's, arrhythmia, colon cancer.", avatar: "https://i.imgur.com/3y8bjZJ.png")
User.create(email: "evelyn@123.com", password: "123", name: "Evelyn", summary: "Parkinson's diagnosed age 64.", avatar: "https://i.imgur.com/SrS4zAy.png")
User.create(email: "moose@123.com", password: "123", name: "Moose", age: "18", summary: "History of crystals in urine. Currently receiving subcutaneous fluids for stage 2 kidney disease 3x/week.", avatar: "https://i.imgur.com/usmTWoa.jpg")

puts "Seeding Categories"
Category.create(category_name: "Visit Summary")
Category.create(category_name: "Primary")
Category.create(category_name: "Neurology")
Category.create(category_name: "Labwork")
Category.create(category_name: "Vet")
Category.create(category_name: "Ophthalmology")

puts "Seeding Providers"
Provider.create(provider_name: "Dr. Jacobson", phone_number: "123-456-7890", address: "123 Fake Street, New York, NY 10065")
Provider.create(provider_name: "Dr. Zoidberg", phone_number: "212-121-2121", address: "212 Doctor Avenue, New York, NY 10013")
Provider.create(provider_name: "Dr. Zaius", phone_number: "646-989-0000", address: "42 Wallaby Way, Bronx, NY 10467")
Provider.create(provider_name: "Dr. Potato", phone_number: "098-765-4321", address: "34-33 33rd Street, Astoria, NY 11106")
Provider.create(provider_name: "Dr. Ibol", phone_number: "212-393-2255", address: "4 Pennsylvania Plaza, New York, NY 10001")

puts "Seeding Appointments" 
Appointment.create(appointment_time: Time.now - 120.days, user_id: 1, provider_id: 5, category_id: 6)
Appointment.create(appointment_time: Time.now - 50.days, user_id: 1, provider_id: 2, category_id: 2)
Appointment.create(appointment_time: Time.now - 10.days, user_id: 1, provider_id: 1, category_id: 3)
Appointment.create(appointment_time: Time.now + 10.days, user_id: 1, provider_id: 2, category_id: 2)
Appointment.create(appointment_time: Time.now - 4.days, user_id: 2, provider_id: 3, category_id: 4)
Appointment.create(appointment_time: Time.now + 4.days, user_id: 2, provider_id: 3, category_id: 3)
Appointment.create(appointment_time: Time.now + 1.days, user_id: 3, provider_id: 4, category_id: 5)
Appointment.create(appointment_time: Time.now - 60.days, user_id: 3, provider_id: 4, category_id: 5)

puts "Seeding Events"
Event.create(content: "Woke up with really bad Migraine zomig didn't work", event_time: 3.days.ago, severity: 5, user_id: 1, category_id: 3)
Event.create(content: "Mild headache resolved with aleve/caffeine", event_time: 4.days.ago, severity: 2, user_id: 1, category_id: 3)
Event.create(content: "Labwork stable: A1C 5.4, vitamin D much better 40 ng/mL", event_time: 12.days.ago, severity: 2, user_id: 1, category_id: 4)
Event.create(content: "Migraine towards end of day after long travel day but felt better after zomig", event_time: 36.days.ago, severity: 4, user_id: 1, category_id: 3)
Event.create(content: "Good visit with Dr. Zoidberg recommended continue with current medication and continue to log migraines", event_time: 50.days.ago, severity: 1, user_id: 1, category_id: 1)
Event.create(content: "Medium sized headache felt a bit better after caffeine and aleve, likely dehydration related very hot out today", event_time: 80.days.ago, severity: 3, user_id: 1, category_id: 3)
Event.create(content: "Small headache at end of day - just started new coding program not used to long days studying at computer like this.", event_time: 96.days.ago, severity: 2, user_id: 1, category_id: 3)
Event.create(content: "New Prescription: -2.50 Sphere in both eyes (I didn't like the astigmatism correction). Intraocular pressure right eye 18 mmHg and left eye 19 mmHg. Pigment stable.", event_time: 120.days.ago, severity: 2, user_id: 1, category_id: 6)

Event.create(content: "Eating better with medicine, close to 2.2 ounces a day for past three days once started med.", event_time: 55.days.ago, severity: 2, user_id: 3, category_id: 5)
Event.create(content: "Low appetite for two days, spoke to vet on phone said try anti nausea med and weigh food to see how much she is eating.", event_time: 59.days.ago, severity: 4, user_id: 3, category_id: 5)
Event.create(content: "Creatine 1.6 borderline now but no evidence crystals.", event_time: 59.days.ago, severity: 3, user_id: 3, category_id: 4)
Event.create(content: "Kept her for 2 hours because couldn't get urine initially.", event_time: 60.days.ago, severity: 3, user_id: 3, category_id: 1)



puts "Seeding Medications"
Medication.create(medication_name: "0.9 % Saline SQ Fluids", dosage: "100 mL 3x/week", user_id: 3, provider_id: 4)

