//import profile

function generateDistanceSchedule(profile, schedule) {
    let isTempo = false;
    let totalRuns = 0;
     
    if (profile.availability.monday.available === true) {

    }
    if (profile.availability.tuesday.available === true) {
        
    }
    if (profile.availability.wednesday.available === true) {
        
    }
    if (profile.availability.thursday.available === true) {
        
    }
    if (profile.availability.friday.available === true) {
        
    }
    if (profile.availability.saturday.available === true && totalRuns < 5) {
        
    }
    if (profile.availability.sunday.available === true && totalRuns < 5) {
        
    }
}

export default function generateSchedule(profile) {
    const schedule = {
        monday: {distance: 0, time: 0, reps: 0},
        tuesday: {distance: 0, time: 0, reps: 0},
        wednesday: {distance: 0, time: 0, reps: 0},
        thursday: {distance: 0, time: 0, reps: 0},
        friday: {distance: 0, time: 0, reps: 0}
    };


    if (profile.goal.time === null){
        schedule = generateDistanceSchedule(profile, schedule);
    }else{
        schedule = generateTimeScedule(profile, schedule);
    }
    

}
