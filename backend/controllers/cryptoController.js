const https = require('https');

const indexAssetNames =  (req,res)=>{
    //send http request to external api
    //https://data.messari.io/api/v1/assets

    //declare request options 
    let options = {
        host : 'data.messari.io',
        path : '/api/v2/assets?fields=symbol,name,slug',
        method: 'GET',
        headers: { "x-messari-api-key": process.env.MESSARI_API_KEY },
    }

    //send request
    https.request(options , (response)=>{
        //if response has error, send error
        if(response.error){
            res.status(500).send({error : response.error})
        }

        let str = "";
        response.on("data", (chunk) => (str += chunk));

        response.on('end' , ()=>{

            //on response buffer end, check if response has error
            const responseObj = JSON.parse(str)
    
            if(!responseObj.data){
                return res.status(500).send({error : responseObj.status.error_message})
            }
    
            //else send data
            res.send(responseObj)
    
            })

        
    }).end()

}

const showAsset = (req,res)=>{
    //send http request to external api
    //https://data.messari.io/api/v2/assets/symbol/profile

    //declare request options 
    let options = {
        host : 'data.messari.io',
        path : `/api/v2/assets/${req.params.symbol}/profile?fields=profile/general`,
        method: 'GET',
        headers: { "x-messari-api-key": process.env.MESSARI_API_KEY },
    }

    //send request
    https.request(options , (response)=>{
        //if response has error, send error
        if(response.error){
            res.status(500).send({error : response.error})
        }

        let str = "";
        response.on("data", (chunk) => (str += chunk));

        response.on('end' , ()=>{

        //on response buffer end, check if response has error
        const responseObj = JSON.parse(str)

        if(!responseObj.data){
            return res.status(500).send({error : responseObj.status.error_message})
        }

        //else send data
        res.send(responseObj)

        })



        
    }).end()
}

const showAssetMarketData = (req,res)=>{
    //send http request to external api
    //https://data.messari.io/api/v1/assets/{assetKey}/metrics/market-data

    //declare request options 
    let options = {
        host : 'data.messari.io',
        path : `/api/v1/assets/${req.params.symbol}/metrics?fields=market_data,roi_by_year`,
        method: 'GET',
        headers: { "x-messari-api-key": process.env.MESSARI_API_KEY },
    }

    //send request
    https.request(options , (response)=>{
        //if response has error, send error
        if(response.error){
           return res.status(500).send({error : response.error})
        }

        let str = "";
        response.on("data", (chunk) => (str += chunk));

        response.on('end' , ()=>{

        //on response buffer end, check if response has error
        const responseObj = JSON.parse(str)

        if(!responseObj.data){
            return res.status(500).send({error : responseObj.status.error_message})
        }

        //else send data
        res.send(responseObj)

        })


        
    }).end()
}

module.exports = {
    indexAssetNames,
    showAsset,
    showAssetMarketData
}