// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCJsXX82SbEHk_fENSgpGciGa5tzT_DgnY",
    authDomain: "users-be7d6.firebaseapp.com",
    projectId: "users-be7d6",
    storageBucket: "users-be7d6.firebasestorage.app",
    messagingSenderId: "910561608325",
    appId: "1:910561608325:web:95002dfd26dbea1a02dfec"
  };

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Lista de correos permitidos
const allowedEmails = ["usuario1@gmail.com", "usuario2@gmail.com"]; // Modifica con tus correos

// Función para verificar si el usuario está permitido
const checkUserAccess = (email) => {
    if (allowedEmails.includes(email)) {
        // Usuario permitido, carga la página
        document.getElementById("user-info").textContent = `Correo: ${email}`;
    } else {
        alert("Acceso denegado.");
        signOut(auth).then(() => {
            window.location.href = "login.html"; // Redirigir al login
        });
    }
};

// Verificar autenticación al cargar `index.html`
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // El usuario está autenticado
        checkUserAccess(user.email);
    } else {
        // No hay usuario autenticado, redirige a login
        window.location.href = "login.html";
    }
});

// Autenticación con Google
const googleBtn = document.getElementById("login-google-btn");
if (googleBtn) {
    googleBtn.addEventListener("click", () => {
        firebase.auth().signInWithPopup(provider)
            .then((result) => checkUserAccess(result.user.email))
            .catch((error) => console.error("Error en login:", error));
    });
}

// Autenticación con Email y Contraseña
const emailBtn = document.getElementById("login-email-btn");
if (emailBtn) {
    emailBtn.addEventListener("click", () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => checkUserAccess(userCredential.user.email))
            .catch((error) => alert("Error en login: " + error.message));
    });
});

// Cerrar sesión
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        firebase.auth().signOut().then(() => {
            window.location.href = "login.html"; // Redirigir al login después de cerrar sesión
        }).catch((error) => {
            console.error("Error al cerrar sesión:", error);
        });
    });
}
