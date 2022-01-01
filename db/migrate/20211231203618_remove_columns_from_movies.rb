class RemoveColumnsFromMovies < ActiveRecord::Migration[6.1]
  def change
    change_table :movies do |t|
      t.remove :genre, :overview, :poster_url, :release_date, :runtime, :tagline
    end
  end
end
