class TmdbDataController < ApplicationController
    def get_movie_data
        if params[:endpoint].to_i == 0 
            # this will run if the endpoint is a string
            tmdb_data = TmdbData.new.get_movies(params[:endpoint])
            render json: tmdb_data
        else
            # this will run if endpoint is an integer
            tmdb_data = TmdbData.new.get_movie(params[:endpoint])
            render json: tmdb_data
        end
    end

    def search
        tmdb_data = TmdbData.new.search_movies(params[:query])
        if tmdb_data['results'].length != 0
            render json: tmdb_data
        else
            render json: { results: ["There are no matching movies"] }
        end
    end
end
