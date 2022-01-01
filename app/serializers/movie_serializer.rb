class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :original_title, :vote_average, :vote_count, :omdb_id

  has_many :reviews, serializer: ReviewSerializer
end
