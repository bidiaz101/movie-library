class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :original_title, :genre, :overview, :poster_url, :release_date, :runtime, :tagline, :vote_average, :vote_count, :omdb_id
end
