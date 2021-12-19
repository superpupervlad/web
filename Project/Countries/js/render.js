function render_all() {
    render_menu();
    render_items();
    render_values();
}

function render_menu() {
    let source = document.getElementById("menu_items_template").innerHTML;
    let template = Handlebars.compile(source);
    document.getElementById("menu_items_output").innerHTML = template({"menu_items": menu_items});
}

function render_items() {
    let source = document.getElementById("compared_items_template").innerHTML;
    let template = Handlebars.compile(source);
    document.getElementById("compared_items_output").innerHTML = template(data_for_template());
}

function render_values() {
    let source = document.getElementById("values_group_template").innerHTML;
    let template = Handlebars.compile(source);
    document.getElementById("values_group_output").innerHTML = template(data_for_template());
}


