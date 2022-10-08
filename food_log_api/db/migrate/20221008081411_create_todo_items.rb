class CreateTodoItems < ActiveRecord::Migration[7.0]
  def change
    create_table :todo_items do |t|
      t.string :content

      t.timestamps

      t.belongs_to :todo_list
    end
  end
end
