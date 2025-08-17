class Record < ApplicationRecord
  serialize :data , type: Hash, coder: JSON
end
