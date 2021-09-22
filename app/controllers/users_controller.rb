class UsersController < ApplicationController
    skip_before_action :authorize, only: :create
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end
    def show
        render json: @current_user, status: :ok
    end
    # def update
    #     user = User.find_by(id: params[:id])
    #     user.update!(image_url: params[:image_url])
    #     render json: user, status: :accepted
    # end

    private
    def user_params
        params.permit(:name, :email, :password, :password_confirmation)
    end
end
