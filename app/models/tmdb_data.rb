class TmdbData
    def get_movies(category)
        url = "https://api.themoviedb.org/3/movie/#{category}?api_key=#{ENV["tmdb_api_key"]}&language=en-US&page=1"
        response = HTTParty.get(url)
        response
    end

    def get_movie(id)
        url = "https://api.themoviedb.org/3/movie/#{id}?api_key=#{ENV["tmdb_api_key"]}&language=en-US"
        response = HTTParty.get(url)
        response
    end

    def search_movies(query)
        url = "https://api.themoviedb.org/3/search/movie?api_key=#{ENV["tmdb_api_key"]}&language=en-US&query=#{query}&page=1&include_adult=false"
        response = HTTParty.get(url)
        response
    end
end
