class CommentsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

    def create
        comment = Comment.new(comment_params)
        comment.user_id = session[:user_id]
        comment.save!
        render json: comment, status: :accepted
    end

    def delete
        comment = comment.find(params[:id])
        comment.destroy
        head :no_content
    end

    private

    def comment_params
        params.permit(:review_id, :content)
    end

    def invalid_record(invalid)
        render json: { error: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def record_not_found
        render json: {error: "That review does not exist"}, status: 404
    end

end

# Comments table schema
# t.integer "user_id"
# t.integer "review_id"
# t.text "content"
