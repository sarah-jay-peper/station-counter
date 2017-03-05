
var storedDetails = JSON.parse(stations);
if (storedDetails !== null
    && storedDetails.dots !== null
    && storedDetails.dots.length > 0) {
    details = storedDetails;
    for (var i = details.dots.length - 1; i >= 0; i--) {
        printDot(details.dots[i]);
    }
    counterField.innerHTML = details.dots.length;
}