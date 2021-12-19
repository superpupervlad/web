function render_template(default_values) {
    if (default_values) {
        get_data();
    }
    var source = document.getElementById("values_group_template").innerHTML;
    var template = Handlebars.compile(source);
    var filled = template(pass_to_template);
    document.getElementById("values_group_output").innerHTML = filled

    var source1 = document.getElementById("compared_items_template").innerHTML;
    var template1 = Handlebars.compile(source1);
    var filled1 = template1(pass_to_template);
    document.getElementById("compared_items_output").innerHTML = filled1

    var source = document.getElementById("menu_items_template").innerHTML;
    var template = Handlebars.compile(source);
    var filled = template({"menu_items": menu_items});
    document.getElementById("menu_items_output").innerHTML = filled
}

async function append_element(json_id) {
    const a = await fetch(`js/cat_id${json_id}.json`)
        .then(response => response.json());
    columns.push(a);
    menu_items.forEach(el => {
        if (el.id === json_id) {
            el.hidden = true
        }
    })
    render_template(false)
}

function delete_element(id) {
    if (id === -1) 
        return
    let i = 0;
    while (i < columns.length) {
        let i_element = columns[i];
        if (i_element.id === id) 
            columns.remove(i)
        i++
    }
    menu_items.forEach(el => {
        if (el.id === id) {
            el.hidden = false
        }
    })
    render_template(false)
}

function get_data() {
    columns = [cat_data1, cat_data2, cat_data3]
    pass_to_template = {
        "cc": columns,
        "as": available_subgroups,
        "av": available_values
    }
    return pass_to_template
}

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
