class AuthController < ApplicationController
  include BCrypt

  def login
    @user = User.find_by_user_name(params[:user_name])

    if @user.blank?
      render json: { message: 'Not Found' }, status: :not_found
      return
    end

    if BCrypt::Password.new(@user.password) == params[:password]
      render json: { message: 'Authenticated' }
    else
      render json: { message: 'Unauthenticated' }, status: :unauthorized
    end
  end

  def signup
    @user = User.new(user_params)
    @user.password = BCrypt::Password.create(params[:password])

    if @user.save
      render json: @user, status: :created
    else
      render json: { message: 'User not created' }, status: :bad_request
    end
  end

  private
    def user_params
      params.require(:auth).permit(:user_name, :password)
    end
end
