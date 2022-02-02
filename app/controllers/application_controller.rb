class ApplicationController < ActionController::API
  include ActionController::Cookies

  def authorize
    render json: {error: "Please log in."}, status: :unauthorized unless session.include? :user_id
  end

  def record_invalid(invalid)
      render json: { error: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end
  
end
