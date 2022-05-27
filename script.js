const workDay = {
    start: 9, // 9am
    end: 18, // 6pm
    interval: 1 // hours
}

$(function() {
    for(let i = workDay.start; i < workDay.end; i += workDay.interval) {
        $('.container').append(createTimeBlock(i));
    }
});

function createTimeBlock(startTime) {
    const currTime = parseInt(moment().format('H'));
    const time = startTime > 11 ? `${startTime - 12 || 12}PM` : `${startTime}AM`;
    let relTime;
    console.log(startTime, currTime)
    if (startTime < currTime) relTime = 'past';
    else if (startTime === currTime) relTime = 'present';
    else relTime = 'future';

    const timeBlock = $('<div></div>').addClass('time-block row');
    const hour = $('<p></p>').addClass('hour').text(time);
    timeBlock.append(hour);
    const textarea = $('<textarea rows="5"></textarea>').addClass(`description ${relTime}`)
    timeBlock.append(textarea);
    const saveBtn = $('<button></button>').addClass('saveBtn').text('💾');
    timeBlock.append(saveBtn);

    return timeBlock;
}