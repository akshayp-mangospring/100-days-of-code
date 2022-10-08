class CreateTodoLists < ActiveRecord::Migration[7.0]
  def change
    create_table :todo_lists do |t|
      t.text :desc

      t.timestamps

      t.belongs_to :user
    end
  end
end
