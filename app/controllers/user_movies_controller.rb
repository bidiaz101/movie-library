class UserMoviesController < ApplicationController
    before_action :authorize
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    def index
        user = User.find_by!("id = ?", session[:user_id])
        render json: user.user_movies
    end

    def create
        movie = Movie.find_or_create_by!(omdb_id: params[:movie][:omdb_id])
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

    def user_movie_params
        params.permit(:favorite)
    end

    def record_not_found
        render json: {error: "You do not have that movie in your library"}, status: 404
    end
end
