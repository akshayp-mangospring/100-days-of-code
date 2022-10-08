class UsersController < ApplicationController
  before_action :set_user, only: %i[ get_todo_lists ]

  def index
    @users = User.all
    render json: @users
  end

  def get_first
    @first_user = User.first
    render json: @first_user
  end

  def signup
    @user = User.new(user_params)

    if @user.save
      render json: @user
    else
      render json: { message: 'User not created' }
    end
  end

  def get_todo_lists
    render json: @user.todo_lists
  end

  private
    def user_params
      params.require(:user).permit(:user_name, :password)
    end

    def set_user
      begin
        @user = User.find(params[:id])
      rescue => e
        render json: { message: 'Not Found' }
      end
    end
end
