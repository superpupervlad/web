function append_elements(ids) {
    ids.forEach(async id => {
        await add_to_columns(id)
        hide_from_menu(id)
        render_all()
    })
}

async function add_to_columns(id) {
    columns.push(await get_info(id));
}

function hide_from_menu(id) {
    for (const el of menu_items) {
        if (el.id === id) {
            el.hidden = true
            break;
        }
    }
}

async function append_element(id) {
    await add_to_columns(id)
    hide_from_menu(id)
    process_checkbox()
    render_all()
}

function delete_element(id) {
    let i = 0;
    while (i < columns.length) {
        let i_element = columns[i];
        if (i_element.id === id){
            columns.remove(i)
            break
        }
        i++
    }
    for (const el of menu_items) {
        if (el.id === id) {
            el.hidden = false
            break;
        }
    }
    process_checkbox()
    render_all()
}