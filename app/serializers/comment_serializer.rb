class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :review_id, :content
end