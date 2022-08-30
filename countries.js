
$('#all').on('click', getAll)
$('#submit').on('click', getSearch)
$('#clear').on('click', fresh)

function getAll(){
    $.ajax({
        type: 'GET',
        url: `https://restcountries.com/v3.1/all`,
        success: getCountries,
        error: function (err) {
            alert(err)
            console.log(err)
        }
    })
}

function getSearch() {
    if ($('#search').val()) {
        $.ajax({
            type: 'GET',
            url: `https://restcountries.com/v3.1/name/${$('#search').val()}`,
            success: getCountries,
            error: function (err) {
                fresh()
                $('#body').append(`
            <table class="table table-striped">
            <tr>
            <td>NO COUNTRIES FOUND</td>
            </tr>
            </table>
            `)
            }
        })
    }
}

function getCountries(data) {
    fresh()
    numberOfCountries(data)
    popSum(data)
    popAve(data)
    makePopTable(data)
    makeRegTable(data)
    // makeCurTable(data)
}

function numberOfCountries(data) {
    $('#body').append(`
            <table class="table table-striped">
            <tr>
            <td>number of countries</td>
            <td>${data.length}</td>
            </tr>
            </table>
            `)
}

function popSum(data) {
    init = 0
    SUM = data.reduce((prev, current) => prev + current.population, init)
    $('#body').append(`
            <table class="table table-striped">
            <tr>
            <td>combined population</td>
            <td>${SUM}</td>
            </tr>
            </table>
            `)
}

function popAve(data) {
    init = 0
    SUM = data.reduce((prev, current) => prev + current.population, init)
    $('#body').append(`
            <table class="table table-striped">
            <tr>
            <td>population averege</td>
            <td>${Math.floor(SUM / data.length)}</td>
            </tr>
            </table>
            `)
}

function makePopTable(data) {
    $('#body').append(`
            <table id='table' class="table table-striped">
            <tr>
            <td>country name</td>
            <td>population</td>
            </tr>
            </table>
            `)
    for (country of data) {
        $('#table').append(`
                <tr>
                <td><b>${country.name.common}</b> (${country.name.official})</td>
                <td>${country.population}</td>
                </tr>
    `)
    }
}

function makeRegTable(data) {
    $('#body').append(`
            <table id='table2' class="table table-striped">
            <tr>
            <td>region</td>
            <td>countries</td>
            </tr>
            </table>
            `)
    let regions = {}
    for (country of data) {
        if (regions.hasOwnProperty(country.region)) {
            regions[country.region]++
        } else {
            regions[country.region] = 1
        }
    }
    for (region in regions) {
        $('#table2').append(`
        <tr>
        <td>${region}</td>
        <td>${regions[region]}</td>
        </tr>
`)
    }
}

// function makeCurTable(data) {
//     $('#body').append(`
//             <table id='table3' class="table table-striped">
//             <tr>
//             <td>currency</td>
//             <td>countries</td>
//             </tr>
//             </table>
//             `)
//     let currencies = {}
//     for (country of data) {
//         for (currency of country.currencies) {
//             if (currencies.hasOwnProperty(country.currencies[currency])) {
//                 currencies[country.currencies[currency]]++
//             } else {
//                 currencies[country.currencies[currency]] = 1
//             }
//         }
//     }
//     for (currency in currencies) {
//         $('#table3').append(`
//         <tr>
//         <td>${currency}</td>
//         <td>${currencies[currencies]}</td>
//         </tr>
// `)
//     }
//     console.log(currencies)
// }

function fresh() {
    isClicked = false
    $('table').remove()
}