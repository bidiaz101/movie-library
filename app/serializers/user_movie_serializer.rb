class UserMovieSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :movie_id, :vote

  belongs_to :movie
end
