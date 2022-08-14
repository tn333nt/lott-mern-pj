
export const prizesArr = [
    'jackpot', 'firstPrizes', 'secondPrizes', 
    'thirdPrizes', 'fourthPrizes', 'fifthPrizes', 
    'sixthPrizes', 'sevenPrizes', 'eightPrizes'
]

export const titles = [
    'Jackpot', '1st prizes', '2nd prizes', 
    '3rd prizes', '4th prizes', '5th prizes', 
    '6th prizes', '7th prizes', '8th prizes'
]


export const games = [
    {
        gameId: 0,
        name: 'abc',
        valueType: 'number',
        mainValueDrawn: 1,
        drawnRange: 899999,
        bonusValues: false,
        form: 'traditional',
        numberOfPrize: 6,
        organization: {
            companyName: '123lott',
            Contact: [
                {
                    branchName: 'branch1',
                    branchAddress: 'address1',
                    phone: '0909090909',
                    email: 'contact@gmail.com'
                },
                {
                    branchName: 'branch2',
                    branchAddress: 'address2',
                    phone: '0101010101',
                    email: 'contact@gmail.com'
                }
            ],
            about: [
                { title: 'introduction', detail: 'abcxyz' },
                { title: 'contribution', detail: 'abcxyz' },
                { title: 'vision , mission , ...', detail: 'abcxyz' },
            ]
        },
        news: [
            {
                title: 'news title',
                description: 'not important',
                content: 'some link maybe'
            }
        ],
        playingInstructions: {
            participateSteps: ["do this", "do that"],
            checkingResultSteps: ["do this", "do that"]
        },
        description: 'desc about abc game ...',
        pointsOfSale: ['address 1', 'address 2', 'address 3'],
        historyResult: [
            { resultId: 0 }, { resultId: 1 }, { resultId: 2 },
            { resultId: 3 }, { resultId: 4 }, { resultId: 5 },
            { resultId: 6 }, { resultId: 7 }, { resultId: 8 }, 
            { resultId: 9 } 
        ],
        createdAt: "2019-07-08T08:59:00.000Z",
        updatedAt: "2022-07-08T08:59:00.000Z",
    }
]

export const results = [
    {
        _id: 0,
        date: "2021-12-21T00:00:00.000Z",
        game: games[0].name,
        prizesAmount : 6,
        jackpot: {
            reward: 20000,
            winningValues: ['012677'],
        },
        firstPrizes: {
            reward: 2000,
            winningValues: ['641694', '465758', '364584'],
        },
        secondPrizes: {
            reward: 1000,
            winningValues: ['63858', '47258', '54815'],
        },
        thirdPrizes: {
            reward: 500,
            winningValues: ['5493', '3519', '3649'],
        },
        fourthPrizes: {
            reward: 100,
            winningValues: ['548', '184', '368'],
        },
        fifthPrizes: {
            reward: 50,
            winningValues: ['45', '24', '67'],
        },
        sixthPrizes: {},
        seventhPrizes: {},
        eighthPrizes: {},
        countdown: {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        },
        createdAt: "2021-12-21T00:00:00.000Z",
        updatedAt: "2021-12-21T00:00:00.000Z"
    },
    {
        _id: 1,
        date: "2022-06-23T00:00:00.000Z",
        game: games[0].name,
        prizesAmount : 6,
        jackpot: {
            reward: 15000,
            winningValues: ['563957'],
        },
        firstPrizes: {
            reward: 1500,
            winningValues: ['549636', '136245', '972562'],
        },
        secondPrizes: {
            reward: 500,
            winningValues: ['12414', '14354', '41343'],
        },
        thirdPrizes: {
            reward: 100,
            winningValues: ['3513', '4522', '1243'],
        },
        fourthPrizes: {
            reward: 50,
            winningValues: ['345', '643', '357'],
        },
        fifthPrizes: {
            reward: 10,
            winningValues: ['23', '65', '60'],
        },
        sixthPrizes: {},
        seventhPrizes: {},
        eighthPrizes: {},
        countdown: {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        },
        createdAt: "2022-06-23T00:00:00.000Z",
        updatedAt: "2022-06-23T00:00:00.000Z"
    },
    {
        _id: 2,
        date: "2022-06-24T00:00:00.000Z",
        game: games[0].name,
        prizesAmount : 6,
        jackpot: {
            reward: 15000,
            winningValues: ['254915'],
        },
        firstPrizes: {
            reward: 1500,
            winningValues: ['582665', '251095', '529359'],
        },
        secondPrizes: {
            reward: 500,
            winningValues: ['14565', '46443', '70684'],
        },
        thirdPrizes: {
            reward: 100,
            winningValues: ['1998', '7604', '8769'],
        },
        fourthPrizes: {
            reward: 50,
            winningValues: ['458', '586', '656'],
        },
        fifthPrizes: {
            reward: 20,
            winningValues: ['65', '24', '78'],
        },
        sixthPrizes: {},
        seventhPrizes: {},
        eighthPrizes: {},
        countdown: {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        },
        createdAt: "2022-06-24T00:00:00.000Z",
        updatedAt: "2022-06-24T00:00:00.000Z"
    },
    {
        _id: 3,
        date: "2022-06-25T00:00:00.000Z",
        game: games[0].name,
        prizesAmount : 6,
        jackpot: {
            reward: 15000,
            winningValues: ['451956'],
        },
        firstPrizes: {
            reward: 1000,
            winningValues: ['561695', '124197', '345700'],
        },
        secondPrizes: {
            reward: 500,
            winningValues: ['25252', '63434', '69684'],
        },
        thirdPrizes: {
            reward: 100,
            winningValues: ['4946', '8639', '1252'],
        },
        fourthPrizes: {
            reward: 50,
            winningValues: ['936', '864', '665'],
        },
        fifthPrizes: {
            reward: 10,
            winningValues: ['63', '54', '90'],
        },
        sixthPrizes: {},
        seventhPrizes: {},
        eighthPrizes: {},
        countdown: {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        },
        createdAt: "2022-06-25T00:00:00.000Z",
        updatedAt: "2022-06-25T00:00:00.000Z"
    },
    {
        _id: 4,
        date: "2022-06-26T00:00:00.000Z",
        game: games[0].name,
        prizesAmount : 6,
        jackpot: {
            reward: 15000,
            winningValues: ['569165'],
        },
        firstPrizes: {
            reward: 1000,
            winningValues: ['652696', '189419', '135871'],
        },
        secondPrizes: {
            reward: 500,
            winningValues: ['25545', '45452', '24535'],
        },
        thirdPrizes: {
            reward: 100,
            winningValues: ['4545', '2323', '5452'],
        },
        fourthPrizes: {
            reward: 50,
            winningValues: ['352', '245', '542'],
        },
        fifthPrizes: {
            reward: 20,
            winningValues: ['15', '36', '66'],
        },
        sixthPrizes: {},
        seventhPrizes: {},
        eighthPrizes: {},
        countdown: {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        },
        createdAt: "2022-06-26T00:00:00.000Z",
        updatedAt: "2022-06-26T00:00:00.000Z"
    },
    {
        _id: 5,
        date: "2022-06-27T00:00:00.000Z",
        game: games[0].name,
        prizesAmount : 6,
        jackpot: {
            reward: 15000,
            winningValues: ['914341'],
        },
        firstPrizes: {
            reward: 1000,
            winningValues: ['268637', '934578', '928758'],
        },
        secondPrizes: {
            reward: 500,
            winningValues: ['12434', '09074', '01374'],
        },
        thirdPrizes: {
            reward: 100,
            winningValues: ['2334', '1243', '3423'],
        },
        fourthPrizes: {
            reward: 50,
            winningValues: ['423', '233', '323'],
        },
        fifthPrizes: {
            reward: 20,
            winningValues: ['23', '84', '93'],
        },
        sixthPrizes: {},
        seventhPrizes: {},
        eighthPrizes: {},
        countdown: {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        },
        createdAt: "2022-06-27T00:00:00.000Z",
        updatedAt: "2022-06-27T00:00:00.000Z"
    },
    {
        _id: 6,
        date: "2022-06-30T00:00:00.000Z",
        game: games[0].name,
        prizesAmount : 6,
        jackpot: {
            reward: 15000,
            winningValues: ['643792'],
        },
        firstPrizes: {
            reward: 1000,
            winningValues: ['268632', '677504', '465750'],
        },
        secondPrizes: {
            reward: 500,
            winningValues: ['41234', '13433', '65421'],
        },
        thirdPrizes: {
            reward: 100,
            winningValues: ['1345', '3513', '4344'],
        },
        fourthPrizes: {
            reward: 50,
            winningValues: ['565', '245', '243'],
        },
        fifthPrizes: {
            reward: 20,
            winningValues: ['12', '45', '65'],
        },
        sixthPrizes: {},
        seventhPrizes: {},
        eighthPrizes: {},
        countdown: {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        },
        createdAt: "2022-06-30T00:00:00.000Z",
        updatedAt: "2022-06-30T00:00:00.000Z"
    },
    {
        _id: 7,
        date: "2022-07-02T00:00:00.000Z",
        game: games[0].name,
        prizesAmount : 6,
        jackpot: {
            reward: 15000,
            winningValues: ['124354'],
        },
        firstPrizes: {
            reward: 1000,
            winningValues: ['123545', '090808', '918751'],
        },
        secondPrizes: {
            reward: 500,
            winningValues: ['23523', '23524', '13251'],
        },
        thirdPrizes: {
            reward: 100,
            winningValues: ['2352', '2535', '2535'],
        },
        fourthPrizes: {
            reward: 50,
            winningValues: ['354', '241', '346'],
        },
        fifthPrizes: {
            reward: 20,
            winningValues: ['34', '78', '46'],
        },
        sixthPrizes: {},
        seventhPrizes: {},
        eighthPrizes: {},
        countdown: {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        },
        createdAt: "2022-07-02T00:00:00.000Z",
        updatedAt: "2022-07-02T00:00:00.000Z"
    },
    {
        _id: 8,
        date: "2022-07-08T00:00:00.000Z",
        game: games[0].name,
        prizesAmount : 6,
        jackpot: {
            reward: 15000,
            winningValues: ['057817'],
        },
        firstPrizes: {
            reward: 1000,
            winningValues: ['268637', '187501', '918750'],
        },
        secondPrizes: {
            reward: 500,
            winningValues: ['51845', '23521', '65424'],
        },
        thirdPrizes: {
            reward: 100,
            winningValues: ['4646', '1354', '6342'],
        },
        fourthPrizes: {
            reward: 50,
            winningValues: ['565', '356', '346'],
        },
        fifthPrizes: {
            reward: 20,
            winningValues: ['23', '45', '56'],
        },
        sixthPrizes: {},
        seventhPrizes: {},
        eighthPrizes: {},
        countdown: {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        },
        createdAt: "2022-07-08T00:00:00.000Z",
        updatedAt: "2022-07-08T00:00:00.000Z"
    },
    {
        _id: 9,
        date: "2022-07-21T00:00:00.000Z",
        game: games[0].name,
        prizesAmount : 6,
        jackpot: {
            reward: 15000,
            winningValues: ['548457'],
        },
        firstPrizes: {
            reward: 1000,
            winningValues: ['268637', '187501', '918750'],
        },
        secondPrizes: {
            reward: 500,
            winningValues: ['51845', '23521', '65424'],
        },
        thirdPrizes: {
            reward: 100,
            winningValues: ['4646', '1354', '6342'],
        },
        fourthPrizes: {
            reward: 50,
            winningValues: ['565', '356', '346'],
        },
        fifthPrizes: {
            reward: 20,
            winningValues: ['23', '45', '56'],
        },
        sixthPrizes: {},
        seventhPrizes: {},
        eighthPrizes: {},
        countdown: {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        },
        createdAt: "2022-07-21T00:00:00.000Z",
        updatedAt: "2022-07-21T00:00:00.000Z"
    },
]


export const users =
    [
        {
            userId: 0,
            username: '123123',
            email: '123@gmail.com',
            password: 123,
            isAdmin: true,
            age: 30,
            country: 'UK',
            city: 'London',
            address: '221B Baker Street',
            mobile: '(20) 555-2222',
            postalCode: 'NW1 6XE',
            fullName: 'Sherlock Holmes',
            avatar: 'https://as2.ftcdn.net/jpg/01/19/32/93/220_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg'
        },
        {
            userId: 1,
            username: 'user0',
            email: 'user0@gmail.com',
            password: 'user00',
            isAdmin: false,
            historyCheck: [
                {
                    date: "2021-12-21T00:00:00.000Z",
                    value: 235295,
                    win: []
                },
                {
                    date: "2022-06-23T00:00:00.000Z",
                    value: 345006,
                    win: []
                },
                {
                    date: "2022-06-23T00:00:00.000Z",
                    value: 567891,
                    win: []
                }
            ],
            age: 27,
            country: 'Sweden',
            city: 'Stockholm',
            address: 'Brovallavägen 231',
            mobile: '08-123 45 67',
            postalCode: 'S-123 45',
            fullName: 'afa adfda asf',
            avatar: 'https://as2.ftcdn.net/jpg/01/19/32/93/220_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg'
        },
        {
            userId: 2,
            username: 'user1',
            email: 'user1@gmail.com',
            password: 'user1',
            isAdmin: false,
            historyCheck: [
                {
                    date: "2021-12-21T00:00:00.000Z",
                    value: '529523',
                    win: []
                },
                {
                    date: "2022-06-23T00:00:00.000Z",
                    value: '006063',
                    win: []
                },
                {
                    date: "2022-06-23T00:00:00.000Z",
                    value: '891456',
                    win: []
                }
            ],
            age: 27,
            country: 'USA',
            city: 'Seattle',
            address: '305 - 14th Ave. S. Suite 3B',
            mobile: '(206) 555-2222',
            postalCode: '98128',
            fullName: 'afaasffd',
            avatar: 'https://as2.ftcdn.net/jpg/01/19/32/93/220_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg'
        },
        {
            userId: 3,
            username: 'user2',
            email: 'user2@gmail.com',
            password: 'user2',
            isAdmin: false,
            historyCheck: [
                {
                    date: "2021-12-21T00:00:00.000Z",
                    value: '012677',
                    win: ['jackpot']
                }
            ],
            age: 24,
            country: 'Germany',
            city: 'Berlin',
            address: 'Obere Str. 57	',
            mobile: '(49) 9984510',
            postalCode: '12209',
            fullName: 'ahfav',
            avatar: 'https://as2.ftcdn.net/jpg/01/19/32/93/220_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg'
    
        },
        {
            userId: 4,
            username: 'user3',
            email: 'user3@gmail.com',
            password: 'user3',
            isAdmin: false,
            historyCheck: [],
            age: 21,
            country: 'Japan',
            city: 'Osaka',
            address: '92 Setsuko Chuo-ku',
            mobile: '(06) 431-7877',
            postalCode: '545',
            fullName: 'asgfdsa',
            avatar: 'https://as2.ftcdn.net/jpg/01/19/32/93/220_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg'
        },
        {
            userId: 5,
            username: 'user4',
            email: 'user4@gmail.com',
            password: 'user4',
            isAdmin: false,
            historyCheck: [
                {
                    date: "2022-06-23T00:00:00.000Z",
                    value: '455234',
                    win: []
                }
            ],
            age: 19,
            country: 'UK',
            city: 'Manchester',
            address: "29 King's Way",
            mobile: '(161) 555-4448',
            postalCode: 'M14 GSD',
            fullName: 'safd sdugfids dsfis',
            avatar: 'https://as2.ftcdn.net/jpg/01/19/32/93/220_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg'
        },
        {
            userId: 6,
            username: 'user5',
            email: 'user5@gmail.com',
            password: 'user5',
            isAdmin: false,
            historyCheck: [
                {
                    date: "2022-06-23T00:00:00.000Z",
                    value: '125623',
                    win: []
                },
                {
                    date: "2022-06-23T00:00:00.000Z",
                    value: '120923',
                    win: []
                },
                {
                    date: "2022-06-26T00:00:00.000Z",
                    value: '564563',
                    win: []
                }
            ],
            age: 18,
            country: 'Australia',
            city: 'Melbourne',
            address: '74 Rose St. Moonie Ponds',
            mobile: '(03) 444-2343',
            postalCode: '3058',
            avatar: 'https://as2.ftcdn.net/jpg/01/19/32/93/220_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg'
        },
        {
            userId: 7,
            username: 'user6',
            email: 'user6@gmail.com',
            password: 'user6',
            isAdmin: false,
            historyCheck: [],
            age: 21,
            country: 'France',
            city: 'Paris',
            address: '203, Rue des Francs-Bourgeois',
            mobile: '(1) 03.83.00.68',
            postalCode: '75004',
            fullName: 'fasd idfodsa',
            avatar: 'https://as2.ftcdn.net/jpg/01/19/32/93/220_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg'
        },
        {
            userId: 8,
            username: 'user7',
            email: 'user7@gmail.com',
            password: 'user7',
            isAdmin: false,
            historyCheck: [
                {
                    date: "2022-06-23T00:00:00.000Z",
                    value: '304023',
                    win: []
                },
                {
                    date: "2022-06-25T00:00:00.000Z",
                    value: '314621',
                    win: []
                }
            ],
            age: 19,
            country: 'USA',
            city: 'Boston',
            address: 'Order Processing Dept. 2100 Paul Revere Blvd.',
            mobile: '(617) 555-3267',
            postalCode: '02134',
            fullName: 'asfd digod',
            avatar: 'https://as2.ftcdn.net/jpg/01/19/32/93/220_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg'
        },
        {
            userId: 9,
            username: 'user8',
            email: 'user8@gmail.com',
            password: 'user8',
            isAdmin: false,
            historyCheck: [
                {
                    date: "2022-06-24T00:00:00.000Z",
                    value: '201345',
                    win: []
                }
            ],
            age: 35,
            country: 'Singapore',
            city: 'Singapore',
            address: '471 Serangoon Loop, Suite #402',
            mobile: '555-8787',
            postalCode: '0512',
            fullName: 'asdgfd oijosa',
            avatar: 'https://as2.ftcdn.net/jpg/01/19/32/93/220_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg'
        },
        {
            userId: 10,
            username: 'user9',
            email: 'user9@gmail.com',
            password: 'user9',
            isAdmin: false,
            historyCheck: [
                {
                    date: "2022-06-26T00:00:00.000Z",
                    value: '101345',
                    win: []
                },
                {
                    date: "2022-06-26T00:00:00.000Z",
                    value: '123416',
                    win: []
                },
                {
                    date: "2022-06-26T00:00:00.000Z",
                    value: '225545',
                    win: ['2ndPrize']
                }
            ],
            age: 21,
            country: 'Viet Nam',
            city: 'Ha Noi',
            address: '2 Hùng Vương, Điện Bàn, Ba Đình',
            mobile: '024 3845 5128',
            postalCode: '10069',
            fullName: 'asfdaasdv',
            avatar: 'https://as2.ftcdn.net/jpg/01/19/32/93/220_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg'
        }
    ]