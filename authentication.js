const firebaseConfig = {
    apiKey: "Put Your Credential",
    authDomain: "Put Your Credential",
    projectId: "Put Your Credential",
    storageBucket: "Put Your Credential",
    messagingSenderId: "Put Your Credential",
    appId: "Put Your Credential"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });

  const myModel = document.querySelectorAll('.modal')


  async function signup(e){
      e.preventDefault();
      let email = document.getElementById('SignUpEmail');
      let password = document.getElementById('SignUpPassword');
      try{
          let result = await firebase.auth().createUserWithEmailAndPassword(email.value,password.value);
          await result.user.updateProfile({
            displayName: "User"
          })
        //   createUserCollection(result.user);
          await result.user.sendEmailVerification()
          console.log(result);
          M.toast({html: `Welcome ${result.user.email}`,classes:'green'})

      }
      catch(error){
          console.log(error);
          M.toast({html: error.message,classes:'red'})
      }
      email.value = "";
      password.value = "";
      M.Modal.getInstance(myModel[0]).close();

  }

  async function Login(e){
    e.preventDefault();
    let email = document.getElementById('LoginEmail');
    let password = document.getElementById('LoginPassword');
    try{
        let result = await firebase.auth().signInWithEmailAndPassword(email.value,password.value);
        console.log(result);
        M.toast({html: `Welcome ${result.user.email}`,classes:'green'})

    }
    catch(error){
        console.log(error);
        M.toast({html: error.message,classes:'red'})
    }
    email.value = "";
    password.value = "";
    M.Modal.getInstance(myModel[1]).close();

}

function logOut(){
    firebase.auth().signOut()
}

const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
     console.log(user);
    } else {
        console.log("SignOut SuccessFully!!");
        M.toast({html: "SignOut SuccessFully!!",classes:'green'})
      
    }
  });


 async function loginGoogle()
  {
      try{
        var provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider)
        console.log(result);
      }
      catch(err){
          console.log(err);
      }
  }



  
  
  
  