import { roundToTwoDecimals } from "./Utilities";

function generateDistanceSchedule(schedule, user) {
    let isTempo = false;
    let totalRuns = 0;
    for (let i = 0; i < schedule.length; i++) {
        if (totalRuns < 5) {
            if (isTempo) {
                schedule[i].miles = roundToTwoDecimals(user.currentBest.milesTempo);
                schedule[i].minsPerMile = Math.round(user.currentBest.minutesTempo/user.currentBest.milesTempo);
                schedule[i].reps = schedule[i].hours < 3 ? 'three' : 'six';
            } else {
                schedule[i].miles = roundToTwoDecimals(user.currentBest.milesDist);
                schedule[i].reps = 'once';
            }
            isTempo = !isTempo;
            totalRuns++;
        }
    }
}

function generateTimeScedule(schedule, user) {
    let isTempo = false;
    let totalRuns = 0;
    for (let i = 0; i < schedule.length; i++) {
        if (totalRuns < 5) {
            if (isTempo) {
                schedule[i].miles = user.goal.miles;
                schedule[i].minsPerMile = Math.round(user.currentBest.minutesTempo/user.goal.miles);
                console.log(schedule[i].minsPerMile);
                schedule[i].reps = schedule[i].hours < 3 ? 'three' : 'six';
            } else {
                schedule[i].miles = roundToTwoDecimals(user.currentBest.milesDist);
                schedule[i].reps = 'once';
                schedule[i].minsPerMile = 0;
            }
            isTempo = !isTempo;
            totalRuns++;
        }
    }
}

export default function generateSchedule (user) {
    let schedule = user.schedule.map((oneDay) => {
        return {
            ...oneDay,
            completed: false,
            rating: 1,
        }
    })
    if (user.goal.minutes == 0){
        generateDistanceSchedule(schedule, user);
    } else {
        generateTimeScedule(schedule, user);
    }
    return schedule;
}

export function newCurrentBest (oldCurrentBest, rateOfImprovement, goal) {
    if (goal.minutes == 0) {
        // training for distance 
        const milesDist = oldCurrentBest.milesDist * rateOfImprovement;
        let milesTempo = oldCurrentBest.milesTempo * Math.pow(rateOfImprovement, 4/5);
        let minutesTempo = oldCurrentBest.minutesTempo / Math.pow(rateOfImprovement, 1/5);
        if (minutesTempo/milesTempo > 20) {
            minutesTempo = 20 * milesTempo;
        } else if (minutesTempo/milesTempo < 7) {
            minutesTempo = 7 * milesTempo;
        }
        return {milesDist: milesDist, milesTempo: milesTempo, minutesTempo: minutesTempo};
    } else {
        // training for time
        const milesDist = oldCurrentBest.milesDist * rateOfImprovement;
        let minutesTempo = oldCurrentBest.minutesTempo * Math.pow(2.5 - rateOfImprovement, 1/4);
        if (minutesTempo/goal.miles) {
            minutesTempo = 20 * goal.miles;
        }
        return {milesDist: milesDist, minutesTempo: minutesTempo};
    }
}