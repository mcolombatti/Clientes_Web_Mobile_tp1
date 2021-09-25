 const d = document;
 const firebaseConfig = {
    apiKey: "AIzaSyDlmxtrIl3TI1DTJT6AW-lwBlmMhuYFn5c",
    authDomain: "clienteswebmobile-noche.firebaseapp.com",
    databaseURL: "https://clienteswebmobile-noche-default-rtdb.firebaseio.com",
    projectId: "clienteswebmobile-noche",
    storageBucket: "clienteswebmobile-noche.appspot.com",
    messagingSenderId: "480976720676",
    appId: "1:480976720676:web:965538416f033307de99b1"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Pedimos la conexión a Firestore y a Authentication.
  const db = firebase.firestore();
  const auth = firebase.auth();
  
  const appConsole = document.getElementById('appConsole');
  
  const authState = {
      logged: false,
      user: null,
      /**
       * Actualiza los contenidos de los elementos que requieren valores del estado de autenticación actual.
       */
      updateDisplay() {
          // Actualizamos los datos del usuario autenticado.
          document
              .querySelectorAll('.auth-user-email')
              .forEach(item => {
                  let displayName = authState.user.displayName || authState.user.email;
                  item.innerHTML = authState.logged ? displayName : '';
              });
  
          // profile.fields.form.displayName.value = authState.user.displayName;
          profile.setDisplayName(authState.user.displayName);
      }
  }
  
  // Detección del estado del usuario en Firebase.
  auth.onAuthStateChanged(user => {
      if(user) {
          // Está autenticado.
          authState.logged = true;
          authState.user = user;
          console.log("Usuario autenticado: ", user);
          appConsole.innerHTML = "Usuario autenticado: " + user.email;
          router.switchToSection('chat');
      } else {
          // No está autenticado.
          authState.logged = false;
          authState.user = null;
          appConsole.innerHTML = "Usuario no autenticado";
          router.switchToSection('auth');
      }
      authState.updateDisplay();
  });
  
  const authLogoutBtn = document.getElementById('authLogoutBtn');
  authLogoutBtn.addEventListener('click', function() {
      // Cerramos sesión en Firebase.
      auth.signOut();
  });
  
  /*
   |--------------------------------------------------------------------------
   | Routing
   |--------------------------------------------------------------------------
   */
  const router = {
      sections: {
          auth: document.getElementById('section-auth'),
          chat: document.getElementById('section-chat'),
          profile: document.getElementById('section-profile'),
      },
      active: null,
      /**
       * Pone visible la sección pedida, ocultando todas las demás.
       *
       * @param {string} name - El nombre de la sección.
       */
      switchToSection(name) {
          for(const key in router.sections) {
              if(key === name) {
                  // Es la sección pedida, así que la hacemos visible.
                  router.sections[key].classList.remove('d-none');
              } else {
                  // ... a todas las demás las ocultamos.
                  router.sections[key].classList.add('d-none');
              }
          }
      },
      /**
       * Inicializa el funcionamiento de los links para la navegación del router.
       */
      initLinks() {
          document
              .querySelectorAll('.router-link-to')
              .forEach(item => {
                  item.addEventListener('click', function(ev) {
                      ev.preventDefault();
                      const section = this.getAttribute('data-section-id');
                      router.switchToSection(section);
                  });
              });
      },
      /**
       * Inicializa el router.
       */
      init() {
          // Inicializamos los links
          router.initLinks();
      }
  }
  
  router.init();
  
  /*
   |--------------------------------------------------------------------------
   | Login
   |--------------------------------------------------------------------------
   */
  const login = {
      elems: {
          console: document.getElementById('authLoginConsole'),
          form: document.getElementById('authLoginForm'),
      },
      fields: {
          form: {
              email: document.getElementById('authLoginEmail'),
              password: document.getElementById('authLoginPassword'),
          }
      },
      init: () => {
          login.elems.form.addEventListener('submit', function(ev) {
              ev.preventDefault();
              console.log("Enviando el form...");
              const {email, password} = login.fields.form;
              // TODO: Validar...
              auth
                  .signInWithEmailAndPassword(email.value, password.value)
                  .then(credentials => {
                      const user = credentials.user;
                      console.log(user);
                      login.elems.console.innerHTML = `¡Bienvenido/a ${user.email}!`;
                  })
                  .catch(err => {
                      console.log(err);
                      login.elems.console.innerHTML = err;
                  });
          });
      }
  };
  
  login.init();
  
  /*
   |--------------------------------------------------------------------------
   | Register
   |--------------------------------------------------------------------------
   */
  const register = {
      elems: {
          console: document.getElementById('authRegisterConsole'),
          form: document.getElementById('authRegisterForm'),
      },
      fields: {
          form: {
              email: document.getElementById('authRegisterEmail'),
              password: document.getElementById('authRegisterPassword'),
          }
      },
      init: () => {
          register.elems.form.addEventListener('submit', function(ev) {
              ev.preventDefault();
              console.log("Enviando el form...");
              const {email, password} = register.fields.form;
              // TODO: Validar...
              auth
                  .createUserWithEmailAndPassword(email.value, password.value)
                  .then(credentials => {
                      const user = credentials.user;
                      console.log(user);
                      register.elems.console.innerHTML = `¡Bienivedo/a ${user.email}!`;
                  })
                  .catch(err => {
                      console.log(err);
                      register.elems.console.innerHTML = err;
                  });
          });
      }
  };
  
  register.init();
  
  /*
   |--------------------------------------------------------------------------
   | Profile
   |--------------------------------------------------------------------------
   */
  const profile = {
      elems: {
          form: document.getElementById('profileForm'),
          console: document.getElementById('profileConsole'),
      },
  
      fields: {
          form: {
              displayName: document.getElementById('profileDisplayName'),
          },
      },
  
      /**
       * Setea el valor del campo del perfil para "Nombre de usuario".
       *
       * @param {string|null} newName
       */
      setDisplayName(newName) {
          profile.fields.form.displayName.value = newName;
      },
  
      /**
       * Inicializa la clase.
       */
      init: () => {
          profile.elems.form.addEventListener('submit', function(ev) {
              ev.preventDefault();
              auth.currentUser.updateProfile({
                  displayName: profile.fields.form.displayName.value,
              })
                  .then(() => {
                      profile.elems.console.innerHTML = `Nombre de usuario actualizado correctamente a ${profile.fields.form.displayName.value}`;
                      // Pedimos al state de autenticación que actualice los datos a mostrar.
                      authState.updateDisplay();
                  })
                  .catch(err => {
                      console.log(err);
                      profile.elems.console.innerHTML = err;
                  });
          });
      }
  };
  
  profile.init();
  
  /*
   |--------------------------------------------------------------------------
   | Chat
   |--------------------------------------------------------------------------
   */
  const chat = {
      ref: db.collection('chat'),
  
      elems: {
          messages: document.getElementById('chatMessages'),
          form: document.getElementById('chatForm'),
      },
  
      fields: {
          form: {
              user: document.getElementById('user'),
              message: document.getElementById('message'),
          },
      },
  
      lastTimestamp: null,
  
      startTimestamp: null,
  
      /**
       * Graba un mensaje en el chat.
       */
      // Vamos a migrar la función a trabajar con las keywords 'async' y 'await'.
      // 'async' es un modificador que le podemos asignar a la definición de una función.
      // Hacerlo implica 2 cosas:
      // 1. JS garantiza que el retorno de la función es una Promise. Si no lo es, envuelve al valor retornado
      //      en una nueva promesa.
      // 2. Me permite el uso de la keyword 'await' en su interior.
      sendMessage: async () => {
          // 'await', por su lado, se puede utilizar delante de cualquier ejecución de una promesa, o
          //  equivalente.
          // await hace 2 cosas:
          // 1. Detiene la ejecución de la función hasta que la promesa se complete.
          // 2. Retorna como resultado el valor del "resolve" de la promesa.
          // Para atrapar el error, reemplazamos el método "catch" con un try/catch común.
          try {
              const docRef = await chat.ref.add({
                  // user: chat.fields.form.user.value,
                  user: authState.user.displayName || authState.user.email,
                  message: chat.fields.form.message.value,
                  // Guardamos la fecha y hora actual de creación, usando el Timestamp de Firebase.
                  // Nota: No podemos guardar un objeto Date().
                  created_at: firebase.firestore.Timestamp.now(),
              });
              console.log('El documento se creó con éxito. ', docRef);
              // chat.fields.form.user.value = '';
              chat.fields.form.message.value = '';
          } catch(err) {
              console.error('Error al tratar de grabar el mensaje: ', err);
          }
      },
  
      // sendMessage: () => {
      //     chat.ref.add({
      //         hugo: chat.fields.form.user.value,
      //         paco: chat.fields.form.message.value,
      //     }).then(docRef => {
      //         console.log('El documento se creó con éxito. ', docRef);
      //         chat.fields.form.user.value = '';
      //         chat.fields.form.message.value = '';
      //     }).catch(err => {
      //         console.error('Error al tratar de grabar el mensaje: ', err);
      //     });
      // },
      /**
       * Define el listener para cargar los mensajes en tiempo real.
       */
      listenForIncomingMessages: () => {
          console.log("Listening...");
          // Ordenamos los resultados por la fecha de creación.
          let startTimestamp = firebase.firestore.Timestamp.fromDate(chat.startTimestamp);
          chat
              .ref
              .where('created_at', '>=', startTimestamp)
              .orderBy('created_at', 'desc')
              .onSnapshot(querySnapshot => {
                  chat.elems.messages.innerHTML = querySnapshot
                      .docs
                      .map(doc => `<p class='mb-3'><b>${doc.data().user}</b>: ${doc.data().message}</p>`)
                      .reverse()
                      .join('');
              });
      },
  
      /**
       * Carga los primeros mensajes del chat.
       */
      loadInitialData: () => {
          chat
              .ref
              .orderBy('created_at', 'desc')
              .limit(10)
              .get()
              .then(querySnapshot => {
                  const docs = querySnapshot.docs;
  
                  // Guardamos los timestamps para traer en el onSnapshot los mensajes a partir de esa hora.
                  chat.startTimestamp = docs[docs.length - 1].data().created_at.toDate();
                  chat.lastTimestamp = docs[0].data().created_at.toDate();
  
                  chat.elems.messages.innerHTML = docs
                      .map(doc => `<p class='mb-3'><b>${doc.data().user}</b>: ${doc.data().message}</p>`)
                      .reverse()
                      .join('');
  
                  // Empezamos a escuchar los nuevos mensajes.
                  chat.listenForIncomingMessages();
              });
      },
  
      /**
       * Inicializa la clase.
       */
      init: () => {
          // Ahora definimos el evento del form, y llamamos al listener de los mensajes. :)
          chat.elems.form.addEventListener('submit', function(ev) {
              ev.preventDefault();
              chat.sendMessage();
          });
  
          chat.loadInitialData();
      }
  };
  
  chat.init();
  