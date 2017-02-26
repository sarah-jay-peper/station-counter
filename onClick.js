var dot = document.querySelector("#dot");
var container = document.querySelector("#map");
var mapImg = document.querySelector("#mapImg");
var output = document.querySelector("#output");
var count = 0;
var details = {dots: []};

container.addEventListener("click", getClickPosition, false);

function getClickPosition(e) {
    if (e.target.id.includes("dot")) {
        removeDot(e);
    } else {
        addDot(e);
    }

    output.innerHTML = JSON.stringify(details, null, 2);//.replace("\n", "<br/>");
}

function addDot(e) {
    count++;
    var newDot = dot.cloneNode(true);
    newDot.style.visibility = "visible";
    newDot.id = "dot" + count;
    container.insertBefore(newDot, mapImg);
    var parentPosition = getPosition(e.currentTarget);
    var xPosition = e.clientX - parentPosition.x - (dot.clientWidth / 2);
    var yPosition = e.clientY - parentPosition.y - (dot.clientHeight / 2);
    newDot.style.left = xPosition + "px";
    newDot.style.top = yPosition + "px";
    details.dots.push({
        name: newDot.id,
        position: {
            x: xPosition,
            y: yPosition
        }
    });
}

function removeDot(e) {
    container.removeChild(e.target);
    for(var i = details.dots.length - 1; i >= 0; i--) {
        if(details.dots[i].name === e.target.id) {
           details.dots.splice(i, 1);
        }
    }
}

// Helper function to get an element's exact position
function getPosition(el) {
    var xPos = 0;
    var yPos = 0;

    while (el) {
        if (el.tagName == "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            var yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return {
        x: xPos,
        y: yPos
    };
}
