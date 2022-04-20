class ProfileReviewSerializer < ActiveModel::Serializer
    attributes :id, :movie_id, :content, :score
end