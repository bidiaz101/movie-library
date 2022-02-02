class ReviewsController < ApplicationController
    before_action :authorize
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    def create
        review = Review.new(review_params)
        # maybe validate user with find move to app controller inside method there
        review.user_id = session[:user_id]
        review.save!
        render json: review
    end

    def destroy
        review = Review.find(params[:id])
        review.destroy
        head :no_content
    end

    private

    def review_params
        params.permit(:movie_id, :content, :score)
    end

    def record_not_found
        render json: {error: "That review does not exist"}, status: 404
    end
end
