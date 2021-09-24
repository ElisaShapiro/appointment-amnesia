class EventSerializer < ActiveModel::Serializer
  attributes :id, :severity, :content, :event_time
  has_one :user
  has_one :category
end
