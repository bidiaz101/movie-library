class MoviesController < ApplicationController
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

end
