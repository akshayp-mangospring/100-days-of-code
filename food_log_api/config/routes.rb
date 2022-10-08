Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get '/entries', to: 'entries#index'
  post '/entries', to: 'entries#create'
  get '/entries/:id', to: 'entries#show'
  put '/entries/:id', to: 'entries#update'
  delete '/entries/:id', to: 'entries#destroy'
  get '/users', to: 'users#index'
  post '/signup', to: 'auth#signup'
  post '/login', to: 'auth#login'
  get '/users/:id/todo_lists', to: 'users#get_todo_lists'
  get '/todo_lists/:id/todo_items', to: 'todo_lists#index'

  # Defines the root path route ("/")
  root "entries#index"
end
