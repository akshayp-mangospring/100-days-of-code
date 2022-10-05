class Entry < ApplicationRecord
  validates :meal_type, :calories, :proteins, :carbohydrates, :fats, presence: true
  validates :calories, :proteins, :carbohydrates, :fats, numericality: true
end
