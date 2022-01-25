class MovieSerializer < ActiveModel::Serializer
  attributes :id, :omdb_id

  has_many :reviews
end
