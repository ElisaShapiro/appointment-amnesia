class MedicationsController < ApplicationController
    def index
        medications = Medication.where(user_id: @current_user.id)
        render json: medications, status: :ok
    end
    def create
        medication = @current_user.medications.create!(medication_name: params[:medication_name], dosage: params[:dosage], provider_id: params[:provider_id])
        render json: medication, status: :accepted
    end
    def update
        medication = Medication.find_by(id: params[:id])
        medication.update!(dosage: params[:dosage])
    end
    def destroy
        medication = Medication.find_by(id: params[:id])
        medication.destroy
        head :no_content
    end
end
