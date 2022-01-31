class UserMoviesController < ApplicationController
    before_action :authorize
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

    def index
        user = User.find_by!("id = ?", session[:user_id])
        render json: user.user_movies
    end

    def create
        # check strong params docs
        movie = Movie.find_or_create_by!(user_movie_params)
        user_movie = movie.user_movies.build(user_id: session[:user_id], favorite: false)
        user_movie.save!
        render json: user_movie, status: :created
    end

    def update
        user_movie = UserMovie.find(params[:id])
        user_movie.update!(user_movie_params)
        render json: user_movie, status: :accepted
    end

    def destroy
        user_movie = UserMovie.find(params[:id])
        user_movie.destroy
        head :no_content
    end

    private

    # check params.require docs
    def user_movie_params
        params.permit(:movie_id, movie_attributes: [ :omdb_id ])
    end

    def authorize
        render json: {error: "Please log in."}, status: :unauthorized unless session.include? :user_id
    end

    def invalid_record(invalid)
        render json: { error: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def record_not_found
        render json: {error: "You do not have that movie in your library"}, status: 404
    end
end
