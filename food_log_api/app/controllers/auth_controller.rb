class AuthController < ApplicationController
  include BCrypt

  def login
    @user = User.find_by_user_name(params[:user_name])

    if @user.password == params[:password]
      render json: { message: 'Authenticated' }
    else
      render json: { message: 'Unauthenticated' }
    end
  end

  def signup
    @user = User.new(user_params)
    @user.password = BCrypt::Password.create(params[:password])

    if @user.save
      render json: @user
    else
      render json: { message: 'User not created' }
    end
  end

  private
    def user_params
      params.require(:auth).permit(:user_name, :password)
    end
end
