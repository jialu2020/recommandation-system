import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar";
import Footer from "../footer";
import './AdminPage.css';
import axios from 'axios'; // 导入axios

function AdminPage() {
  const [emailList, setEmailList] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('Willkommen zurück zu Indilearn!');
  const [emailContent, setEmailContent] = useState(
    `Hallo liebe/r Schüler/in,
    \nWir vermissen dich! 😊
    \nHeute haben schon [] andere Schüler/in bei Indilearn gelernt. Möchtest du heute auch etwas Neues lernen?
    \nBesuche Indilearn, um tolle Lektionen und Spiele zu entdecken, die dir beim Lernen helfen können. Wir freuen uns, dich wiederzusehen!
    \nViele Grüße,
    \nDein Indilearn-Team`
  );
  const [emailSentMessage, setEmailSentMessage] = useState(null);
  const [todayActiveUsers, setTodayActiveUsers] = useState(null);



  // get all Email address
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/get_email_addresses`)
      .then((response) => {
        setEmailList(response.data.email_addresses);
      })
      .catch((error) => {
        console.error('获取电子邮件地址失败：' + error.message);
      });
  }, []);


  useEffect(() => {
    // 调用API以获取今天的活跃用户数
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/today_active_users`)
      .then((response) => {
        setTodayActiveUsers(response.data.today_active_users);
      })
      .catch((error) => {
        console.error('获取今天的活跃用户数失败：' + error.message);
      });
  }, []);


  const handleAddEmail = () => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailRegex.test(newEmail)) {
      setMessage('Please enter a valid email address');
      return;
    }


    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/admin_add_email`, { address: newEmail })
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

const handleSendEmail = () => {
    // 检查标题和内容是否为空
    if (!subject || !emailContent) {
      setMessage('Please enter a subject and email content');
      return;
    }

    // 构建要发送的数据
    const emailData = {
      subject: subject,
      message: emailContent,
    };

    // 调用API发送电子邮件
     axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/send_email`, emailData)
    .then((response) => {
      if (response.data.success) {
        setEmailSentMessage('Email sent successfully');
      } else {
        setEmailSentMessage('Failed to send email：' + response.data.message);
      }
    })
    .catch((error) => {
      setEmailSentMessage('Failed to send email：' + error.message);
    });
};



   return (
    <div>
      <Navbar />
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

              <div className="active-users-container mt10">
               <p className="active-users-text">Active Users Today: {todayActiveUsers !== null ? todayActiveUsers : 'Loading ...'}</p>
              </div>
            </div>
          </div>
        </div>

          <div className="admin-page mt20">
            <h1 className="title">Compose Email</h1>
            <div className="input-button-container2">
              <input
                className="title-input"
                type="text"
                placeholder="Willkommen zurück zu Indilearn!"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <textarea
                className="content-textarea"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                required
              ></textarea>
              <button onClick={handleSendEmail}>Send Email</button>
            </div>
            {emailSentMessage && <p className="message">{emailSentMessage}</p>}
          </div>

      </div>
      <Footer />
    </div>
  );
}

export default AdminPage;
