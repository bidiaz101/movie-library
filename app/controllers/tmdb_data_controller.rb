class TmdbDataController < ApplicationController
    def index
        tmdb_data = TmdbData.new.get_movies(params[:category])
        render json: tmdb_data
    end

    def show
        tmdb_data = TmdbData.new.get_movie(params[:id])
        render json: tmdb_data
    end

    def search
        tmdb_data = TmdbData.new.search_movies(params[:query])
        render json: tmdb_data
    end
end
