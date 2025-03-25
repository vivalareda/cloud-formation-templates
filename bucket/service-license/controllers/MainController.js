const encryptionService = require("../services/EncryptionService");
const request = require("request");
module.exports= {
  validate:(req,res)=>{
    let { key } = req.params;

    if(!key){
      res.status(400).json({ message: 'The key in url is missing' });
    }

    let result={
      "key":key  
    };
    result.valid=encryptionService.validate(key);

    if(result.valid){
      res.json(result);
    }
    else{
      result.message="invalid key";
      res.status(400).json(result);
    }
  },

  generate:(req,res)=>{
    res.send(encryptionService.generate());
  },

  diag:(req,res)=>{
    const config = require("../configs/Config");

    res.json(config);
  },

  meta: async (req,res)=>{
    let metaService="http://169.254.169.254/latest/meta-data";
    let path = req.path.slice(5);

    let options={
      url:metaService+path
    };

    try{
      let token = await getMetadataToken();

      options.headers={"X-aws-ec2-metadata-token":token};

      let {response,body} = await promiseRequest(options);
      res.status(response.statusCode).send(body); 
    }
    catch(err){
      if(err.response){
        res.status(err.response.statusCode).send(err.body); 
      }
      else
        res.status(500).send(JSON.stringify(err));
    }
  }
}

const promiseRequest = function(options){
  return new Promise((resolve,reject)=>{

    request(options, function(error, response, body) {
      if (!error) {
        resolve({response,body});    
      }
      else{
        error.urlRequested=options.url;
        error.body=body;
        error.response=response;
        reject(error);
      }
    });

  });
}

const getMetadataToken=async function(){
  let options={
    url:"http://169.254.169.254/latest/api/token",
    method:"PUT",
    headers:{"X-aws-ec2-metadata-token-ttl-seconds": 21600}
  };
//TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600"` && curl -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/ 

  return promiseRequest(options).then(({res,body})=>{
    return body;
  });
}