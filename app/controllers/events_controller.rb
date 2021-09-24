class EventsController < ApplicationController
    # skip_before_action :authorize
    def index
        events = Event.all
        render json: events, status: :ok
    end
    def create
        # event = @current_user.events.create(event_params)
        event = @current_user.events.create!(content: params[:content], event_time: params[:event_time], severity: params[:severity], category_id: params[:category_id])
        render json: event, status: :created
    end
    def destroy
        event = Event.find_by!(id: params[:id])
        event.destroy
        head :no_content
    end
   

    private 
    def event_params
        params.permit(:content, :severity, :event_time)
    end
end
