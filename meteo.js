module.exports = class meteo {

    static sendMeteoTweet() {
        var Twit = require('twit')
        
        var T = new Twit({
          consumer_key:         'yrYJfr0VLfjcj8Zz9BfJYQDPw',
          consumer_secret:      'zTYSc9LTe6dfXNEO5bAeQmyAvwOZZ1oHcIwo6H9JAp4iXe10rV',
          access_token:         '3049349732-B1ZWcYnslyGvV4JbNl9g3zbR0VGIlsrURAdGJVi',
          access_token_secret:  'MMpKDcPPIzNSlSMvLskdWEtgnk8ielRZoF7r4QNFCXdi2',
          timeout_ms:           1000 * 60,
          strictSSL:            true,
        })

        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let day = new Date().getDate()
        let hour = new Date().getHours()
        let minute = new Date().getMinutes()
    
        var final = '\n\n\n\n Envoyé par un robot 🤖 • Date : ' + day + '.' + month + '.' + year + ' / ' + hour + 'h' + minute
    
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

        const fetch = require("node-fetch")
        const linkAPI = 'https://www.prevision-meteo.ch/services/json/lat=45.923750lng=6.869331'

        const fetchMeteo = async (link) => {
            try {
                const json = await fetch(link).then((res) => res.json())

                const sunrise = 'Lever de soleil : ' + json.city_info.sunrise
                const sunset = 'Coucher de soleil : ' + json.city_info.sunset
                const date = 'Date : ' + json.current_condition.date
                const hour = 'Heure : ' + json.current_condition.hour
                const temperature = 'Température : ' + json.current_condition.tmp + ' °C'
                const windSpeed = 'Vitesse du vent : ' + json.current_condition.wnd_spd + ' km/h'
                const windDirection = 'Direction du vent : ' + json.current_condition.wnd_dir
                const conditions = 'Conditions : ' + json.current_condition.condition

                const text =  sunrise + '\n' + sunset + '\n' + date + '\n' + hour + '\n' + temperature + '\n' + windSpeed + '\n' + windDirection + '\n' + conditions + ' \n\n #Chamonix | #HauteSavoie | #ChamonixMontBlanc'

                return text
            } catch(err) {
                console.error(err)
            }
        }

        (async () => {
            T.post('statuses/update', { status: await fetchMeteo(linkAPI) + final }, function(err, data, response) {
                try {
                    console.log('meteo tweet send')
                } catch (error) {
                    console.error(error)
                }
            })
        })().catch(console.error)
    }
}