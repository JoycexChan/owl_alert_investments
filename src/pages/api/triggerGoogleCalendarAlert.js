import { google } from 'googleapis';

const calendar = google.calendar('v3');

const triggerGoogleCalendarAlert = async (eventDetails) => {
  const { client_email, private_key, calendar_id } = process.env;
  const auth = new google.auth.JWT(
    client_email,
    null,
    private_key.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/calendar']
  );

  try {
    await calendar.events.insert({
      auth,
      calendarId: calendar_id,
      requestBody: eventDetails,
    });
  } catch (error) {
    console.error('Error creating calendar event:', error);
  }
};

export default triggerGoogleCalendarAlert;
