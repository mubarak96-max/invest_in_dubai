import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, phone, projectTitle, timestamp } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !projectTitle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email content
    const emailContent = `
New Brochure Download Request

Project: ${projectTitle}
Date: ${new Date(timestamp).toLocaleString()}

Contact Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}

This user has requested to download the brochure for ${projectTitle}.
Please follow up with them regarding their interest in this project.
    `.trim();

    // Here you would typically use a service like SendGrid, Nodemailer, or similar
    // For now, we'll simulate the email sending
    console.log('Brochure request email would be sent to mubarakmmm5@gmail.com:');
    console.log(emailContent);

    // You can implement actual email sending here using your preferred service
    // Example with fetch to a third-party email service:
    /*
    const emailResponse = await fetch('YOUR_EMAIL_SERVICE_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({
        to: 'mubarakmmm5@gmail.com',
        subject: `New Brochure Request - ${projectTitle}`,
        text: emailContent,
        html: emailContent.replace(/\n/g, '<br>')
      })
    });
    */

    // For demonstration, we'll return success
    return NextResponse.json(
      { 
        message: 'Brochure request submitted successfully',
        data: { name, email, phone, projectTitle }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing brochure request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
