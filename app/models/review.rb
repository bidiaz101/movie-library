class Review < ApplicationRecord
    belongs_to :user
    belongs_to :movie

    accepts_nested_attributes_for :user
    accepts_nested_attributes_for :movie
end
