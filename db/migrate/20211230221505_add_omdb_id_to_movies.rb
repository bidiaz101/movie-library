class AddOmdbIdToMovies < ActiveRecord::Migration[6.1]
  def change
    add_column :movies, :omdb_id, :integer
  end
end
