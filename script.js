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
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Lista de correos permitidos
const allowedEmails = ["usuario1@gmail.com", "usuario2@gmail.com"]; // Modifica con tus correos

// Función para verificar si el usuario está permitido
const checkUserAccess = (email) => {
    if (allowedEmails.includes(email)) {
        window.location.href = "index.html";
    } else {
        alert("Acceso denegado.");
        signOut(auth);
    }
};

// Autenticación con Google
const googleBtn = document.getElementById("login-google-btn");
if (googleBtn) {
    googleBtn.addEventListener("click", () => {
        signInWithPopup(auth, provider)
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

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => checkUserAccess(userCredential.user.email))
            .catch((error) => alert("Error en login: " + error.message));
    });
}

// Registro de usuario (para cuentas de correo y contraseña)
const registerLink = document.getElementById("register-link");
if (registerLink) {
    registerLink.addEventListener("click", () => {
        const email = prompt("Ingresa tu correo:");
        const password = prompt("Ingresa tu contraseña (mínimo 6 caracteres):");

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Cuenta creada con éxito. Ahora inicia sesión.");
            })
            .catch((error) => alert("Error en registro: " + error.message));
    });
}

// Verificar autenticación al cargar `index.html`
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (allowedEmails.includes(user.email)) {
            document.getElementById("user-info").textContent = `Correo: ${user.email}`;
        } else {
            alert("Acceso denegado. Contacta al administrador.");
            signOut(auth);
            window.location.href = "login.html";
        }
    } else {
        window.location.href = "login.html";
    }
});

// Cerrar sesión
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        signOut(auth).then(() => {
            window.location.href = "login.html";
        });
    });
}
