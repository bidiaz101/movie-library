class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :movie_id, :user_id, :content, :score

  has_many :comments
end
