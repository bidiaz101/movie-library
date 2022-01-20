class ChangeVoteColumnInUserMovies < ActiveRecord::Migration[6.1]
  def change
    rename_column :user_movies, :vote, :favorite
    change_column :user_movies, :favorite, :boolean, using: 'favorite::boolean'
  end
end
