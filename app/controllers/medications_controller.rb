class MedicationsController < ApplicationController
    def index
        medications = Medication.all
        render json: medications, status: :ok
    end
end
