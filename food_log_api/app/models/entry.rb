class Entry < ApplicationRecord
  belongs_to :user
  validates :meal_type, :calories, :proteins, :carbs, :fats, presence: true
  validates :calories, :proteins, :carbs, :fats, numericality: true
end
