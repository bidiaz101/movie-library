Rails.application.routes.draw do
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  resources 'users', only: [:update]
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  resources 'user_movies', only: [:index, :create, :update, :destroy]
  resources 'movies', only: [:index, :create]

  resources 'reviews', only: [:create, :delete]
  resources 'comments', only: [:create, :delete]

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
