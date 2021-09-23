class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :appointment_time
  has_one :user
  has_one :provider
  has_one :category
end
