<!-- @format -->

please follow below steps

heroku----

npx create-react-app@2.x $APP_NAME
cd $APP_NAME
git init
heroku create \$APP_NAME --buildpack mars/create-react-app
git add .
git commit -m "Start with create-react-app"
git push heroku master
heroku open

1 npm install
2 npm start
