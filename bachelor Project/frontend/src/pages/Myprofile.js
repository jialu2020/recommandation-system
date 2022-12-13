function Myprofile(){

  class User {
    constructor(firstname,lastname) {
      this.firstname=firstname
      this.lastname=lastname
    }
  }
   const u1 = new User('Jia','Lu')


  function getfirstname(user){
    return user.firstname;
  }
  function getlastname(user){
    return user.lastname;
  }


  return(


<div>
  <h1 class = "title">this is my Profile</h1>


  <ul>
   <li>firstname:</li>

    <li>lastname:</li>
  </ul>
</div>

)



}
export default Myprofile

