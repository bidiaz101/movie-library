class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :dark_mode

  has_many :user_movies
end
