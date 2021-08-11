const aws = require('aws-sdk');
const ses = new aws.SES();

exports.handler = async event => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {
      const userName = streamedItem.dynamodb.NewImage.name.S;
      const userEmail = streamedItem.dynamodb.NewImage.email.S;
      const subject = streamedItem.dynamodb.NewImage.subject.S;
      const message = streamedItem.dynamodb.NewImage.message.S;

      await ses
        .sendEmail({
          Destination: {
            ToAddresses: [userEmail]
          },
          Source: `JBA MHO <${process.env.SES_EMAIL}>`,
          Message: {
            Subject: { Data: subject },
            Body: {
              Text: { Data: message }
            }
          }
        })
        .promise();
    }
  }

  return { status: 'done' };
};
