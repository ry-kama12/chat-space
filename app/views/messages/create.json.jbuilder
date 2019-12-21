json.use_id @message.user_id
json.group_id @message.group_id
json.image @message.image.url
json.body @message.body
json.name @message.user.name
json.date @message.created_at.strftime("%Y年 %m月 %d日 %H:%M")
# json.mail_address　インスタンス変数.カラム
# json.name　インスタンス変数.カラム