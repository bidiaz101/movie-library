class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    before_action :authorize, except: [:create]

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def update
        user = User.find(session[:user_id])
        user.update!(user_params)
        render json: user, status: :accepted
    end

    def show
        current_user = User.find(session[:user_id])
        render json: current_user, status: :created
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :dark_mode, :profile_picture_url, :profile_picture_thumbnail_url)
    end

    def record_not_found
        render json: { error: "Please log in or sign up" }, status: :unauthorized
    end
end
