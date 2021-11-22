const express = require('express')
const {MongoClient} = require('mongodb')


const client = new MongoClient('mongodb+srv://root:root@cluster0.mrx0m.mongodb.net/collect?retryWrites=true&w=majority')

const PORT = 5700
const app = express()

app.use(express.json())

const start = async () => {
    try {
        await client.connect()
        app.locals.collection = client.db("userDb").collection("users")
        app.listen(PORT, () => console.log('Server started on port ' +PORT))
    } catch (err) {
        console.log(err)
    }
}

start()

app.post('/collect', async (req, res) => {
        const {lang, type, count} = req.body
        let price, time, timeForWork, deadline, deadlineDate
        if (lang === 'en') {
            price = 0.12 * count
            time = Math.ceil(count/333+0.3)
            timeForWork = Math.floor(60 * 60 * 1000 * count/ 333 +1800000)
            if (price < 120) {
                price = 120
            }

        } else if (lang === 'uk' || 'ru') {
            price = 0.05 * count
            time = Math.ceil(count/1333+0.3)
            timeForWork = (60 * 60 * 1000 * count/ 1333 +1800000)
            if (price < 50) {
                price = 50
            }

        } else if (lang !== 'en' || 'ru' || 'uk') {
            return res.status(400).json({message: 'Wrong language' })
        }

        if (type !== 'doc' && type !== 'docx' && type !== 'rtf') {
            console.log('tut')
            time *= 1.2
            price *= 1.2
            timeForWork *= 1.2
        }

        let timestamp = new Date('2021-11-22T14:30:10.000Z')

        console.log(timestamp.toDateString() + ' ' +timestamp.getHours() + ' ' +timestamp.getMinutes())
        console.log(timestamp.getTime())

        if (timestamp.getDay() === 0) {
            timestamp = new Date(timestamp.getTime() + (24 * 60 * 60 * 1000))
            timestamp.setHours(10)
        }

        if (timestamp.getDay() === 6) {
            timestamp = new Date(timestamp.getTime() + 2*(24 * 60 * 60 * 1000))
            timestamp.setHours(10)
        }

    console.log(timestamp.toDateString() + ' ' +timestamp.getHours() + ' ' +timestamp.getMinutes())

        if (timestamp.getHours() < 10) {
            timestamp.setHours(10)
        }

        if (timestamp.getHours() > 19) {
            timestamp.setHours(10)
            timestamp = new Date(timestamp.getTime()+ (24 * 60 * 60 * 1000))
        }
    console.log(timestamp.toDateString() + ' ' +timestamp.getHours() + ' ' +timestamp.getMinutes())

        let daysCount = ((timeForWork - timeForWork % (9 * 60 * 60 *1000)) / (9 * 60 * 60 *1000))


        let restDaysCount = timeForWork % (9 * 60 * 60 *1000)

        let finalDeadlinePleaseWork = new Date(timestamp.getTime() + daysCount * (24 * 60 * 60 * 1000) + restDaysCount)

    console.log(finalDeadlinePleaseWork.toDateString() + ' ' +finalDeadlinePleaseWork.getHours() + ' ' +finalDeadlinePleaseWork.getMinutes())

        if (finalDeadlinePleaseWork.getHours() > 19) {
            finalDeadlinePleaseWork.setHours( 10 + finalDeadlinePleaseWork.getHours() - 19)
            finalDeadlinePleaseWork = new Date(finalDeadlinePleaseWork.getTime()+ (24 * 60 * 60 * 1000))
        }

    console.log(finalDeadlinePleaseWork.toDateString() + ' ' +finalDeadlinePleaseWork.getHours() + ' ' +finalDeadlinePleaseWork.getMinutes())

        deadline = Math.floor(finalDeadlinePleaseWork.getTime()/1000)

        deadlineDate = finalDeadlinePleaseWork.toDateString() + ' ' +finalDeadlinePleaseWork.getHours() + ':' +finalDeadlinePleaseWork.getMinutes()

    const user = {lang, type, count, price, time, deadline, deadlineDate}
        const collection = req.app.locals.collection
        await collection.insertOne(user)
        return res.json({user})

})

//
// console.log('Congrats u did it duuuuude')
// console.log(finalDeadlinePleaseWork)
// console.log(finalDeadlinePleaseWork.toDateString() + ' ' +finalDeadlinePleaseWork.getHours() + ':' +finalDeadlinePleaseWork.getMinutes())

// console.log(timestamp)
//
// let timestampInMS = timestamp.getTime()
//
// console.log(timestampInMS)
//
// if (timestamp.getDay() === 5) {
//     timestamp.setDa
// }


// console.log()


// let todayDate = new Date(1637365851988) // '1637365851988' 1:50
// console.log(todayDate.getHours() + ' ' +todayDate.getMinutes())
// console.log('---')



//
// if (lang === 'en') {
//     let price = 0.12 * count
//     if (price < 120) {
//         return res.status(400).json({message: 'Not enough symbols, dude'})
//     }
//     let time = Math.ceil(count/333+0.3)
//     if (type !== 'doc' || 'docx' || 'rtf') {
//         time *= 1.2
//         price *= 1.2
//         let newVar = time, price;
//         return newVar
//     }
// } else if (lang === 'uk' || 'ru') {
//     let price = 0.05 * count
//     if (price < 50) {
//         return res.status(400).json({message: 'Not enough symbols, dude'})
//     }
//     let time = Math.ceil(count/333+0.3)
//     if (type !== 'doc' || 'docx' || 'rtf') {
//         time *= 1.2
//         price *= 1.2
//     }
// } else if (lang !== 'en' || 'ru' || 'uk') {
//     return res.status(400).json({message: 'Wrong language' })
// }


//
// let price, time, deadline, deadlineDate
// if (lang === 'en') {
//     price = 0.12 * count
//     if (price < 120) {
//         return res.status(400).json({message: 'Not enough symbols, dude'})
//     }
//
//
// } else if (lang === 'uk' || 'ru') {
//     price = 0.05 * count
//     if (price < 50) {
//         return res.status(400).json({message: 'Not enough symbols, dude'})
//     }
//
// } else if (lang !== 'en' || 'ru' || 'uk') {
//     return res.status(400).json({message: 'Wrong language' })
// }
// time = Math.ceil(count/333+0.3)
//
// if (type !== 'doc' && type !== 'docx' && type !== 'rtf') {
//     console.log('tut')
//     time *= 1.2
//     price *= 1.2
// }
// let todayDate = new Date()
//
// console.log(Math.floor(todayDate.getTime()/1000))
//
// const user = {lang, type, count, price, time}