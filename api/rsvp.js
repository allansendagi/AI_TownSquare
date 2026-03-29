const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Event details for ICS generation
const eventDetails = {
  title: 'AI TownSquare Dubai',
  startDate: '20260403T100000Z', // 2:00 PM GST = 10:00 UTC
  endDate: '20260403T110000Z',   // 3:00 PM GST = 11:00 UTC
  location: 'DIFC FinTech Hive, Dubai',
  description: '60-minute structured civic dialogue examining AI\'s societal impact with 25 cross-sector participants.\n\nQuestion: Is AI Going to Take Our Jobs?\n\nMore info: https://aitownsquare.org/dubai/'
};

function generateICSContent() {
  const uid = 'dubai-2026@aitownsquare.org';
  const now = new Date();
  const dtstamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  // Escape special characters for ICS format
  const description = eventDetails.description.replace(/\n/g, '\\n');

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AI TownSquare//Dubai//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:' + uid,
    'DTSTAMP:' + dtstamp,
    'DTSTART:' + eventDetails.startDate,
    'DTEND:' + eventDetails.endDate,
    'SUMMARY:' + eventDetails.title,
    'LOCATION:' + eventDetails.location,
    'DESCRIPTION:' + description,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return ics;
}

module.exports = async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, organization, role, attendance } = req.body;

    // Validate required fields
    if (!name || !email || !attendance) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const isAttending = attendance === 'yes';

    // Build email content based on attendance
    let subject, htmlBody;
    const attachments = [];

    if (isAttending) {
      subject = "You're confirmed for AI TownSquare Dubai - April 3";

      htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 30px; }
    .title { font-size: 24px; font-weight: 600; margin-bottom: 8px; }
    .subtitle { color: #666; font-size: 16px; }
    .details { background: #f8f9fa; border-radius: 12px; padding: 24px; margin: 24px 0; }
    .detail-row { display: flex; margin-bottom: 12px; }
    .detail-label { font-weight: 600; width: 100px; color: #666; }
    .detail-value { color: #1a1a1a; }
    .calendar-note { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 24px; border-radius: 8px; margin: 24px 0; text-align: center; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="title">You're Confirmed!</div>
      <div class="subtitle">AI TownSquare Dubai</div>
    </div>

    <p>Dear ${name},</p>

    <p>Thank you for confirming your attendance. Your seat is reserved for AI TownSquare Dubai.</p>

    <div class="details">
      <div class="detail-row">
        <span class="detail-label">Date</span>
        <span class="detail-value">3 April 2026</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Time</span>
        <span class="detail-value">2:00 PM GST</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Location</span>
        <span class="detail-value">DIFC FinTech Hive, Dubai</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Format</span>
        <span class="detail-value">60-minute Civic Dialogue</span>
      </div>
    </div>

    <div class="calendar-note">
      The calendar invite is attached to this email.
    </div>

    <p>We look forward to seeing you there.</p>

    <div class="footer">
      <p>AI TownSquare<br>
      Civic Infrastructure for the Intelligence Age</p>
      <p><a href="https://aitownsquare.org">aitownsquare.org</a></p>
    </div>
  </div>
</body>
</html>
      `;

      // Generate and attach ICS file
      const icsContent = generateICSContent();
      attachments.push({
        filename: 'ai-townsquare-dubai.ics',
        content: Buffer.from(icsContent).toString('base64'),
        contentType: 'text/calendar'
      });
    } else {
      subject = 'Thank you for your response';

      htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 30px; }
    .title { font-size: 24px; font-weight: 600; margin-bottom: 8px; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="title">Thank You</div>
    </div>

    <p>Dear ${name},</p>

    <p>Thank you for letting us know that you won't be able to attend AI TownSquare Dubai on April 3.</p>

    <p>We appreciate your response and hope to see you at a future AI TownSquare session. We'll be hosting events in cities around the world as we build civic infrastructure for the intelligence age.</p>

    <p>Stay tuned for future opportunities to participate.</p>

    <div class="footer">
      <p>AI TownSquare<br>
      Civic Infrastructure for the Intelligence Age</p>
      <p><a href="https://aitownsquare.org">aitownsquare.org</a></p>
    </div>
  </div>
</body>
</html>
      `;
    }

    // Send email via Resend
    const emailResult = await resend.emails.send({
      from: 'AI TownSquare <rsvp@aitownsquare.org>',
      to: email,
      cc: ['olga@aitownsquare.org', 'allan@aitownsquare.org'],
      subject: subject,
      html: htmlBody,
      attachments: attachments.length > 0 ? attachments : undefined
    });

    if (emailResult.error) {
      console.error('Resend error:', emailResult.error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({
      success: true,
      message: isAttending ? 'Confirmation email sent with calendar invite' : 'Thank you email sent'
    });

  } catch (error) {
    console.error('RSVP handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
