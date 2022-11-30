// Your code here
function createEmployeeRecord(employeeArray) {
    const employee = {};
    employee[`firstName`] = employeeArray[0];
    employee[`familyName`] = employeeArray[1];
    employee[`title`] = employeeArray[2];
    employee[`payPerHour`] = employeeArray[3];
    employee[`timeInEvents`] = [];
    employee[`timeOutEvents`] = [];

    return employee;
}
function createEmployeeRecords(employees) {
    let employeeRecords = [];
    for (let employee of employees) {
        employeeRecords.push(createEmployeeRecord(employee));
    }
    return employeeRecords;
}

function createTimeInEvent(employeeRecord, date) {
    const day = [...date];
    day.splice(10);
    const hour = [...date];
    hour.splice(0, 11);
    const timeInEvent = {
        type: 'TimeIn',
        hour: Number(hour.join('')),
        date: day.join('')
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;

}

function createTimeOutEvent(employeeRecord, date) {
    const day = [...date];
    day.splice(10);
    const hour = [...date];
    hour.splice(0, 11);
    const timeOutEvent = {
        type: 'TimeOut',
        hour: Number(hour.join('')),
        date: day.join('')
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {

    const hourIn = employeeRecord.timeInEvents.find(event => {
        if (event.date === date) {
            //console.log(Number(event.hour));
            return Number(event.hour);
        }
    });
    const hourOut = employeeRecord.timeOutEvents.find(event => {
        if (event.date === date) {
            return Number(event.hour);
        }
    });

    const workHour = (hourOut.hour - hourIn.hour) * 0.01;
    return workHour;
}



function wagesEarnedOnDate(employeeRecord, date) {

    let payOwed = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
    return payOwed;
}

function allWagesFor(employeeRecord){
    const daysPay = [];
    for(let record of employeeRecord.timeInEvents){
        daysPay.push(wagesEarnedOnDate(employeeRecord, record.date));
    }
    return daysPay.reduce((accumulation,value)=>{
            return accumulation + value;
        }
    )
}

function calculatePayroll(employeeRecords){

    let moneyOwed = []
    for(let employee of employeeRecords){

        moneyOwed.push(allWagesFor(employee));
    }
    return moneyOwed.reduce(
        (accumulation, value)=>{
            return accumulation + value;
        }
    )
}