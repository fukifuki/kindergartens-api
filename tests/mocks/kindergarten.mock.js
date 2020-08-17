const data = {
    name: 'Bubamarica',
    fullName: 'PU Decija Kuca Bubamarica',
    about: 'Mi smo Dečija kuca Bubamarica, predškolska obrazovna ustanova koja postoji već skoro 8 godina. U našoj kući svako dete ima prostor za lični razvoj, u skladu sa sopstvenim sposobnostima, potrebama i interesovanjima. Naš vrtić je mesto gde dete uči da razume sebe, druge, kao i svet koji ga okružuje. Naša kuća raste i menja se zajedno sa decom, i čeka decu da je sami kreiraju. Mi smo tim mladih, stručnih i kreativnih ljudi koji je okupljen oko ideje da svako dete ima veliki potencijal koji bi trebalo samo da upozna, zahvaljujući okolini koja ga podstiče i podržava. Koristeći savremene metode učenja i vaspitanja, “Bubamarica” otvara prostor deci za kreativnost, za izražavanje jedinstvenog bića. Kroz naš celokupni rad poklanja se pažnja svim situacijama iz kojih deca uče i razvijaju se, te se stavlja akcenat na proces učenja kreirajući sredinu koja angažuje različita dečija čula i sposobnosti (deca imaju mogućnost da pevaju, igraju, eksperimentišu, posmatraju, istražuju, rešavaju probleme).',
    locations: [
        {
            name: 'Bubamarica 1',
            location: {
                coordinates: ['44.822240', '20.389900'],
                address: 'Trajka Rajkovića 2/4',
                city: 'Belgrade',
                state: 'Serbia',
                zipCode: '11070'
            },
        }
    ],
    team: {
        members: [
            {
                name: 'Ivana',
                surname: 'Ivanovic',
                role: 'vaspitacica',
                aboutMe: 'Ja sam bla bla bla bla'
            }
        ],
        groupImageUrl: 'http://bubamarica.co.rs/wp-content/uploads/2019/01/B-kosa-1-300x300.jpg',
        about: 'U našem vrtiću radi tim visokoobrazovanih, mladih i motivisanih vaspitača, medicinskih sestara i stručnih saradnika. Tim PU “Dečija kuća Bubamarica” radi na permanentnom usavršavanju i napredovanju kroz različite vrste edukacija, seminara, tribina, radionica koje posećujemo, ali i organizujemo u okviru naše ustanove.\n\nU radu sa decom neophodno je pratiti nove trendove u vaspitanju i implementirati ih u već postojeće, tako da se naši zaposleni svakodnevno informišu putem stručne literature i interneta o promenama koje se dešavaju u okviru predškolskog vapistanja i obrazovanja.'
    },
    contact: {
        phoneNumbers: [],
        email: 'ads@fdsa.com'
    },
    website: 'www.bubamarica.rs',
    socialMedia: [
        {
            media: 'Instagram',
            link: 'www.'
        },
        {
            media: 'Facebook',
            link: 'www.'
        }
    ]
};

const getMockFactory = (validData) => {
    return  (invalidData={}) => {
        return {...validData, ...invalidData }
    };
};

module.exports = getMockFactory(data);