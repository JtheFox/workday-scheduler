const workDay = {
    start: 9, // 9am
    end: 18, // 6pm
    interval: 1 // hours
}

$(function() {
    // localStorage.removeItem('scheduleData');
    $('.timeDisplay').text(moment().format('dddd MMM Do'));
    const saveData = JSON.parse(localStorage.getItem('scheduleData')) || [];
    for (let i = workDay.start; i < workDay.end; i += workDay.interval) {
        const timeEvent = saveData.find(e => e[0] === i) || '';
        $('.container').append(createTimeBlock(i, timeEvent));
    }

    $('.saveBtn').on('click', function(event) {
        const saveData = JSON.parse(localStorage.getItem('scheduleData')) || [];
        console.log(saveData); 
        let target = $(event.target);
        const hour = parseInt(target.siblings('.hour').text());
        const desc = target.siblings('.description').val();
        
        //TODO: Seems like this use of findIndex isn't working entirely as intended, it's not replacing existing items in the array
        let dataIndex = saveData.findIndex(e => e[0] === hour);
        console.log(hour, dataIndex);
        dataIndex = dataIndex < 0 ? 0 : saveData.length
        saveData[dataIndex] = [hour, desc];
        
        console.log(saveData); 
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