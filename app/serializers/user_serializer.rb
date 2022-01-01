class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :dark_mode

  has_many :user_movies
  has_many :movies, through: :user_movies
end
