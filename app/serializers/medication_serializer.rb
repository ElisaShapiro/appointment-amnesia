class MedicationSerializer < ActiveModel::Serializer
  attributes :id, :medication_name, :dosage
  has_one :user
  has_one :provider
end
