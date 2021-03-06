Rails.application.routes.draw do
  get 'uploads/prepare'
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  resources 'users', only: [:update]
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/tmdb/movies/:endpoint', to: 'tmdb_data#get_movie_data'
  get '/tmdb/search/:query', to: 'tmdb_data#search'

  resources 'user_movies', only: [:index, :create, :update, :destroy]
  resources 'movies', only: [:show, :create]

  resources 'reviews', only: [:create, :destroy]

  post 'uploads/prepare'

  get '/users/profiles/:id', to: 'user_profiles#show'

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
