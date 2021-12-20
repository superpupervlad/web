async function get_info(id) {
    const url = `https://restcountries.com/v3.1/alpha/${id}?fields=name,capital,region,area,population,startOfWeek,unMember,independent,status,cca2,ccn3,cca3,cioc,flags`
    try {
        let country_info = await fetch(url)
            .then(response => response.json());
        return {
            name: country_info.name.common,
            img: country_info.flags.png,
            id: country_info.ccn3,
            data: {
                'Common information': {
                    'Official name': country_info.name.official,
                    'Capital': country_info.capital.join(),
                    'Region': country_info.region,
                    'Area': country_info.area,
                    'Population': country_info.population,
                },
                'Politics': {
                    'UN member': country_info.unMember,
                    'Independent': country_info.independent,
                    'Status': country_info.status,
                },
                'Codes': {
                    'cca2': country_info.cca2,
                    'ccn3': country_info.ccn3,
                    'cca3': country_info.cca3,
                    'cioc': country_info.cioc
                },
                'Other': {
                    'First day of week': country_info.startOfWeek,
                }
            }
        }
    } catch (e) {
        let eMessage = "Bad response from server"
        let a = document.querySelector(".notie-container");
        if (a == null || a.textContent !== eMessage)
            notie.alert({
                type: 'error',
                text: eMessage,
                time: 2,
                position: 'bottom'

            })
        document.querySelector("#loader").classList.remove("loading")
        throw "BAD_SERVER_RESPONSE"
    }

}

async function get_all_countries() {
    const url = 'https://restcountries.com/v3.1/all?fields=name,ccn3,flags'
    const country_list = await fetch(url)
        .then(response => response.json());

    country_list.forEach(c => {
        menu_items.push({
            id: c.ccn3,
            name: c.name.common,
            img: c.flags.png,
            hidden: false
        })
    })
}
