class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :dark_mode, :profile_picture_thumbnail_url, :profile_picture_url, :cloudinary_public_id

  has_many :user_movies
end
