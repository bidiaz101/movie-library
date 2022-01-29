class TmdbData
    def get_movies(endpoint)
        url = "https://api.themoviedb.org/3/movie/#{endpoint}?api_key=#{ENV["tmdb_api_key"]}&language=en-US&page=1"

        response = HTTParty.get(url)

        response
    end

    def get_movie(id)
        url = "https://api.themoviedb.org/3/movie/#{id}?api_key=#{ENV["tmdb_api_key"]}&language=en-US"

        response = HTTParty.get(url)

        response
    end
end
