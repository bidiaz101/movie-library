class Movie < ApplicationRecord
    has_many :user_movies
    has_many :reviews
end
