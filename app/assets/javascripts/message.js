$(function(){
  
  function buildHTML(message){
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
         <div class='message' data-message-id=${message.id}>
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
          <div class='message' data-message-id=${message.id}>
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
      url: url,  
      type: 'POST',  
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
});
  var reloadMessages = function() {
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {

    last_message_id = $('.detail__message .content .message:last').data("message-id");

    $.ajax({
      url: "api/messages",  
      type: 'GET',  
      data: {id: last_message_id},  
      dataType: 'json',
    })
    .done(function(messages){
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.contents').append(insertHTML);
      $('.contents').animate({ scrollTop: $('.contents')[0].scrollHeight});
      $("form")[0].reset();
      $('.form__submit').prop('disabled', false);
    }
  })
    .fail(function() {
      alert('error');
     });
    }
  };
    setInterval(reloadMessages, 7000);
})
