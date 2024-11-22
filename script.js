function setupDailyTrigger() {
  ScriptApp.newTrigger("checkEventsAndNotify")
           .timeBased()
           .atHour(19)
           .everyDays(1)
           .create();
}

function checkEventsAndNotify() {
  const calendar = CalendarApp.getDefaultCalendar();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const startOfDay = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(startOfDay.getDate() + 1);
  
  const events = calendar.getEvents(startOfDay, endOfDay);
  if (events.length > 0) {
    const eventTitles = events.map(event => event.getTitle()).join(", ");
    sendTelegramMessage(`Hai i seguenti eventi domani: "${eventTitles}"`);
  }
}

function sendTelegramMessage(message) {
  const telegramToken = "YOUR_TOKEN";
  const chatId = "YOUR_CHAT_ID";
  
  const payload = {
    method: "sendMessage",
    chat_id: chatId,
    text: message
  };
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };
  
  const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
  UrlFetchApp.fetch(url, options);
}
