const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' }); // Change to your region

exports.handler = async (event) => {
    try {
        // Parse the form data
        const body = JSON.parse(event.body);
        const { name, email, company, interest, message } = body;
        
        // Validate required fields
        if (!name || !email || !company || !interest) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS'
                },
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }
        
        // Email content
        const emailParams = {
            Source: 'kevin.luminghu@gmail.com', // Your verified email
            Destination: {
                ToAddresses: ['kevin.luminghu@gmail.com'] // Where to send emails
            },
            Message: {
                Subject: {
                    Data: `New Inventory Pro Contact: ${interest}`,
                    Charset: 'UTF-8'
                },
                Body: {
                    Html: {
                        Data: `
                            <h2>New Contact Form Submission</h2>
                            <table style="border-collapse: collapse; width: 100%;">
                                <tr style="background-color: #f8f9fa;">
                                    <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Name:</td>
                                    <td style="padding: 12px; border: 1px solid #dee2e6;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Email:</td>
                                    <td style="padding: 12px; border: 1px solid #dee2e6;">${email}</td>
                                </tr>
                                <tr style="background-color: #f8f9fa;">
                                    <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Company:</td>
                                    <td style="padding: 12px; border: 1px solid #dee2e6;">${company}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Interest:</td>
                                    <td style="padding: 12px; border: 1px solid #dee2e6;">${interest}</td>
                                </tr>
                                <tr style="background-color: #f8f9fa;">
                                    <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Message:</td>
                                    <td style="padding: 12px; border: 1px solid #dee2e6;">${message || 'No message provided'}</td>
                                </tr>
                            </table>
                            <br>
                            <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
                        `,
                        Charset: 'UTF-8'
                    }
                }
            }
        };
        
        // Send email
        await ses.sendEmail(emailParams).promise();
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify({ 
                message: 'Email sent successfully!',
                success: true 
            })
        };
        
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify({ 
                error: 'Failed to send email',
                details: error.message 
            })
        };
    }
};
