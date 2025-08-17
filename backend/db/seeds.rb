require 'csv'
require 'benchmark'

# load csv containing city coords into City table
# bulk insert using activerecord-import (https://github.com/zdennis/activerecord-import) 
# for better performance on large volumes
# data from https://simplemaps.com/data/world-cities

csv_text = File.read(Rails.root.join('db','worldcities.csv'));
csv = CSV.parse(csv_text, :headers => true)

puts "[START] populating City table from csv dataset"
rows = []
time = Benchmark.measure do
  City.delete_all
  csv.each do |row|
    row = City.new(name: row['city'], name_ascii: row['city_ascii'], country: row['country'], lat: row['lat'], lng: row['lng'])
    rows.push(row)
  end

  City.import rows
end

puts "[END] populating City table from csv dataset: #{time.real.round(3)}secs" 