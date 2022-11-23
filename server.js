const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://yoda:maytheforcebe@cluster0.9kzzlr6.mongodb.net/?retryWrites=true&w=majority'

app.use(cors())
app.use(express.json())

const aliens = {
    'humans': {
        'speciesName': 'Humans',
        'homeworld': 'Earth',
        'features': 'Rounded ears, hair on head and face (sometimes)',
        'interestingFact': 'Founded the United Federation of Planets after first contact with the Vulcans',
        'notableExamples': 'James T. Kirk, Zephram Cochran, Abraham Lincoln',
        'image': 'http://placekitten.com/g/200/300'
    },
    'vulcans': {
        'speciesName': 'Vulcans',
        'homeworld': 'Vulcan',
        'features': 'Pointed ears, hair on head and face (sometimes)',
        'interestingFact': 'Practice an extreme form of emotional regulation that focuses on logic above all else, pioneered by a Vulcan named Surak',
        'notableExamples': 'Spock, T"Pol, Sarek',
        'image': 'http://placekitten.com/g/200/300'
    },
    'klingons': {
        'speciesName' : 'Klingons',
        'homeworld': "Qo'noS",
        'features':'Large stature, pronounced ridges on the forehead, stylized facial hair',
        'interestingFact': 'Highly skilled in weapons and battle. Their facial ridges were lost as the result of a virus in 2154, but were subsequently restored by 2269.' ,
        'notableExamples' : "Worf, Kor, Kang",
        'image': 'http://placekitten.com/g/200/300'
    },
    'romulans': {
        'speciesName' : 'Romulans',
        'homeworld': "Romulus",
        'features':'Pointed ears, upward-curving eyebrows,green tinge to the skin, diagonal smooth forehead ridges (sometimes)',
        'interestingFact': 'Share a common ancestory with Vulcans, though none of the emotional discipline. Romulus has a sister planet, Remus, on which the Remans are seen as lesser beings.' ,
        'notableExamples' : "Pardek, Tal'aura, Narissa",
        'image': 'http://placekitten.com/g/200/300'
    },
    'borg': {
        'speciesName' : '(The) Borg',
        'homeworld': 'unknown (Delta Quadrant)',
        'features':'pale skin, numerous interior and exterior biological modifications',
        'interestingFact': 'No single genetic lingeage, species propagates by assimilating individuals via nanotechnology, led by a hive mind guided by a single "queen" individual. DO NOT APPROACH unless under specific diplomatic orders from Starfleet Command.' ,
        'notableExamples' : "Borg Queen, Seven of Nine, Locutus",
        'image': 'http://placekitten.com/g/200/300'
    },
    'gorn': {
        'speciesName' : 'Gorn',
        'homeworld': 'unknown (Alpha Quadrant)',
        'features':'scaly green skin, large, iridescent eyes, powerful build, sharp teeth',
        'interestingFact': 'Extremely militaristic and driven to conquer, but also possess advanced scientific knowledge allowing for superior bio-weapons.' ,
        'notableExamples' : "Gorn Captain",
        'image': 'http://placekitten.com/g/200/300'
    },
    'trill': {
        'speciesName' : 'Trill',
        'homeworld': 'Trill',
        'features':'Outward appearance similar to humans, aside from distinct dark pigment marks running symmetrically down both sides of the face and body',
        'interestingFact': 'Some Trill are willing hosts to a long-lived invertebrate symbiote that merges with the host to create a distinct personality.' ,
        'notableExamples' : "Jadzia Dax, Ezri Dax, Curzon Dax",
        'image': 'http://placekitten.com/g/200/300'
    }
}

// Set up Mongo Connection:
MongoClient.connect(connectionString, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('field-guide-to-aliens')
        const infoCollection = db.collection('field-guide-to-aliens-info')
   
    app.get('/', (request, response) => {
        response.sendFile(__dirname, '/index.html')
    })

    app.get('/api/:alienName', (request, response) => {
        const entry = request.params.alienName.toLowerCase();
            // if (aliens[entry]) {
            //     response.json(aliens[entry])
            // } else {
            //     response.json(aliens['humans'])
            // }
        // Code for hit MongoDB db to pull requested data:
        infoCollection.find({name: entry}).toArray()
        .then(results => {
            console.log(results)
            response.json(results[0])
        })
        .catch(error => console.error(error))
    })

})
.catch(error => console.error(error))

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})