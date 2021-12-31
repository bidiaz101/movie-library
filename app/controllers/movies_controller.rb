class MoviesController < ApplicationController
    def index
        movies = Movie.all
        render json: movies
    end

    def create
        movie = Movie.new(movie_params)
        movie.vote_count = movie.find_vote_count
        movie.vote_average = movie.find_vote_average
        movie.save!
        render json: movie
    end

    private

    def movie_params
        params.permit(:title, :original_title, :genre, :overview, :poster_url, :release_date, :runtime, :tagline, :ombd_id)
    end

end

    # t.float "vote_average"
    # t.integer "vote_count"
