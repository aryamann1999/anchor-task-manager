import {getLocalDateString} from "./dateUtils.js";

export const TASK_NAME_MAX_LENGTH = 100;
export const HABIT_NAME_MAX_LENGTH = 100;
export const VALID_PRIORITIES = ['low','medium','high'];

export const validateTaskName = (name) => {
    const trimmed = name.trim()
    if(trimmed.length === 0){
        return{isValid: false, error: "Task name is required"};
    }
    if(trimmed.length > TASK_NAME_MAX_LENGTH){
        return{isValid: false, error: `Task name must be ${TASK_NAME_MAX_LENGTH} characters or less`};
    }
    return{isValid: true, error:''};
}

export const validateHabitName = (name) =>{
    const trimmed = name.trim()
    if(trimmed.length === 0){
        return{isValid: false, error: "Habit name is required"};
    }
    if(trimmed.length > HABIT_NAME_MAX_LENGTH){
        return{isValid: false, error: `Habit name must be ${HABIT_NAME_MAX_LENGTH} characters or less`}
    }
    return{isValid: true, error:""}
}

export const validateDueDate = (dateStr) =>{
    if(dateStr === ''){
        return{isValid: false, error: "Due Date is required"}
    }
    const curr_date = getLocalDateString()
    if(dateStr < curr_date){
        return{isValid: false, error: "Due Date cannot be in the past"}
    }
    return {isValid: true, error: ""}
}

export const validatePriority = (priority) => {
    if(VALID_PRIORITIES.includes(priority)){
        return{ isValid: true, error: ""}
    }
    return {isValid: false, error: "Invalid Priority"}
}

export const validateHabitSchedule = (habitSchedule) =>{
    if(habitSchedule.length === 0){
        return{isValid: false, error: "Habit schedule needs at least one day"}
    }
    if(!habitSchedule.every(day => day >= 0 && day <= 6)){
        return{isValid: false, error: "Invalid day picked"}
    }
    return{isValid: true, error: ""}
}

export const isValidTask = (task) =>{
    return(
        task != null &&
        typeof task === 'object' &&
        typeof task.id ==='string' &&
        typeof task.taskName === 'string' &&
        typeof task.isComplete === 'boolean' &&
        typeof task.priority === 'string' &&
        typeof task.dueDate === 'string' &&
        typeof task.createdDate === 'string'
    )
}

export const isValidHabit = (habit) =>{
    return(
        habit != null &&
        typeof habit === 'object' &&
        typeof habit.id ==='string' &&
        typeof habit.habitName ==='string' &&
        Array.isArray(habit.habitSchedule) &&
        Array.isArray(habit.habitCompletionHistory) &&
        typeof habit.createdDate ==='string' &&
        typeof habit.isActive === 'boolean'
    )
}