const express = require('express');
var soap = require('soap');

const soap14Router = express.Router();

soap14Router.get('/soap1', (req,res) => {    
    var barcode = '0810047210061';
    var wsdlUrl = 'http://www.searchupc.com/service/UPCSearch.asmx?wsdl';
    soap.createClient(wsdlUrl, function(err, soapClient){
        
        if (err) { 
            console.log('phaattu ',err); 
            return res.status(500).json(err); 
        }
        soapClient.GetProduct({ upc : barcode,  accesstoken : '7C8488AE-243C-47DD-B672-680EC6F7BE4A'}, function(err, result) {
          if (err) { console.log('malli phattu ',err); return res.status(500).json(err); }
          return res.json(result);  
        });    
    });
});

/*
    To make a SOAP request a WSDL file is must. 
    If you don’t have a WSDL file ask the 3rd party vendor to provide you the WSDL file.
    - Just like how 3rd party provides ---> API documentation for REST service
    - 3rd party provides -----------------> WSDL file (which contains XML schema)
    
    You must need diffrent WSDL files for different environments. ie development, staging, production.
    
*/


module.exports = soap14Router;