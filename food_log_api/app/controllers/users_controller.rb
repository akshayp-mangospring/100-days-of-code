class UsersController < ApplicationController
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

  private
    def user_params
      params.require(:user).permit(:user_name, :password)
    end
end
