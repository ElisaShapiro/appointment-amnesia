class ProviderSerializer < ActiveModel::Serializer
  attributes :id, :provider_name, :phone_number, :address
end
