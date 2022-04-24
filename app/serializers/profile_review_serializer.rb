class ProfileReviewSerializer < ActiveModel::Serializer
    attributes :id, :content, :score, :movie

    def movie
        ActiveModelSerializers::SerializableResource.new(object.movie, serializer: ProfileMovieSerializer)
    end
end
