class AppointmentsController < ApplicationController
    def index
        appointments = Appointment.where(user_id: @current_user.id)
        render json: appointments, status: :ok
    end
    def create
        # appointment = @current_user.appointment.create(appointment_params)
        appointment = @current_user.appointments.create!(appointment_time: params[:appointment_time], provider_id: params[:provider_id], category_id: params[:category_id])
        render json: appointment, status: :created
    end
    def update
        appointment = Appointment.find_by(id: params[:id])
        appointment.update!(appointment_time: params[:appointment_time], provider_id: params[:provider_id], category_id: params[:category_id])
        render json: appointment, status: :accepted
    end
    def destroy
        appointment = Appointment.find_by!(id: params[:id])
        appointment.destroy
        head :no_content
    end
   

    private 
    def appointment_params
        params.permit(:appointment_time)
    end
end
