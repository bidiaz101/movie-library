class ReviewsController < ApplicationController
    before_action :authorize
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    def create
        # used find_by because if the user is on the movie page, the movie will have been posted by the movie controller
        movie = Movie.find_by!(omdb_id: params[:movie][:omdb_id])
        review = movie.reviews.build(review_params)
        review.user_id = session[:user_id]
        review.save!
        render json: review, status: :created
    end

    def destroy
        review = Review.find(params[:id])
        review.destroy
        head :no_content
    end

    private

    def review_params
        params.permit(:content, :score)
    end

    def record_not_found
        render json: {error: "That review does not exist"}, status: 404
    end
end
