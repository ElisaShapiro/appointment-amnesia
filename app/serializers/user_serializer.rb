class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :password_digest, :name, :age, :summary, :avatar, :user_categories, :user_providers
end
