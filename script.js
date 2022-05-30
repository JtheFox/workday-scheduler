const workDay = {
    start: 9, // 9am
    end: 18, // 6pm
    interval: 1 // hours
}

$(function() {
    // display current time and retrieve save data
    $('.timeDisplay').text(moment().format('dddd MMM Do'));
    const saveData = JSON.parse(localStorage.getItem('scheduleData')) || {};
    // create a time block component for each hour between work day start and end
    for (let i = workDay.start; i < workDay.end; i += workDay.interval) {
        const timeEvent = saveData[i] || '';
        $('.container').append(createTimeBlock(i, timeEvent));
    }
    // add click event to save timeblock data
    $('.saveBtn').on('click', function(event) {
        // get save data or create new object if there is no data
        const saveData = JSON.parse(localStorage.getItem('scheduleData')) || {};
        // get timeblock hour being targeted, get textarea content for storage
        let target = $(event.target);
        let hour = target.siblings('.hour').text();
        hour = moment(hour, ["hA"]).format("H");
        const desc = target.siblings('.description').val();
        // store textarea data in object and update localStorage
        saveData[hour] = desc;
        localStorage.setItem('scheduleData', JSON.stringify(saveData));
    })
});

function createTimeBlock(startTime, eventData) {
    // parse 24h to 12h format
    const currTime = parseInt(moment().format('H'));
    const time = moment(startTime, ["HH"]).format("hA");
    // determine whether timeblock component is past/present/future for styling
    let relTime;
    if (startTime < currTime) relTime = 'past';
    else if (startTime === currTime) relTime = 'present';
    else relTime = 'future';
    // create timeblock/child elements and add save data if it exists
    const timeBlock = $('<div></div>').addClass('time-block row');
    const hour = $('<p></p>').addClass('hour').text(time);
    timeBlock.append(hour);
    const textarea = $('<textarea rows="5"></textarea>').addClass(`description ${relTime}`).val(eventData)
    timeBlock.append(textarea);
    const saveBtn = $('<button></button>').addClass('saveBtn').text('💾');
    timeBlock.append(saveBtn);
    // return timeblock component
    return timeBlock;
}