class MoviesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    def index
        movies = Movie.all
        render json: movies
    end

    def create
        movie = Movie.create!(movie_params)
        render json: movie
    end

    private

    def movie_params
        params.permit(:title, :original_title, :ombd_id, :vote_count, :vote_average)
    end

    def record_not_found
        render json: { error: "That movie was not found"}, status: 404
    end

end
