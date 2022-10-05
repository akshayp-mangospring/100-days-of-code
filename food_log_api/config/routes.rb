Rails.application.routes.draw do
  get 'entries/index'
  get 'entries/show'
  put 'entries/update'
  delete 'entries/destroy'
  post 'entries/create'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "entries#index"
end
