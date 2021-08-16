const aws = require('aws-sdk');
const ses = new aws.SES();

exports.handler = async event => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {
      const userName = streamedItem.dynamodb.NewImage.name.S;
      const userEmail = streamedItem.dynamodb.NewImage.email.S;
      const userPhone = streamedItem.dynamodb.NewImage.phone.S;
      const dodId = streamedItem.dynamodb.NewImage.dodId.N;
      const dob = streamedItem.dynamodb.NewImage.dob.S;
      const sex = streamedItem.dynamodb.NewImage.sex.S;
      const rank = streamedItem.dynamodb.NewImage.rank.S;
      const dateOfRank = streamedItem.dynamodb.NewImage.dateOfRank.S;
      const dateEnteredMilitary =
        streamedItem.dynamodb.NewImage.dateEnteredMilitary.S;
      const wing = streamedItem.dynamodb.NewImage.wing.S;
      const unit = streamedItem.dynamodb.NewImage.unit.S;
      const officeSymbol = streamedItem.dynamodb.NewImage.officeSymbol.S;
      const flight = streamedItem.dynamodb.NewImage.flight.S;
      const dutyPhone = streamedItem.dynamodb.NewImage.dutyPhone.S;
      const supervisorName = streamedItem.dynamodb.NewImage.supervisorName.S;
      const supervisorPhone = streamedItem.dynamodb.NewImage.supervisorPhone.S;
      const sponsorName = streamedItem.dynamodb.NewImage.sponsorName.S;
      const sponsorPhone = streamedItem.dynamodb.NewImage.sponsorPhone.S;
      const carMake = streamedItem.dynamodb.NewImage.carMake.S;
      const carModel = streamedItem.dynamodb.NewImage.carModel.S;
      const carYear = streamedItem.dynamodb.NewImage.carYear.S;
      const licensePlateNumber =
        streamedItem.dynamodb.NewImage.licensePlateNumber.S;
      const expectedArrivalDate =
        streamedItem.dynamodb.NewImage.expectedArrivalDate.S;
      const subject = 'There is a new incoming airman!';

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
                <title>There is a new incoming airman!</title>
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
                      >There is a new incoming airman expected to arrive on
                      <span style="font-weight: bold">${expectedArrivalDate}</span></span
                    >
                    <ul style="list-style: none">
                      <li><span style="font-weight: bold">Name: </span>${userName}</li>
                      <li><span style="font-weight: bold">Email: </span>${userEmail}</li>
                      <li><span style="font-weight: bold">Phone: </span>${userPhone}</li>
                      <li><span style="font-weight: bold">DOD ID: </span>${dodId}</li>
                      <li><span style="font-weight: bold">DOB: </span>${dob}</li>
                      <li><span style="font-weight: bold">Sex: </span>${sex}</li>
                      <li><span style="font-weight: bold">Rank: </span>${rank}</li>
                      <li
                        ><span style="font-weight: bold">Date Of Rank: </span
                        >${dateOfRank}</li
                      >
                      <li
                        ><span style="font-weight: bold">Date Entered Military: </span
                        >${dateEnteredMilitary}</li
                      >
                      <li><span style="font-weight: bold">Wing: </span>${wing}</li>
                      <li><span style="font-weight: bold">Unit: </span>${unit}</li>
                      <li
                        ><span style="font-weight: bold">Office Symbol: </span
                        >${officeSymbol}</li
                      >
                      <li><span style="font-weight: bold">Flight: </span>${flight}</li>
                      <li
                        ><span style="font-weight: bold">Duty Phone: </span>${dutyPhone}</li
                      >
                      <li
                        ><span style="font-weight: bold">Supervisor Name: </span
                        >${supervisorName}</li
                      >
                      <li
                        ><span style="font-weight: bold">Supervisor Phone: </span
                        >${supervisorPhone}</li
                      >
                      <li
                        ><span style="font-weight: bold">Sponsor Name: </span
                        >${sponsorName}</li
                      >
                      <li
                        ><span style="font-weight: bold">Sponsor Phone: </span
                        >${sponsorPhone}</li
                      >
                      <li><span style="font-weight: bold">Car Make: </span>${carMake}</li>
                      <li><span style="font-weight: bold">Car Model: </span>${carModel}</li>
                      <li><span style="font-weight: bold">Car Year: </span>${carYear}</li>
                      <li
                        ><span style="font-weight: bold">License Plate Number: </span
                        >${licensePlateNumber}</li
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
