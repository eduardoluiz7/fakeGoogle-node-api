operations = {
    distance: function(origin, destination) {
        distance = Math.sqrt(Math.abs(((origin[0]-destination[0]) * (origin[1]-destination[1]))));
        console.log("Distance calculated: " + distance);
        return distance;
    }
};

module.exports = operations;