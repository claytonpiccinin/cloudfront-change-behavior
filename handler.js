const path = require('path');
const fileExtension = require('./extension.json');

module.exports.changeBehavior = (event, context, callback) => {
  const { request } = event.Records[0].cf;
  const parsedPath  = path.parse(request.uri);
  let prefix = parsedPath.dir.split('/');
  let bypass = fileExtension.extensions.find((obj) => { return obj === path.extname(request.uri)}) || false;
  let customPath = request.origin.custom.path;
  
  const changePrefix = async () => {
  
    if(prefix[1] === ''){
      prefix = await path.join(parsedPath.root, parsedPath.base, '/index.html');
      return prefix; 
    }
    
    if(bypass){
      return request.uri
    } 

    if(customPath === ''){
      prefix = await path.join('/', prefix[1], '/index.html');
      return prefix;
    }

    if(customPath !== '/'){
      prefix = await path.join('/index.html');
      return prefix
    }
    
    prefix = await path.join('/', prefix[1], '/index.html');
    return prefix;
  }
  
  changePrefix().then((data) => {
    request.uri = data  
    callback(null, request);
  })
};