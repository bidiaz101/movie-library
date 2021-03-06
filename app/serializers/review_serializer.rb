class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :movie_id, :user_id, :content, :score, :user

  def user
    ActiveModelSerializers::SerializableResource.new(object.user, serializer: UserSerializer)
  end
end
