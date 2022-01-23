class UserMovie < ApplicationRecord
    belongs_to :user
    belongs_to :movie

    validates :movie_id, uniqueness: { scope: :user_id, 
        message: 'is already in your collection' }
end
