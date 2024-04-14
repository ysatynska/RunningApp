function generateDistanceSchedule(schedule, user) {
    let isTempo = false;
    let totalRuns = 0;
    for (let i = 0; i < 7; i++) {
        if (schedule[i].available && totalRuns < 5) {
            if (isTempo) {
                schedule[i].miles = user.currentBest.miles/2;
                schedule[i].reps = schedule[i].hours < 3 ? 'three' : 'six';
                schedule[i].minsPerMile = 10;
            } else {
                schedule[i].miles = user.currentBest.miles*user.rateOfImprovement;
                schedule[i].reps = 1;
                user.currentBest.miles *= user.rateOfImprovement;
            }
            isTempo = !isTempo;
            totalRuns++;
        }
    }
}

function generateTimeScedule(schedule, user) {
    let isTempo = false;
    let totalRuns = 0;
    for (let i = 0; i < 7; i++) {
        if (schedule[i].available && totalRuns < 5) {
            if (isTempo) {
                schedule[i].miles = user.goal.distance;
                schedule[i].minsPerMile = (user.currentBest.miles/user.currentBest.minutes)*user.rateOfImprovement;
                schedule[i].reps = schedule[i].hours < 3 ? 'three' : 'six';
                user.currentBest.minutes = schedule[i].pace*user.currentBest.miles;
            } else {
                schedule[i].miles = user.goal.distance*2;
                schedule[i].reps = schedule[i].hours < 3 ? 'once' : (schedule[i] < 5 ? 'twice' : 'three times');
                schedule[i].pace = (user.currentBest.minutes/user.currentBest.miles)*1.75;
            }
            isTempo = !isTempo;
            totalRuns++;
        }
    }
}

export default function generateSchedule (user, availability) {
    console.log(availability)
    //pace is in minutes/mile
    let schedule = availability.map((oneDay) => {
        return {
            ...oneDay,
            miles: 0,
            minsPerMile: 0,
            reps: 0
        }
    })
    console.log("user: ", JSON.stringify(user, null, 2))
    console.log("schedule before: ", JSON.stringify(schedule, null, 2));
    // let schedule = [
    //     {day: "Monday", distance: 0, pace: 0, reps: 0},
    //     {day: "Tuesday", distance: 0, pace: 0, reps: 0},
    //     {day: "Wednesday", distance: 0, pace: 0, reps: 0},
    //     {day: "Thursday", distance: 0, pace: 0, reps: 0},
    //     {day: "Friday", distance: 0, pace: 0, reps: 0},
    //     {day: "Saturday", distance: 0, pace: 0, reps: 0},
    //     {day: "Sunday", distance: 0, pace: 0, reps: 0},
    // ];
    if (user.goal.minutes === ''){
        console.log('doing distance');
        generateDistanceSchedule(schedule, user);
    } else {
        console.log('doing time')
        generateTimeScedule(schedule, user);
    }
    return schedule;
}

// distance in miles, pace in minutes/mile?
export const sampleOutput = [
    {title: 'Monday', distance: 5, pace: 6, times: 1},
    {title: 'Tuesday', distance: 1, pace: 10, times: 3},
    {title: 'Thursday', distance: 6, pace: 7, times: 1},
    {title: 'Saturday', distance: 1, pace: 11, times: 4},
    {title: 'Sunday', distance: 8, pace: 6, times: 1}
];