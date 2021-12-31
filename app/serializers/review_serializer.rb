class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :movie_id, :user_id, :content, :score
end
