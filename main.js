const draggableElement = document.querySelector('.person-container');

let currentDroppable = null;

draggableElement.onmousedown = function(event) {

    let shiftX = event.clientX - draggableElement.getBoundingClientRect().left;
    let shiftY = event.clientY - draggableElement.getBoundingClientRect().top;

    draggableElement.classList.add('animate-person');

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
        draggableElement.style.left = pageX - shiftX + 'px';
        draggableElement.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        draggableElement.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        draggableElement.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest('.canada-container');
        if (currentDroppable != droppableBelow) {
            if (currentDroppable) { // null when we were not over a droppable before this event
                leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) { // null if we're not coming over a droppable now
                // (maybe just left the droppable)
                enterDroppable(currentDroppable);
            }
        }
    }

    document.addEventListener('mousemove', onMouseMove);

    draggableElement.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        draggableElement.onmouseup = null;
    };

};

function enterDroppable(elem) {
    elem.style.background = 'pink';
}

function leaveDroppable(elem) {
    elem.style.background = 'transparent';
}

draggableElement.ondragstart = function() {
    return false;
};