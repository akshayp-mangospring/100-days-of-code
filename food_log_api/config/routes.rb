Rails.application.routes.draw do
  get 'entries/index'
  get 'entries/show'
  get 'entries/update'
  get 'entries/destroy'
  get 'entries/create'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
