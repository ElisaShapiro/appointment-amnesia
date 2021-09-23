class EventSerializer < ActiveModel::Serializer
  attributes :id, :event_time, :severity
  has_one :user
  has_one :category
end
