// eslint-disable-next-line no-unused-vars
import React from 'react'
import Tabs from '../../assets/images/tabs.png';
import { Button, Divider } from 'antd';
import { Input } from 'antd';
import { HomeOutlined, HistoryOutlined, MoreOutlined } from '@ant-design/icons';
import { MdDashboard, MdSearch } from "react-icons/md";
import { Link } from 'react-router-dom';
import RajLogo from '../../assets/images/raj.png';

function WebView() {

  return (
    <div className='row'>
      <div className='col-12 d-flex my-1 align-items-center border-bottom pb-1 px-3'>
        <Link to='/'>
          <Button type="text" shape="circle" icon={<HomeOutlined />} className='border mx-1' />
        </Link>
        <Button type="text" shape="circle" icon={<MdDashboard />} className='border mx-1 d-flex justify-content-center align-items-center' />
        <Input
          addonBefore="https://"
          placeholder="google.com"
          allowClear
          addonAfter={<MdSearch size={20} />}
          className='rounded-pill'
        />
        <Button type="text" shape="circle" icon={<HistoryOutlined spin />} className='border mx-1' />
        <Button type="text" shape="circle" icon={<MoreOutlined style={{ fontWeight: 900 }} />} className='border mx-1' />
      </div>
      <div className='col-12 text-center position-relative'>
        <img src={RajLogo} alt="phq" className='w-25' style={{ aspectRatio: '3/2', objectFit: 'contain' }} />
        <img src='https://police.rajasthan.gov.in/uploads/rj_logo_01f666f4b4.png' className='position-absolute' style={{ width: 65, left: '48%', top: '35%' }} />
      </div>
      <div className='d-flex justify-content-center mb-4 mt-3'>
        <input className='form-control rounded-pill w-50 py-3' />
      </div>
      <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}><span className='badge rounded-pill border text-dark py-2'>Recently</span></Divider>
      <div className='container px-1 px-md-5 mt-4'>
        <div className='row'>
          <div className='col-12 col-md-3'>
            <Link to='/web/example'>
              <div className='card shadow'>
                <div className='card-body text-center py-4'>
                  <img src='https://i4c.mha.gov.in/assets/images/final-i4c%20Logo-big-size.png' className='w-50' />
                  <Divider />
                  <h6 className='mt-2'>Indian Cybercrime Coordination <br />Centre (I4C)</h6>
                </div>
              </div>
            </Link>
          </div>
          <div className='col-12 col-md-3'>
            <Link to='/'>
              <div className='card shadow'>
                <div className='card-body text-center py-4'>
                  <img src='https://i4c.mha.gov.in/assets/images/final-i4c%20Logo-big-size.png' className='w-50' />
                  <Divider />
                  <h6 className='mt-2'>Indian Cybercrime Coordination <br />Centre (I4C)</h6>
                </div>
              </div>
            </Link>
          </div>
          <div className='col-12 col-md-3'>
            <Link to='/'>
              <div className='card shadow'>
                <div className='card-body text-center py-4'>
                  <img src='https://i4c.mha.gov.in/assets/images/final-i4c%20Logo-big-size.png' className='w-50' />
                  <Divider />
                  <h6 className='mt-2'>Indian Cybercrime Coordination <br />Centre (I4C)</h6>
                </div>
              </div>
            </Link>
          </div>
          <div className='col-12 col-md-3'>
            <Link to='/'>
              <div className='card shadow'>
                <div className='card-body text-center py-4'>
                  <img src='https://i4c.mha.gov.in/assets/images/final-i4c%20Logo-big-size.png' className='w-50' />
                  <Divider />
                  <h6 className='mt-2'>Indian Cybercrime Coordination <br />Centre (I4C)</h6>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebView