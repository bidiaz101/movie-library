class TmdbController < ApplicationController

    def index
        tmdb_data = TmdbData.new.get_movies(params[:endpoint])
        render json: tmdb_data
    end

    def show
        tmdb_data = Tmdb.new.get_movie(params[:id])
        render json: tmdb_data
    end
end
