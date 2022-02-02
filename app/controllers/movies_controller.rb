class MoviesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    def show
        # used find_or_create_by instead of find_by so the user can type /movies/:any_id_they_want and not break the app
        movie = Movie.find_or_create_by!(movie_params)
        render json: movie
    end

    def create
        movie = Movie.create!(movie_params)
        render json: movie
    end

    private

    def movie_params
        params.permit(:omdb_id)
    end

    def record_not_found
        render json: { error: "That movie was not found" }, status: 404
    end
    
end
