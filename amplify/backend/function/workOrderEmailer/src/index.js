const aws = require('aws-sdk');
const ses = new aws.SES();

exports.handler = async event => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {
      const userName = streamedItem.dynamodb.NewImage.name.S;
      const userPhone = streamedItem.dynamodb.NewImage.phone.S;
      const userRank = streamedItem.dynamodb.NewImage.rank.S;
      const userBuilding = streamedItem.dynamodb.NewImage.building.S;
      const userRoom = streamedItem.dynamodb.NewImage.roomNumber.S;
      const urgency = streamedItem.dynamodb.NewImage.urgency.S;
      const requestType = streamedItem.dynamodb.NewImage.requestType.S;
      const problemDescription = streamedItem.dynamodb.NewImage.description.S;
      const permissionGranted = streamedItem.dynamodb.NewImage.permission.BOOL;
      const escortUnderstood = streamedItem.dynamodb.NewImage.escort.BOOL;
      const securingItems =
        streamedItem.dynamodb.NewImage.securingYourItems.BOOL;
      const subject = 'A new work order request has been submitted!';

      await ses
        .sendEmail({
          Destination: {
            ToAddresses: [process.env.DEST_EMAIL]
          },
          Source: `JBA MHO <${process.env.SES_EMAIL}>`,
          Message: {
            Subject: { Data: subject },
            Body: {
              Html: {
                Data: `<html>
                <head>
                  <title>A new work order has been submitted!</title>
                  <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
                  <style>
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
                    body {
                      font-family: 'Poppins', sans-serif;
                    }
                  </style>
                </head>
                <body
                  style="
                    margin: 0;
                    padding: 0;
                    font-family: Poppins;
                    background-color: #051a2c;
                    color: white;
                  "
                >
                  <div style="width: 100%">
                    <div
                      style="
                        text-align: center;
                        font-size: 2em;
                        font-weight: 800;
                        background-color: #04121e;
                        width: 100%;
                        color: white;
                        padding: 0.5em;
                      "
                      >JBA MHO</div
                    >
                    <div style="padding: 1em">
                      <span style="font-size: 1.2em"
                        >A new work order has been submitted!</span
                      >
                      <ul style="list-style: none">
                        <li><span style="font-weight: bold">Name: </span>${userName}</li>
                        <li><span style="font-weight: bold">Phone: </span>${userPhone}</li>
                        <li><span style="font-weight: bold">Rank: </span>${userRank}</li>
                        <li><span style="font-weight: bold">Building: </span>${userBuilding}</li>
                        <li><span style="font-weight: bold">Room: </span>${userRoom}</li>
                        <li
                          ><span style="font-weight: bold">How urgent is your repair: </span
                          >${urgency}</li
                        >
                        <li
                          ><span style="font-weight: bold">Request Type: </span
                          >${requestType}</li
                        >
                        <li
                          ><span style="font-weight: bold">Description of problem: </span
                          >${problemDescription}</li
                        >
                        <li
                          ><span style="font-weight: bold">
                            I give permission for access to my room in all matters related to
                            maintenance, health and welfare, safety and fire inspections,
                            cable and internet services: </span
                          >${permissionGranted}</li
                        >
                        <li
                          ><span style="font-weight: bold">
                            I understand that an escort may or may not be provided by the UH
                            Staff and there may be a single individual entering my room: </span
                          >${escortUnderstood}</li
                        >
                        <li
                          ><span style="font-weight: bold">
                            I understand that by granting access, I am responsible for
                            securing any personal belongings and valuables: </span
                          >${securingItems}</li
                        >
                      </ul>
                    </div>
                  </div>
                </body>
              </html>              
            `
              }
            }
          }
        })
        .promise();
    }
  }

  return { status: 'done' };
};
