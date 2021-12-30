class AddVoteToUserMovies < ActiveRecord::Migration[6.1]
  def change
    add_column :user_movies, :vote, :integer
  end
end
