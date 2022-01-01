class UserMoviesController < ApplicationController
    before_action :authorize
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

    def index
        user_movies = UserMovie.where("user_id = ?", session[:user_id])
        render json: user_movies
    end

    def create
        user_movie = UserMovie.new(user_movie_params)
        user_movie.user_id = session[:user_id]
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
        params.permit(:movie_id, :vote)
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
