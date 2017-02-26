var dotImg = document.querySelector("#dot");
var container = document.querySelector("#map");
var mapImg = document.querySelector("#mapImg");
var output = document.querySelector("#output");
var count = 0;
var details = {dots: [], count: 0};
var storedDetails = JSON.parse(localStorage.getItem("dots"));

if (storedDetails !== null
        && storedDetails.dots !== null
        && storedDetails.dots.length > 0) {
    details = storedDetails;
    count = storedDetails.count;
    for(var i = details.dots.length - 1; i >= 0; i--) {
        printDot(details.dots[i]);
    }
}

container.addEventListener("click", getClickPosition, false);
output.innerHTML = JSON.stringify(details, null, 2);

function getClickPosition(e) {
    if (e.target.id.includes("dot")) {
        removeDot(e);
    } else {
        addDot(e);
    }

    store(details);
    output.innerHTML = count + "" + JSON.stringify(details, null, 2);
}

function addDot(e) {
    count++;
    details.count = count;
    var parentPosition = getPosition(e.currentTarget);
    var xPosition = e.clientX - parentPosition.x - (dotImg.clientWidth / 2);
    var yPosition = e.clientY - parentPosition.y - (dotImg.clientHeight / 2);
    var dot = {
        name: "dot" + count,
        position: {
          x: xPosition,
          y: yPosition
        }
    };
    printDot(dot);
    details.dots.push(dot);
}

function removeDot(e) {
    container.removeChild(e.target);
    for(var i = details.dots.length - 1; i >= 0; i--) {
        if(details.dots[i].name === e.target.id) {
           details.dots.splice(i, 1);
        }
    }
}

function printDot(dot) {
    var newDot = dotImg.cloneNode(true);
    newDot.style.visibility = "visible";
    newDot.id = dot.name;
    container.insertBefore(newDot, mapImg);
    newDot.style.left = dot.position.x + "px";
    newDot.style.top = dot.position.y + "px";
}

function store(o) {
    localStorage.setItem("dots", JSON.stringify(o));
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

