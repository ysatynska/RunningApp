export let user = {
    firstName: '',
    lastName: '',
    skillLevel: 0,
    availability: [
        { day: 'Sunday', available: false, hours: 0 },
        { day: 'Monday', available: false, hours: 0 },
        { day: 'Tuesday', available: false, hours: 0 },
        { day: 'Wednesday', available: false, hours: 0 },
        { day: 'Thursday', available: false, hours: 0 },
        { day: 'Friday', available: false, hours: 0 },
        { day: 'Saturday', available: false, hours: 0 },
    ],
    goal: {
        distance: 0,
        time: 0
    },
    rateOfImprovement: 1.2,
    currentBest: {
        distance: 0,
        time: 0,
    },
};