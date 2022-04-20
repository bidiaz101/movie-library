class UserProfileSerializer < ActiveModel::Serializer
    attributes :id, :username, :profile_picture_thumbnail_url, :profile_picture_url

    has_many :reviews, serializer: ProfileReviewSerializer
end