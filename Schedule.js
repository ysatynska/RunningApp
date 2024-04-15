function generateDistanceSchedule(schedule, user, numDays) {
    let isTempo = false;
    let totalRuns = 0;
    for (let i = 0; i < numDays; i++) {
        if (totalRuns < 5) {
            if (isTempo) {
                schedule[i].miles = user.currentBest.miles/2;
                schedule[i].reps = schedule[i].hours < 3 ? 'three' : 'six';
                schedule[i].minsPerMile = 10;
            } else {
                schedule[i].miles = user.currentBest.miles*user.rateOfImprovement;
                schedule[i].reps = 'once';
                user.currentBest.miles *= user.rateOfImprovement;
            }
            isTempo = !isTempo;
            totalRuns++;
        }
    }
}

function generateTimeScedule(schedule, user, numDays) {
    let isTempo = false;
    let totalRuns = 0;
    for (let i = 0; i < numDays; i++) {
        if (totalRuns < 5) {
            if (isTempo) {
                schedule[i].miles = user.goal.miles;
                schedule[i].minsPerMile = (user.currentBest.minutes/user.currentBest.miles)*user.rateOfImprovement;
                schedule[i].reps = schedule[i].hours < 3 ? 'three' : 'six';
                user.currentBest.minutes = schedule[i].pace*user.currentBest.miles;
            } else {
                schedule[i].miles = user.goal.miles*2;
                schedule[i].reps = 'once';
                schedule[i].pace = (user.currentBest.minutes/user.currentBest.miles)*1.75;
            }
            isTempo = !isTempo;
            totalRuns++;
        }
    }
}

export default function generateSchedule (user, availability) {
    //pace is in minutes/mile
    let schedule = availability.filter(oneDay => oneDay.hours != 0).map((oneDay, index) => {
        return {
            ...oneDay,
            id: index,
            miles: 0,
            minsPerMile: 0,
            reps: 0,
            completed: false,
            rating: 1
        }
    })
    if (user.goal.minutes === 0){
        generateDistanceSchedule(schedule, user, schedule.length);
    } else {
        generateTimeScedule(schedule, user, schedule.length);
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