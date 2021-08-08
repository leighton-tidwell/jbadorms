/* Amplify Params - DO NOT EDIT
	API_JBADORMS_GRAPHQLAPIIDOUTPUT
	API_JBADORMS_USERSTABLE_ARN
	API_JBADORMS_USERSTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk');
const ddb = new aws.DynamoDB();

exports.handler = async (event, context, callback) => {
  const cognito = new aws.CognitoIdentityServiceProvider();
  console.log(event.request.userAttributes);
  const groupParams = {
    GroupName: 'user',
    UserPoolId: event.userPoolId,
    Username: event.userName
  };

  const params = {
    Item: {
      id: { S: event.request.userAttributes.sub },
      email: { S: event.request.userAttributes.email },
      name: { S: event.request.userAttributes.name },
      phone: { S: event.request.userAttributes.phone_number },
      rank: { S: '' },
      dormbuilding: { S: '' },
      dormroom: { S: '' },
      verified: { BOOL: false }
    },
    TableName: process.env.API_JBADORMS_USERSTABLE_NAME
  };

  try {
    await ddb.putItem(params).promise();
    await cognito.adminAddUserToGroup(groupParams).promise();
    callback(null, event);
  } catch (error) {
    callback(error, event);
    console.log('Error: ', error);
  }
};
