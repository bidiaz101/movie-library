class MovieSerializer < ActiveModel::Serializer
  attributes :id, :vote_average, :vote_count, :omdb_id

  has_many :reviews
end
