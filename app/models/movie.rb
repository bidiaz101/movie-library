class Movie < ApplicationRecord
    has_many :user_movies
    has_many :reviews

    def find_vote_count
        self.user_movies.where("vote != ?", nil).length
    end

    def find_vote_average
        sum = 0

        self.user_movies.where("vote != ?", nil) do |user_movie|
            sum += user_movie.vote
        end
        
        if self.find_vote_count != 0 
            return sum / self.find_vote_count
        end

        nil
    end
end
