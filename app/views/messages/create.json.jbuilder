json.image @message.image.url
json.body @message.body
json.name @message.user.name
json.date @message.created_at.strftime("%Y年 %m月 %d日 %H:%M")
json.id @message.id
