Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get '/entries', to: 'entries#index'
  post '/entries', to: 'entries#create'
  get '/entries/:id', to: 'entries#show'
  put '/entries/:id', to: 'entries#update'
  delete '/entries/:id', to: 'entries#destroy'

  # Defines the root path route ("/")
  root "entries#index"
end
