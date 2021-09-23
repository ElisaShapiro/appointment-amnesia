require 'byebug'
class EventsController < ApplicationController
    # skip_before_action :authorize
    def index
        events = Event.all
        render json: events, status: :ok
    end
    def create
        # byebug
        # event = @current_user.events.create(event_params)

        event = @current_user.events.create!(content: params[:content], severity: params[:severity], category_id: 1)
        # byebug
        # (event_params)
          
        render json: event, status: :created
    end
   

    private 
    def event_params
        params.permit(:content, :severity)
    end
end
