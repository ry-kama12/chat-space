$(function(){
  
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      
      var html =     
      `<div class="top__info">
         <div class="sent__message">
           <div class="sent__name">
             ${message.name}
           </div>
         <div class="message__day">
           ${message.date} 
           </div>
          </div>
        </div>
      <div class="detail__message">
        <div class="content">
         ${message.body} 
         <img src="${message.image}" >
         </div>
      </div>`

    } else {
      var html = 
      `<div class="top__info">
         <div class="sent__message">
           <div class="sent__name">
             ${message.name}
           </div>

         <div class="message__day">
           ${message.date} 
           </div>
          </div>
        </div>
      <div class="detail__message">
        <div class="content">
          ${message.body} 
        </div>
      </div>`
    }
        return html
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.contents').append(html);
      $('.contents').animate({ scrollTop: $('.contents')[0].scrollHeight});
      $("form")[0].reset();
      $('.form__submit').prop('disabled', false);
    })

    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
})