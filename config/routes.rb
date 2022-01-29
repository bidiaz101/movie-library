Rails.application.routes.draw do
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  resources 'users', only: [:update]
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/tmdb/movies/:category', to: 'tmdb_data#index'
  get '/tmdb/movie/:id', to: 'tmdb_data#show'
  get '/tmdb/search/:query', to: 'tmdb_data#search'

  # Used if I want to make an app/controllers/tmdb_data directory
  # namespace :tmdb_data do
  #   get '/movies/:category', to: 'tmdb#index'
  #   get '/movie/:id', to: 'tmdb#show'
  #   get '/search/:query', to: 'tmdb#search'
  # end

  resources 'user_movies', only: [:index, :create, :update, :destroy]
  resources 'movies', only: [:show, :create]

  resources 'reviews', only: [:create, :destroy]

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
