class AppointmentsController < ApplicationController
    def index
        appointments = Appointment.all
        render json: appointments, status: :ok
    end
end
