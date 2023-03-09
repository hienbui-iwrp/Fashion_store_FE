import { apiBranchService, BranchProps, formatTime } from '@/utils'
import axios from 'axios'


export const getBranch = async () => {
  return await apiBranchService
    .get('')
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
    })
}
export const getBranchDetailBff = async (id: any) => {
  let xmls = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<soap:Body>
    <ns1:Body xmlns:ns1="http://xmlns.oracle.com/bpel_process/callBranchService/getBranchDetail">
        <ns1:BranchId>${id}</ns1:BranchId>
    </ns1:Body>
</soap:Body>
</soap:Envelope>`;
  return await
    axios.post('http://localhost:3000/bpel',
      xmls,
      {
        headers:
          { 'Content-Type': 'text/xml' }
      }).then(res => {
        console.log(res);
        const XMLParser = require('react-xml-parser');
        const xml = new XMLParser().parseFromString(res.data);
        // console.log(xml.getElementsByTagName('StatusCode')[0]);
        // console.log(xml.getElementsByTagName('Message')[0]);
        // console.log(xml.getElementsByTagName('Data')[0]);
        return xml.getElementsByTagName('Data')[0];
      }).catch(err => { console.log(err) });
}

export const getBranchDetail = async (id: any) => {
  return await apiBranchService
    .get(`/${id}`)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
    })
}

export const addBranchBff = async (branch: BranchProps) => {
  const record = {
    Name: branch?.name,
    Street: branch?.street,
    Ward: branch?.ward,
    District: branch?.district,
    Province: branch?.province,
    Open: branch?.openTime && formatTime(branch?.openTime) + ':00',
    Close: branch?.closeTime && formatTime(branch?.openTime) + ':00',
  }
  const xmls = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
        <ns1:Body xmlns:ns1="http://xmlns.oracle.com/bpel_process/callBranchService/addBranch">
              <ns1:Name>${branch?.name}</ns1:Name>
              <ns1:Province>${branch?.province}</ns1:Province>
              <ns1:District>${branch?.district}</ns1:District>
              <ns1:Ward>${branch?.ward}</ns1:Ward>
              <ns1:Street>${branch?.street}</ns1:Street>
              <ns1:Open>${branch?.openTime && formatTime(branch?.openTime) + ':00'}</ns1:Open>
              <ns1:Close>${branch?.closeTime && formatTime(branch?.openTime) + ':00'}</ns1:Close>
    </ns1:Body>
</soap:Body>
</soap:Envelope>`
  return await
    axios.post('http://localhost:3000/bpel',
      xmls,
      {
        headers:
          { 'Content-Type': 'text/xml' }
      }).then(res => {
        console.log(res);
        const XMLParser = require('react-xml-parser');
        const xml = new XMLParser().parseFromString(res.data);
        // console.log(xml.getElementsByTagName('StatusCode')[0]);
        // console.log(xml.getElementsByTagName('Message')[0]);
        // console.log(xml.getElementsByTagName('Data')[0]);
        return {
          StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
          Message: xml.getElementsByTagName('Message')[0].value,
        };
      }).catch(err => { console.log(err) });
}

export const addBranch = async (branch: BranchProps) => {
  const record = {
    Name: branch?.name,
    Street: branch?.street,
    Ward: branch?.ward,
    District: branch?.district,
    Province: branch?.province,
    Open: branch?.openTime && formatTime(branch?.openTime) + ':00',
    Close: branch?.closeTime && formatTime(branch?.openTime) + ':00',
  }
  return await apiBranchService
    .post(`/`, record)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
    })
}

export const updateBranchBff = async (id: any, branch: any) => {
  const openTime = new Date(branch?.openTime ?? '')
  const closeTime = new Date(branch?.closeTime ?? '')
  const record = {
    Name: branch?.name,
    Street: branch?.street,
    Ward: branch?.ward,
    District: branch?.district,
    Province: branch?.province,
    Open: branch?.openTime && formatTime(openTime) + ':00',
    Close: branch?.closeTime && formatTime(closeTime) + ':00',
  }
  const xmls = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
      <ns1:Body xmlns:ns1 = "http://xmlns.oracle.com/bpel_process/callBranchService/updateBranch">
        <BranchId>${id}</BranchId>
        <Name>${branch?.name ?? ''}</Name>
        <Province>${branch?.province ?? ''}</Province>
        <District>${branch?.district ?? ''}</District>
        <Ward>${branch?.ward ?? ''}</Ward>
        <Street>${branch?.street ?? ''}</Street>
        <Open>${branch?.openTime && formatTime(openTime) + ':00'}</Open>
        <Close>${branch?.closeTime && formatTime(closeTime) + ':00'}</Close>
      </ns1:Body>
      </soap:Body>
  </soap:Envelope>`
  return await
    axios.post('http://localhost:3000/bpel',
      xmls,
      {
        headers:
          { 'Content-Type': 'text/xml' }
      }).then(res => {
        console.log(res);
        const XMLParser = require('react-xml-parser');
        const xml = new XMLParser().parseFromString(res.data);
        // console.log(xml.getElementsByTagName('StatusCode')[0]);
        // console.log(xml.getElementsByTagName('Message')[0]);
        // console.log(xml.getElementsByTagName('Data')[0]);
        return {
          StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
          Message: xml.getElementsByTagName('Message')[0].value,
        };
      }).catch(err => { console.log(err) });
}

export const updateBranch = async (id: any, branch: any) => {
  const openTime = new Date(branch?.openTime ?? '')
  const closeTime = new Date(branch?.closeTime ?? '')
  const record = {
    Name: branch?.name,
    Street: branch?.street,
    Ward: branch?.ward,
    District: branch?.district,
    Province: branch?.province,
    Open: branch?.openTime && formatTime(openTime) + ':00',
    Close: branch?.closeTime && formatTime(closeTime) + ':00',
  }
  return await apiBranchService
    .put(`/${id}`, record)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
    })
}

export const deleteBranchBff = async (id: any) => {
  const xmls = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
      <ns1:Body xmlns:ns1="http://xmlns.oracle.com/bpel_process/callBranchService/deleteBranch">
          <ns1:BranchId>${id}</ns1:BranchId>
      </ns1:Body>
  </soap:Body>
</soap:Envelope>`
  return await
    axios.post('http://localhost:3000/bpel',
      xmls,
      {
        headers:
          { 'Content-Type': 'text/xml' }
      }).then(res => {
        console.log(res);
        const XMLParser = require('react-xml-parser');
        const xml = new XMLParser().parseFromString(res.data);
        // console.log(xml.getElementsByTagName('StatusCode')[0]);
        // console.log(xml.getElementsByTagName('Message')[0]);
        // console.log(xml.getElementsByTagName('Data')[0]);
        return {
          StatusCode: xml.getElementsByTagName('StatusCode')[0].value,
          Message: xml.getElementsByTagName('Message')[0].value,
        };
      }).catch(err => { console.log(err) });
}

export const deleteBranch = async (id: any) => {
  return await apiBranchService
    .delete(`/${id}`)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.error(error)
    })
}
