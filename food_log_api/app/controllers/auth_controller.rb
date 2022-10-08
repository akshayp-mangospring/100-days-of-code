class AuthController < ApplicationController
  def login
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
      params.require(:auth).permit(:user_name, :password)
    end
end
