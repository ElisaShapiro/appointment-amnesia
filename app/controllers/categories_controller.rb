require 'byebug'
class CategoriesController < ApplicationController
    def index
        categories = Category.all
        render json: categories, status: :ok
    end
    def show
        category = Category.find_by(id: params[:id])
        render json: category, status: :ok
    end
    def create
        category = Category.create!(category_name: params[:category_name])
        render json: category, status: :created
    end
    def update
        category = Category.find_by(id: params[:id])
        category.update!(category_name: params[:category_name])
        render json: category, status: :accepted
    end
    def destroy
        category = Category.find_by!(id: params[:id])
        category.destroy
        # render json: Category.all, include: { user: { only: [:name] }}, status: :created
    end
end
