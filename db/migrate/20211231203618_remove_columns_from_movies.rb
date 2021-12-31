class RemoveColumnsFromMovies < ActiveRecord::Migration[6.1]
  def change
    change_table :movies do |t|
      t.remove :title, :original_title, :genre, :overview, :poster_url, :release_date, :runtime, :tagline
  end
end
