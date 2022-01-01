class ReviewsController < ApplicationController
    before_action :authorize
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

    def show
        review = Review.find(params[:id])
        render json: review
    end

    def create
        review = Review.new(review_params)
        review.user_id = session[:user_id]
        review.save!
        render json: review
    end

    def delete
        review = Review.find(params[:id])
        review.destroy
        head :no_content
    end

    private

    def review_params
        params.permit(:movie_id, :content, :score)
    end

    def authorize
        render json: {error: "Please log in."}, status: :unauthorized unless session.include? :user_id
    end

    def invalid_record(invalid)
        render json: { error: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def record_not_found
        render json: {error: "That review does not exist"}, status: 404
    end
end

# Reviews table schema
# t.integer "movie_id"
# t.integer "user_id"
# t.text "content"
# t.integer "score"
