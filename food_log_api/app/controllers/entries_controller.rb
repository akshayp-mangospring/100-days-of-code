class EntriesController < ApplicationController
  before_action :set_entry, only %i[show update destroy]

  def index
    @entries = Entry.all
    render json: @entries
  end

  def create
    @entry = Entry.new

    if @entry.save(entry_params)
      render json: @entry
    else
      render json: { message: 'Error Occured' }
    end
  end

  def show
    render json: @entry
  end

  def update
    if @entry.update(entry_params)
      render json: @entry
    else
      render json: { message: 'Error Occured' }
    end
  end

  def destroy
    if @entry.destroy
      render json: { message: 'Entry successfully deleted' }
    else
      render json: { message: 'Error Occured' }
    end
  end

  private
    def entry_params
      params.require(:entry).permit(:meal_type, :calories, :carbs, :proteins, :fats)
    end

    def set_entry
      @entry = Entry.find(params[:id])
    end
end
