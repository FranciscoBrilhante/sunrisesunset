require 'net/http'
require 'json'

class SunriseSunsetService
  def single(lat, lng, date)
    uri = URI('https://api.sunrisesunset.io/json')
    params = { :lat => lat, :lng => lng, :date =>  date.strftime('%Y-%m-%d')}
    uri.query = URI.encode_www_form(params)

    result = Net::HTTP.get_response(uri)
    if result.is_a?(Net::HTTPSuccess) && result.body
      result = JSON.parse(result.body, symbolize_names: true)
      if result[:status].eql? "OK"
        return {
          sunrise: result[:results][:sunrise],
          sunset: result[:results][:sunset],
          golden_hour: result[:results][:golden_hour]
        }
      else 
        return nil
      end
    else 
      return nil
    end
  end
end