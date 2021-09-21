const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyChn3n1SQ5RqfG5Rs9GmQQfHp742IAoQuk",
    authDomain: "pop-a-ballon.firebaseapp.com",
    projectId: "pop-a-ballon",
    storageBucket: "pop-a-ballon.appspot.com",
    messagingSenderId: "449745887068",
    appId: "1:449745887068:web:d9bd1aceb31937e3a42b99",
    measurementId: "G-1VJTZ4JP87"
});

const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
var provider = new firebase.auth.GoogleAuthProvider();

// auth.onAuthStateChanged((user) => {
//     if (user) {
//         console.log(user, "user Loged In");
//     } else {
//         console.log("User Logged Out");
//     }
// });


function showusersignuppassword() {
    var signUserPass = document.getElementById('signUserPass');
    if (signUserPass.type === "password") {
        signUserPass.type = "text"
    } else {
        signUserPass.type = "password"
    }
}
function showloginpassword() {
    var loginpassword = document.getElementById("loginpassword");

    if (loginpassword.type === "password") {
        loginpassword.type = "text";
    } else {
        loginpassword.type = "password";
    }
}
const signUp = () => {
    let email = document.getElementById('signUserEmail').value, pass = document.getElementById('signUserPass').value;
    auth.createUserWithEmailAndPassword(email, pass)
        .then((userCredential) => {
            var user = userCredential.user;
            sendEmailVerification();
            setSignupData(user.uid);
            window.location.href = "./login.html"
        }).catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage);
        });
}

const setSignupData = (id) => {
    let signUserName = document.getElementById('signUserName').value, email = document.getElementById('signUserEmail').value;
    db.collection("users").doc(id).set({
        name: signUserName,
        emil: email,
        key: id,
    }).then(() => {
        console.log("Document successfully written!");
    })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

const signupWithGoogle = () => {
    auth.signInWithPopup(provider)
        .then((result) => {
            var user = result.user;
            setGoogleSignupData(user);
            window.location.href = "./level1.html";
        }).catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage);
        });
}

const setGoogleSignupData = (user) => {
    let id = user.uid;
    let disName = user.displayName;
    let email = user.email;

    console.log(user.uid);
    db.collection("users").doc(`${id}`).set({
        name: disName,
        email: email,
        key: id,
    }).then(() => {
        console.log("Document successfully written!");
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
}

const login = () => {
    let loginnameoremail = document.getElementById('loginnameoremail').value;
    let loginpassword = document.getElementById('loginpassword').value;

    auth.signInWithEmailAndPassword(loginnameoremail, loginpassword)
        .then((userCredential) => {
            var tureOrfalse = userCredential.user.emailVerified
            verifycheck(tureOrfalse);
            authStateListener();
        }).catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage);
        });
}

const verifycheck = (tureOrfalse) => {
    if (tureOrfalse == true) {
        window.location.href = "./level1.html";
    } else {
        alert("First Verify on Your Given Email")
    }
}

const authStateListener = () => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            var uid = user.displayName;
            console.log(user.uid);
        } else {
            console.log("no user");
        }
    });
}

const logout = () => {
    auth.signOut().then(() => {
        window.location.href = "./login.html"
    }).catch((error) => {
        console.log(error);
    });
}


function sendEmailVerification() {
    auth.currentUser.sendEmailVerification()
        .then(() => {
            console.log("send");
        });

}
