import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const getMPesaAccessToken = async () => {
  try {
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization:
            'Basic eVRKMEFBVk9OcExubGJBTXpHSzZ6eFpleE1UeEJPbkoycUdLdHV1Wk1HSlJSVUZEOmM1NFFpSjlrN0FQSVRqWjZVVlFCeEJCSnZnRVFlWGMzbFBiQldvMFQ0U3ExSzJXOVZqeW1ycWhqTW0zNlFoN0g=',
        },
      },
    );
    return response.data.access_token;
  } catch (error) {
    throw new Error(`MPesa authentication failed: ${error.message}`);
  }
};

// MPesa Payment Initiation
export const initiateMPesaPayment = async (order, phoneNumber) => {
  try {
    const accessToken = await getMPesaAccessToken();
    const transactionId = uuidv4(); // Unique identifier for the transaction

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: '174379',
        Password: '*q4nbkUeBU4pinw',
        Timestamp: new Date().toISOString().replace(/[-T:.Z]/g, ''),
        TransactionType: 'CustomerPayBillOnline',
        Amount: order.totalPrice,
        PartyA: phoneNumber,
        PartyB: '174379',
        PhoneNumber: phoneNumber,
        CallBackURL: 'https://localhost:5000/api/orders/mpesa-callback',
        AccountReference: transactionId,
        TransactionDesc: `Payment for Order ${order._id}`,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(`MPesa payment initiation failed: ${error.message}`);
  }
};

// MPesa Payment Validation
export const validateMPesaPayment = async (transactionId) => {
  try {
    const accessToken = await getMPesaAccessToken();

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/receipt/v1/query',
      {
        TransactionID: transactionId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.Status === 'SUCCESS';
  } catch (error) {
    throw new Error(`MPesa payment validation failed: ${error.message}`);
  }
};
