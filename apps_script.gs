function pushNotify(userId, queueNo) {
  const token = 'YOUR_LINE_ACCESS_TOKEN';
  const url = 'https://api.line.me/v2/bot/message/push';

  const payload = {
    to: userId,
    messages: [{
      type: "text",
      text: `📢 ถึงคิวของคุณแล้ว!\nคิว ${queueNo} กรุณาเข้ารับบริการ`
    }]
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + token
    },
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}
