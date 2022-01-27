class MovieSerializer < ActiveModel::Serializer
  attributes :id, :omdb_id, :reviews

  def reviews
    ActiveModelSerializers::SerializableResource.new(object.reviews, each_serializer: ReviewSerializer)
  end
end
