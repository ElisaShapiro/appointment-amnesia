# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_09_23_015348) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "appointments", force: :cascade do |t|
    t.datetime "appointment_time"
    t.bigint "user_id", null: false
    t.bigint "provider_id", null: false
    t.bigint "category_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["category_id"], name: "index_appointments_on_category_id"
    t.index ["provider_id"], name: "index_appointments_on_provider_id"
    t.index ["user_id"], name: "index_appointments_on_user_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "category_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "events", force: :cascade do |t|
    t.datetime "event_time"
    t.integer "severity"
    t.bigint "user_id", null: false
    t.bigint "category_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["category_id"], name: "index_events_on_category_id"
    t.index ["user_id"], name: "index_events_on_user_id"
  end

  create_table "medications", force: :cascade do |t|
    t.string "medication_name"
    t.string "dosage"
    t.bigint "user_id", null: false
    t.bigint "provider_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["provider_id"], name: "index_medications_on_provider_id"
    t.index ["user_id"], name: "index_medications_on_user_id"
  end

  create_table "providers", force: :cascade do |t|
    t.string "provider_name"
    t.string "phone_number"
    t.string "address"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "name"
    t.integer "age"
    t.text "summary"
    t.string "avatar"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "appointments", "categories"
  add_foreign_key "appointments", "providers"
  add_foreign_key "appointments", "users"
  add_foreign_key "events", "categories"
  add_foreign_key "events", "users"
  add_foreign_key "medications", "providers"
  add_foreign_key "medications", "users"
end
