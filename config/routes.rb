Rails.application.routes.draw do
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  resources 'users', only: [:update]
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/tmdb/:endpoint', to: 'tmdb#index'
  get '/tmdb/movies/:id', to: 'tmdb#show'
  # get '/tmdb/search/:query', to: 

  resources 'user_movies', only: [:index, :create, :update, :destroy]
  resources 'movies', only: [:show, :create]

  resources 'reviews', only: [:create, :destroy]

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
