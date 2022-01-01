require 'open-uri'
require 'net/http'
require 'json'

class GetMovies
    URL = "https://api.themoviedb.org/3/movie/"

    def get_movies(id)
        uri = URI.parse(URL + "#{id}?api_key=#{ENV["API_KEY"]}")
        response = Net::HTTP.get_response(uri)
        response.body
    end
end

puts 'Seeding DB'

(550..600).each do |i|
    movies = GetMovies.new.get_movies(i)
    if JSON.parse(movies)["title"]
        Movie.create(
            {
                title: JSON.parse(movies)["title"],
                original_title: JSON.parse(movies)["original_title"],
                vote_average: JSON.parse(movies)["vote_average"],
                vote_count: JSON.parse(movies)["vote_count"],
                omdb_id: i
            }
        )
    end
end

puts "\\m/ Done seeding \\m/"
