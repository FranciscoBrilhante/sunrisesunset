class RecordsController < ApplicationController

  # GET /cities/search
  # get sunrise/sunset times for a given location
  # lookup location coords in City table
  # query db for cached Record entries, else hit external API thorugh Service
  def show
    # date range validation app/forms/records_form.rb
    form = RecordsForm.new(params.permit(:start_date, :end_date, :location))
    if !form.valid?
      render json: {errors: form.errors.full_messages }, status: :unprocessable_content
      return
    end

    # lookup city coords
    # TODO leverage other API services that include more locations
    # city = City.find_by("name LIKE ?","#{params[:location]}%")
    name, country = params[:location].split(",").map(&:strip)
    city = City.where("name LIKE ? AND country LIKE ?", "#{name}%", "#{country}%").first
    if city == nil
      render json: {errors: ["city doesnt exist"]}, status: :not_found
      return
    end

    lat = city.lat
    lng = city.lng
    records = []
    start_date = Date.parse(params[:start_date])
    end_date = Date.parse(params[:end_date])

    (start_date..end_date).each do |date|
      record = Record.find_by("lat = ? AND lng = ? AND date = ? ", lat, lng, date)
      # no db record, fetch api and save to db
      if record == nil
        res = SunriseSunsetService.new.single(lat, lng, date)
        # api error
        if res == nil
          render json: {errors: ["could not retrieve information for #{date}"]}, status: :not_found
          return
        else
          record = Record.create(lat: lat, lng:lng, date: date, data: res)
        end
      end
      records.push({
        id: record.id,
        date: record.date,
        sunrise: record.data['sunrise'],
        sunset: record.data['sunset'],
        golden_hour: record.data['golden_hour']
      })
    end
    render json: {result: records}, status: :ok
  end
end
