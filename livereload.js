console.log('heyo');
document.write('<script src=\"http://'
+ (location.host || 'localhost').split(':')[0]
+ ':" + port + "/livereload.js?snipver=1\"><\\/script>')
