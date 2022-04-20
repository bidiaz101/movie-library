class UserProfilesController < ApplicationController
    def show
        user_profile = User.find(params[:id])
        render json: user_profile, serializer: UserProfileSerializer
    end
end