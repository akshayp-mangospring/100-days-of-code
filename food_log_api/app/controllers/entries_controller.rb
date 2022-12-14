class EntriesController < ApplicationController
  before_action :set_entry, only: %i[ show update destroy ]

  def index
    @entries = Entry.all
    render json: @entries
  end

  def create
    @entry = Entry.new(entry_params)

    if @entry.save
      render json: @entry
    else
      render json: { error: 'Error Occured' }
    end
  end

  def show
    render json: @entry
  end

  def update
    if @entry.update(entry_params)
      render json: @entry
    else
      render json: { error: 'Error Occured' }
    end
  end

  def destroy
    if @entry.destroy
      render json: { }, status: :no_content
    else
      render json: { error: 'Error Occured' }
    end
  end

  private
    def entry_params
      params.require(:entry).permit(:meal_type, :calories, :carbs, :proteins, :fats)
    end

    def set_entry
      # Had to use `begin...rescue` block here
      # Since `.find` raises an exception if the record isn't found
      begin
        @entry = Entry.find(params[:id])
      rescue => e
        render json: { message: 'Not Found' }, status: :not_found
      end
    end
end
