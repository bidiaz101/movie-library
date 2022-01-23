class User < ApplicationRecord
    has_secure_password
    
    has_many :user_movies
    has_many :movies, through: :user_movies
    has_many :reviews
    has_many :movies, through: :reviews

    validates :username, presence: true
    validates :username, uniqueness: { case_sensitive: false }
end
