import user from "./userData"

function generateDistanceSchedule(schedule) {
    let isTempo = false;
    let totalRuns = 0;
    if (user.currentBest.distance < 1) {
        user.currentBest.distance = .5;
    }

    for (let i = 0; i < 7; i++) {
        if (user.availability[i].available && totalRuns < 5) {
            if (isTempo) {
                schedule[i].distance = user.currentBest.distance/2;
                schedule[i].reps = 3;
                schedule[i].pace = 10;
            }else{
                schedule[i].distance = user.currentBest.distance*user.rateOfImprovement;
                schedule[i].reps = 1;
                user.currentBest.distance = user.currentBest.distance*user.rateOfImprovement;
            }
            isTempo = !isTempo;
            totalRuns++;
        }
    }
}

function generateTimeScedule(schedule) {
    let isTempo = false;
    let totalRuns = 0;
    if (user.currentBest.distance < 1) {
        user.currentBest.distance = .5;
    }
    if (user.currentBest.time < 1) {
        user.currentBest.time = user.currentBest.distance;
    }
    for (let i = 0; i < 7; i++) {
        if (user.availability[i].available && totalRuns < 5) {
            if (isTempo) {
                schedule[i].distance = user.goal.distance;
                schedule[i].pace = (user.currentBest.distance/user.currentBest.time)*user.rateOfImprovement;
                schedule[i].reps = 3;
                user.currentBest.time = schedule[i].pace*user.currentBest.distance;
            }else{
                schedule[i].distance = user.goal.distance*2;
                schedule[i].reps = 1;
                schedule[i].pace = (user.currentBest.time/user.currentBest.distance)*1.75;
            }
            isTempo = !isTempo;
            totalRuns++;
        }
    }
}

export default function generateSchedule() {

    //pace is in minutes/mile
    let schedule = [
        {day: "monday", distance: 0, pace: 0, reps: 0},
        {day: "tuesday", distance: 0, pace: 0, reps: 0},
        {day: "wednesday", distance: 0, pace: 0, reps: 0},
        {day: "thursday", distance: 0, pace: 0, reps: 0},
        {day: "friday", distance: 0, pace: 0, reps: 0},
        {day: "saturday", distance: 0, pace: 0, reps: 0},
        {day: "sunday", distance: 0, pace: 0, reps: 0},
    ];


    if (user.goal.time === 0){
        generateDistanceSchedule(schedule);
    }else{
        generateTimeScedule(schedule);
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