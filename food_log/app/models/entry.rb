class Entry < ApplicationRecord
  validates :meal_type, :calories, :proteins, :carbohydrates, :fats, presence: true
end
