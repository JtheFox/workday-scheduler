const workDay = {
    start: 9, // 9am
    end: 18, // 6pm
    interval: 1 // hours
}

$(function() {
    $('.timeDisplay').text(moment().format('dddd MMM Do'));
    const saveData = JSON.parse(localStorage.getItem('scheduleData')) || {};
    for (let i = workDay.start; i < workDay.end; i += workDay.interval) {
        const timeEvent = saveData[i] || '';
        $('.container').append(createTimeBlock(i, timeEvent));
    }

    $('.saveBtn').on('click', function(event) {
        const saveData = JSON.parse(localStorage.getItem('scheduleData')) || {};
        let target = $(event.target);
        let hour = target.siblings('.hour').text();
        hour = hour.toLowerCase().includes('pm') && parseInt(hour) < 12 ? parseInt(hour) + 12 : parseInt(hour);
        const desc = target.siblings('.description').val();

        saveData[hour] = desc;
        localStorage.setItem('scheduleData', JSON.stringify(saveData));
    })
});

function createTimeBlock(startTime, eventData) {
    const currTime = parseInt(moment().format('H'));
    const time = startTime > 11 ? `${startTime - 12 || 12}PM` : `${startTime}AM`;
    let relTime;
    if (startTime < currTime) relTime = 'past';
    else if (startTime === currTime) relTime = 'present';
    else relTime = 'future';

    const timeBlock = $('<div></div>').addClass('time-block row');
    const hour = $('<p></p>').addClass('hour').text(time);
    timeBlock.append(hour);
    const textarea = $('<textarea rows="5"></textarea>').addClass(`description ${relTime}`).val(eventData)
    timeBlock.append(textarea);
    const saveBtn = $('<button></button>').addClass('saveBtn').text('💾');
    timeBlock.append(saveBtn);

    return timeBlock;
}