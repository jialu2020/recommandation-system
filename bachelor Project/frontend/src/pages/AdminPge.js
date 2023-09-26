import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar";
import Footer from "../footer";
import './AdminPage.css';
import axios from 'axios'; // 导入axios

function AdminPage() {
  const [emailList, setEmailList] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [message, setMessage] = useState('');

  // 获取所有电子邮件地址
  useEffect(() => {
    axios.get('http://localhost:5000/api/get_email_addresses')
      .then((response) => {
        setEmailList(response.data.email_addresses);
      })
      .catch((error) => {
        console.error('获取电子邮件地址失败：' + error.message);
      });
  }, []);

  const handleAddEmail = () => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailRegex.test(newEmail)) {
      setMessage('Please enter a valid email address');
      return;
    }


    axios.post('http://localhost:5000/api/admin_add_email', { address: newEmail })
      .then((response) => {
        // 处理API的响应
        if (response.data.success) {
          setMessage('Add email address successfully：');
          setEmailList([...emailList, newEmail]);
          setNewEmail('');
        } else {
          setMessage('Failed to add email address：' + response.data.message);
        }
      })
      .catch((error) => {
        // 处理错误
        setMessage('Failed to add email address：' + error.message);
      });
  };

  return (
    <div>
      <Navbar /> {/* 保留最初的Navbar */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
            <h1 className="title">Admin Page</h1>
        <div className="admin-page mt20">
          <div className="admin-content">
            <div className="email-input">
              <h1 className="title">Add an email address</h1>
              <div className="input-button-container">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                />
                <button onClick={handleAddEmail}>add</button>
              </div>
            </div>
            {message && <p className="message">{message}</p>}
            <div className="email-list">
              {emailList.map((email, index) => (
                <div className="email-card" key={index}>
                  {email}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer /> {/* 保留最初的Footer */}
    </div>
  );
}

export default AdminPage;
