class SessionsController < ApplicationController
    
    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            unauthorized
        end
    end

    def destroy
        if session[:user_id]
            session.destroy
            head :no_content
        else
            unauthorized
        end
    end

    private

    def unauthorized
        render json: { error: "Wrong username or password. Passwords are case-sensitive" }, status: :unauthorized
    end
    
end
