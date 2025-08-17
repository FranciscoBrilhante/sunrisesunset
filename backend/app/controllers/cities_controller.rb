class CitiesController < ApplicationController

  # GET /cities/search
  def search
    form = CitiesSearchForm.new(params.permit(:location))
    if !form.valid?
      render json: {errors: form.errors.full_messages }, status: :unprocessable_content
      return
    end
    cities = City
      .where("name LIKE :loc OR name_ascii LIKE :loc OR country LIKE :loc", loc: "#{params[:location]}%")
      .order(:name).limit(5)
      .select(:id, :name, :country)
    render json: {cities: cities}, status: :ok
  end
end
