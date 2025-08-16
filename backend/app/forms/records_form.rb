class RecordsForm 
  include ActiveModel::Model
  attr_accessor  :start_date, :end_date, :location
  
  validates :start_date, :end_date, :location, presence: true
  validate :valid_dates
  
  def valid_dates
    begin
      max_range = 14
      start_date = Date.parse(self.start_date)
      end_date= Date.parse(self.end_date)
      if start_date > end_date
        errors.add(:start, "must be before end date")
      end
      if (end_date - start_date).to_i > max_range
        errors.add(:start, "max date range exceeded (#{max_range})")
      end
    rescue => e
      errors.add(:base, "start and/or end dates have invalid format")
    end
    
  end
end
  