Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

function data_for_template () {
    return {
        "cc": columns,
        "as": available_subgroups,
        "av": available_values
    }
}
