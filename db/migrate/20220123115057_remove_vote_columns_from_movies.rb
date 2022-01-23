class RemoveVoteColumnsFromMovies < ActiveRecord::Migration[6.1]
  def change
    change_table :movies do |t|
      t.remove :vote_average, :vote_count
    end
  end
end
