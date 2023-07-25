import React, {useState} from "react";

export default ({changeToFalse})=>{
   // const [editProfile, setEditProfile] = useState();
    const [password, setPassword] = useState('');


    function handleSubmit(event) {
    event.preventDefault();
    const updateURL = 'http://localhost:5000/update/'+ localStorage.getItem('username')
    fetch(updateURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
       /*标头是一个类似字典的对象，其中包含表示请求标头的键和值。
       Content-Type 标头指定请求正文的媒体类型，在本例中它设置为 application/json 以指示请求正文包含 JSON 数据。
       */
      body: JSON.stringify({
        password,
      }),
       /*正文是请求负载，它包含发送到服务器的数据。在本例中，
       它是一个包含服务器将用于更新用户信息的新用户名和密码的 JSON 对象。*/

    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('You have edit your password successfully!');
          localStorage.setItem("password", data.password)

        }
      })
      .catch(error => {
        alert(error.toString());
      });
  };


  return(
<div style={{  flexDirection: 'column', minHeight: '90vh', alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
  <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
    <div className="login-form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        className="username-password"
        type="password"
        placeholder="New password..."
        value={password}
        onChange={event => setPassword(event.target.value)}
        style={{
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '10px',
          width: '300px',
          marginBottom: '10px',
        }}
      />
      <button
        className="submit"
        type="submit"
        style={{
          backgroundColor: '#1877f2',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          padding: '10px 20px',
          cursor: 'pointer',
          width : "200px"
        }}
      >
        Submit
      </button>
      <button
        className="link-btn"
        onClick={() => changeToFalse()}
        style={{
          backgroundColor: 'transparent',
          color: '#1877f2',
          border: 'none',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        Back
      </button>
    </div>
  </form>
</div>


  )

}

