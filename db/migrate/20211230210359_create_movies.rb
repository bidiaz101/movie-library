class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :original_title
      t.string :genre
      t.text :overview
      t.string :poster_url
      t.string :release_date
      t.integer :runtime
      t.string :tagline
      t.float :vote_average
      t.integer :vote_count

      t.timestamps
    end
  end
end
