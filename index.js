var Twit = require('twit')

const infos = require('./infos.json')
const tweetID = require('./tweetID.json')

var T = new Twit({
  consumer_key:         'yrYJfr0VLfjcj8Zz9BfJYQDPw',
  consumer_secret:      'zTYSc9LTe6dfXNEO5bAeQmyAvwOZZ1oHcIwo6H9JAp4iXe10rV',
  access_token:         '3049349732-B1ZWcYnslyGvV4JbNl9g3zbR0VGIlsrURAdGJVi',
  access_token_secret:  'MMpKDcPPIzNSlSMvLskdWEtgnk8ielRZoF7r4QNFCXdi2',
  timeout_ms:           1000 * 60,
  strictSSL:            true,
})

/*
T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
    console.log(data)
})
*/

/*
T.get('followers/ids', { screen_name: 'Donald_Trumpyyy' },  function (err, data, response) {
    console.log(data)
})
*/

/*
T.post('statuses/retweet/:id', { id: '666' }, function (err, data, response) {
        console.log(data)
})
*/ 

function retweetTweetAccount() {
    for (const i in tweetID) {
        const content = tweetID[i]
        T.post('statuses/retweet/:id', { id: content }, function (err, data, response) {
            try {
                console.log('retweet made')
            } catch (error) {
                console.error(error)
            }
        })
    }
}

function sendTweet() {
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let day = new Date().getDate()
    let hour = new Date().getHours()
    let minute = new Date().getMinutes()

    var final = '\n\n\n\n Tweeted by bot 🤖 • Date : ' + day + '.' + month + '.' + year + ' / ' + hour + 'h' + minute

    if(month <= 9) {
        month = '0' + month
    }if(year <= 9) {
        year = '0' + year
    }if(day <= 9) {
        day = '0' + day
    }if(hour <= 9) {
        hour = '0' + hour
    }if(minute <= 9) {
        minute = '0' + minute
    }

    for (const i in infos.sendTweet) {
        let content = infos.sendTweet[i]

        if(content === undefined) {
            console.error('! undefined text')
        }else{
            final = '\n\n\n\n Tweeted by bot 🤖 • Date : ' + day + '.' + month + '.' + year + ' / ' + hour + 'h' + minute
            content = content + final
    
            T.post('statuses/update', { status: content }, function(err, data, response) {
                try {
                    console.log('tweet send')

                    var save = loadFile('./tweetID.json')

                    save.push(data.id)
                    saveFile("./tweetID.json", save)
                } catch (error) {
                    console.error(error)
                }
            })
        }
    }
}

function sendTweetPewDiePie(args) {
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let day = new Date().getDate()
    let hour = new Date().getHours()
    let minute = new Date().getMinutes()

    var final = '\n\n savepewdiepie.netlify.com #savepewdiepie \n\n\n\n  Tweeted by bot 🤖 • Date : ' + day + '.' + month + '.' + year + ' / ' + hour + 'h' + minute

    if(month <= 9) {
        month = '0' + month
    }if(year <= 9) {
        year = '0' + year
    }if(day <= 9) {
        day = '0' + day
    }if(hour <= 9) {
        hour = '0' + hour
    }if(minute <= 9) {
        minute = '0' + minute
    }

    final = final = '\n\n savepewdiepie.netlify.com #savepewdiepie \n\n\n\n  Tweeted by bot 🤖 • Date : ' + day + '.' + month + '.' + year + ' / ' + hour + 'h' + minute
    let content = args + final

    const fs = require('fs')
    const b64content = fs.readFileSync('./fight.jpg', { encoding: 'base64' })

    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
        var mediaIdStr = data.media_id_string
        var altText = 'tweetIMG'
        var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

        T.post('media/metadata/create', meta_params, function (err, data, response) {
            if (!err) {
                var params = { status: content, media_ids: [mediaIdStr] }

                T.post('statuses/update', params, function (err, data, response) {
                    try {
                        console.log('tweetPewDiePie send')
                    } catch (error) {
                        console.error(error)
                    }
                })
            }
        })
    })
}

function sendTweetWithMedia() {
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let day = new Date().getDate()
    let hour = new Date().getHours()
    let minute = new Date().getMinutes()

    var final = '\n\n\n\n Tweeted by bot 🤖 • Date : ' + day + '.' + month + '.' + year + ' / ' + hour + 'h' + minute

    if(month <= 9) {
        month = '0' + month
    }if(year <= 9) {
        year = '0' + year
    }if(day <= 9) {
        day = '0' + day
    }if(hour <= 9) {
        hour = '0' + hour
    }if(minute <= 9) {
        minute = '0' + minute
    }

    for (const i in infos.sendTweetMediaMSG) {
        let content = infos.sendTweetMediaMSG[i]

        final = '\n\n\n\n Tweeted by bot 🤖 • Date : ' + day + '.' + month + '.' + year + ' / ' + hour + 'h' + minute
        content = content + final

        infos.sendTweetMediaIMG.forEach(element => {
            if(content === undefined) {
                console.error('! text undefined')
            }else if(element === undefined) {
                console.error('! image undefined')
            }else{
                var fs = require('fs')
                var b64content = fs.readFileSync(element, { encoding: 'base64' })
            
                T.post('media/upload', { media_data: b64content }, function (err, data, response) {
                    var mediaIdStr = data.media_id_string
                    var altText = 'tweetIMG'
                    var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
            
                    T.post('media/metadata/create', meta_params, function (err, data, response) {
                        if (!err) {
                            var params = { status: content, media_ids: [mediaIdStr] }
            
                            T.post('statuses/update', params, function (err, data, response) {
                                try {
                                    console.log('tweetMedia send')
                                   
                                    var save = loadFile('./tweetID.json')

                                    save.push(data.id)
                                    saveFile("./tweetID.json", save)
                                } catch (error) {
                                    console.error(error)
                                }
                            })
                        }
                    })
                })
            }
        })
    }
}

function searchTweet() {
    infos.searchTweetHashtag.forEach(hashtag => {
        infos.searchTweetLang.forEach(lang => {
            if(hashtag === undefined) {
                console.error('hashtag undefined')
            }else if(lang === undefined) {
                console.error('lang undefined')
            }

            const stream = T.stream('statuses/filter', { track: hashtag, language: lang })

            stream.on('tweet', function (tweet) {
                console.log('List of tweets with hashtag ' + hashtag + ' on lang ' + lang + ' : \n\n ')

                var save = loadFile('./tweetsFind.json')

                save.push(tweet)
                saveFile("./tweetsFind.json", save)
                
                console.log(tweet)
            })
        })
    })
}

function saveFile(path, variable) {
    let fs = require('fs')
    fs.writeFile(path, JSON.stringify(variable, null, '\t'), (err) => {if (err) console.error(err)})
}

function loadFile(path) {
    let fs = require('fs')
    return JSON.parse(fs.readFileSync(path))
}

function getRequest(url, callback) {
	const request = new XMLHttpRequest()

	request.open('GET', url)

	request.addEventListener('load', function() {
		if(request.status >= 200 && request.status < 400) {
			callback(request.responseText)
		}else{
			document.getElementById('content1').innerHTML = 'ERROR : ' + request.status + ' / ' + request.statusText
		}
	})

	request.addEventListener('error', function() {
		document.getElementById('content1').innerHTML = 'ERROR NETWORK'
	})

	request.send(null)
}

try {

    const meteo = require('./meteo')

    meteo.sendMeteoTweet()

    /*
    const fetch = require("node-fetch")

    const subscribersPewDiePie = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC-lHJZR3Gqxm24_Vd_AJ5Yw&key=AIzaSyBU_oWEIULi3-n96vWKETYCMsldYDAlz2M'
    const subscribersTSeries = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCq-Fj5jknLsUf-MWSy4_brA&key=AIzaSyBU_oWEIULi3-n96vWKETYCMsldYDAlz2M'

    const fetchSubscribers = async (link) => {
        try {
            const json = await fetch(link).then((res) => res.json())
            return parseInt(json.items[0].statistics.subscriberCount)
            
        } catch(err) {
            console.error(err)
        }
    }

    (async () => {
        let difference = await fetchSubscribers(subscribersPewDiePie) - await fetchSubscribers(subscribersTSeries)

        if(await fetchSubscribers(subscribersPewDiePie) >= '100000000') {
            sendTweetPewDiePie('Subscribers of PewDiePie : ' + await fetchSubscribers(subscribersPewDiePie) + ' \n\n Subscribers of T-Series : ' + await fetchSubscribers(subscribersTSeries) + ' \n\n\n Difference of PewDiePie and T-Series : ' + difference + ' \n\n WE HAVE WON THIS WAR! 🎉🎉🎉🎉🎉🎉🎉🎉🎉')
        }else if(difference > 0) {
            sendTweetPewDiePie('Subscribers of PewDiePie : ' + await fetchSubscribers(subscribersPewDiePie) + ' \n\n Subscribers of T-Series : ' + await fetchSubscribers(subscribersTSeries) + ' \n\n\n Difference of PewDiePie and T-Series : ' + difference + ' \n\n We won! 🎉')
        }else{
            sendTweetPewDiePie('Subscribers of PewDiePie : ' + await fetchSubscribers(subscribersPewDiePie) + ' \n\n Subscribers of T-Series : ' + await fetchSubscribers(subscribersTSeries) + ' \n\n\n Difference of PewDiePie and T-Series : ' + difference + ' \n\n We lose... *crying* 😫')
        }
    })().catch(console.error)
    */

    console.log('connect OK')
} catch (error) {
    console.error(error)
}