require('dotenv').config();
const express = require('express');
const line = require('@line/bot-sdk');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const app = express();

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};
const client = new line.Client(lineConfig);
app.use(bodyParser.json());

const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});
const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = process.env.SPREADSHEET_ID;

app.post('/webhook', line.middleware(lineConfig), async (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then(result => res.json(result));
});

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') return;

  const msg = event.message.text.toLowerCase();
  const userId = event.source.userId;

  if (msg === 'จองคิว') {
    const get = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Queue!A2:A'
    });

    const queueNo = 'Q' + String((get.data.values?.length || 0) + 1).padStart(3, '0');

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Queue!A1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[queueNo, userId, 'waiting']]
      }
    });

    const flexMsg = {
      type: "flex",
      altText: "จองคิวสำเร็จ",
      contents: {
        type: "bubble",
        size: "kilo",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            { type: "text", text: "จองคิวสำเร็จ 🎉", weight: "bold", size: "lg", color: "#27ae60" },
            { type: "text", text: "หมายเลขคิวของคุณคือ", size: "md", margin: "md" },
            { type: "text", text: queueNo, size: "3xl", weight: "bold", color: "#e74c3c", margin: "md" }
          ]
        }
      }
    };

    return client.replyMessage(event.replyToken, flexMsg);
  }
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
