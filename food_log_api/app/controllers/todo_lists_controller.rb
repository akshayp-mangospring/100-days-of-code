class TodoListsController < ApplicationController
  before_action :set_todo_list, only: %i[ index ]

  def index
    render json: @todo_list.todo_items
  end

  private
    def set_todo_list
      begin
        @todo_list = TodoList.find(params[:id])
      rescue => e
        render json: { message: 'Not Found' }, status: :not_found
      end
    end
end
