#create simple web server to deliver static content using connect module

connect = require('connect')

app = connect.createServer()
#static files available directly in browser.  
#EG localhost:8080/public/assets/myfile.file
app.use(connect.static(__dirname))
app.use(connect.logger())
app.listen(8080)
