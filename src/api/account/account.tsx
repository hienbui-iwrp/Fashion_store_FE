import axios from 'axios';

const baseUrl = 'http://localhost:3000'
const accountService = '/bpel-account-service';

export const signIn = async (account: { Username: string, Password: string }) => {
  return await axios
    .post('http://localhost:3000/account-service' + '/sign-in', { ...account })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signInBff = async (account: { Username: string, Password: string }) => {
  let xmls = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
        <ns1:Body xmlns:ns1="http://xmlns.oracle.com/bpel_process/callAccountService/signIn">
              <ns1:Username>${account.Username}</ns1:Username>
              <ns1:Password>${account.Password}</ns1:Password>
    </ns1:Body>
</soap:Body>
</soap:Envelope>
`
  return await
    axios.post(baseUrl + accountService,
      xmls,
      {
        headers:
          { 'Content-Type': 'text/xml' }
      }).then(res => {
        console.log(res);
        const XMLParser = require('react-xml-parser');
        const xml = new XMLParser().parseFromString(res.data);
        console.log('check', xml.getElementsByTagName('Data'));
        return {
          StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
          Message: xml.getElementsByTagName('Message')[0].value,
          Data: xml.getElementsByTagName('Data'),
        };
      }).catch(err => { console.log(err) });
};

export const signUpBff = async (account: { Username: string, Password: string }) => {
  let xmls = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
        <ns1:Body xmlns:ns1="http://xmlns.oracle.com/bpel_process/callAccountService/signIn">
              <ns1:Username>${account.Username}</ns1:Username>
              <ns1:Password>${account.Password}</ns1:Password>
    </ns1:Body>
</soap:Body>
</soap:Envelope>
`
  return await
    axios.post(baseUrl + accountService,
      xmls,
      {
        headers:
          { 'Content-Type': 'text/xml' }
      }).then(res => {
        console.log(res);
        const XMLParser = require('react-xml-parser');
        const xml = new XMLParser().parseFromString(res.data);
        console.log('check', xml.getElementsByTagName('Data'));
        return {
          StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
          Message: xml.getElementsByTagName('Message')[0].value,
          Data: xml.getElementsByTagName('Data'),
        };
      }).catch(err => { console.log(err) });
};

export const getAllAccount = async () => {
  let xmls = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
      <ns1:Body xmlns:ns1="http://xmlns.oracle.com/bpel_process/callAccountService/getListAccount"/>
  </soap:Body>
</soap:Envelope>`
  return await
    axios.post(baseUrl + accountService,
      xmls,
      {
        headers:
          { 'Content-Type': 'text/xml' }
      }).then(res => {
        console.log(res);
        const XMLParser = require('react-xml-parser');
        const xml = new XMLParser().parseFromString(res.data);
        return {
          StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
          Message: xml.getElementsByTagName('Message')[0].value,
          Data: xml.getElementsByTagName('Data'),
        };
      }).catch(err => { console.log(err) });
};
