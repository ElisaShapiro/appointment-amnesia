# require 'byebug'
class ProvidersController < ApplicationController
    def index
        providers = Provider.all
        # where(user_id: @current_user.id)
        render json: providers, status: :ok
    end
    def create
        provider = Provider.create!(provider_params)
        render json: provider, status: :created
    end
    def update
        provider = Provider.find_by(id: params[:id])
        provider.update!(provider_params)
        render json: provider, status: :accepted
    end

    private
    def provider_params
        params.permit(:provider_name, :phone_number, :address, :id)
    end
end
