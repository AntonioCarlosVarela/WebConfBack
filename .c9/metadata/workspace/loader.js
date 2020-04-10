{"changed":false,"filter":false,"title":"loader.js","tooltip":"/loader.js","value":"const app = require('./server');\nconst router = require('./routes/main.route');\nconst cookieParser = require('cookie-parser');\nconst passport = require('passport');\nconst session = require('express-session');\nconst expressSanitizer = require('express-sanitizer');\nconst bodyParser = require('body-parser');\nconst models = require(\"./models/\");\nconst expressValidator = require('express-validator'); \n\napp.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));\napp.use(expressSanitizer());\napp.use(cookieParser());\napp.set('trust proxy', 1);\napp.use(session({\n  secret: 'webbookfca',\n  resave: false,\n  saveUninitialized: true,\n  cookie: {\n    secure: true,\n    maxAge: 60000,\n    httpOnly: true,\n  }\n}));\napp.use(expressValidator());\napp.use(function(req, res, next) {\n  // check if session exists\n  if (global.sessData === undefined) {\n    global.sessData = req.session;\n    global.sessData.ID = req.sessionID;\n  }\n  else { // yes, cookie was already present\n    console.log('session exists', global.sessData.ID);\n  }\n  next();\n});\n\napp.use(passport.initialize());\napp.use(passport.session()); // persistent login sessions\nrequire('./routes/auth.route.js')(app, passport);\nrequire('./config/passport/passport.js')(passport, models.user);\n//Sync Database\nmodels.sequelize.sync().then(function() {\n  console.log('Nice! Database looks fine');\n\n}).catch(function(err) {\n  console.log(err, \"Something went wrong with the Database Update!\");\n});\napp.use('/', router);\nmodule.exports = app;\n","undoManager":{"mark":-1,"position":-1,"stack":[]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":48,"column":0},"end":{"row":48,"column":21},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1534062545149}