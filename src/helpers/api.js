import fetch from 'node-fetch'

let onemapToken
fetchOnemapToken()

export function onemapApi (cb) {
  if (onemapToken) {
    return cb(onemapToken).catch(err => {
      if (err.message === 'Token has expired.') {
        onemapToken = null
        return onemapApi(cb)
      }
      throw err
    })
  } else {
    return fetchOnemapToken().then(cb)
  }
}

function fetchOnemapToken () {
  const url = 'https://developers.onemap.sg/publicapi/publicsessionid'
  // const options = {
  //   method: 'POST',
  //   headers: {'Content-Type': 'application/json'},
  //   body: JSON.stringify({'AccessKey': process.env.ONEMAP_ACCESS_KEY})
  // }

  return fetch(url).then(res => res.json()).then(json => {
    onemapToken = json.access_token
    console.log('Using OneMap access token:', onemapToken)
    return onemapToken
  })
}
