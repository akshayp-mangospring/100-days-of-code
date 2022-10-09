class UsersController < ApplicationController
  before_action :set_user, only: %i[ get_todo_lists ]

  def index
    @users = User.all
    render json: @users
  end

  def get_todo_lists
    render json: @user.todo_lists
  end

  private
    def set_user
      begin
        @user = User.find(params[:id])
      rescue => e
        render json: { message: 'Not Found' }, status: :not_found
      end
    end
end
