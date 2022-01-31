class UserMovie < ApplicationRecord
    belongs_to :user
    belongs_to :movie

    accepts_nested_attributes_for :movie
    validates :movie_id, uniqueness: { scope: :user_id, 
        message: 'is already in your collection' }
end
