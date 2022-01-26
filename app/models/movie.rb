class Movie < ApplicationRecord
    has_many :user_movies
    has_many :reviews

    validates :omdb_id, uniqueness: true
    accepts_nested_attributes_for :reviews
end
