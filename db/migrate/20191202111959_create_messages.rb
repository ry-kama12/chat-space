class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.references :user, foregin_key: true
      t.references :group, foregin_key: true
      t.string :image
      t.text :body
      t.timestamps
    end
  end
end
