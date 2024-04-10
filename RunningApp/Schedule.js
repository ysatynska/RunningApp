import user from "./userData"

function generateDistanceSchedule(schedule) {
    let isTempo = false;
    let totalRuns = 0;
    if (user.currentBest.distance < 1) {
        user.currentBest.distance = .5;
    }

    for (let i = 0; i < 7; i++) {
        if (user.availability[i].available === true && totalRuns < 5) {
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
    
}

export default function generateSchedule() {
    let schedule = [
        {day: "monday", distance: 0, pace: 0, reps: 0},
        {day: "tuesday", distance: 0, pace: 0, reps: 0},
        {day: "wednesday", distance: 0, pace: 0, reps: 0},
        {day: "thursday", distance: 0, pace: 0, reps: 0},
        {day: "friday", distance: 0, pace: 0, reps: 0},
    ];


    if (user.goal.time === 0){
        generateDistanceSchedule(schedule);
    }else{
        generateTimeScedule(schedule);
    }
    
    return schedule;

}
