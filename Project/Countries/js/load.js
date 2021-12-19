function start() {
    get_all_countries().then(r =>  {
        let saved_ids = JSON.parse(localStorage.getItem('saved_ids'))
        console.log(saved_ids)
        if (saved_ids != null)
            append_elements(saved_ids)
        else
            append_elements(choose_start_items())
        }
    );
}

function choose_start_items() {
    let arr = [];
    while(arr.length < 2){
        let r = Math.floor(Math.random() * menu_items.length) + 1;
        let chosen_id = menu_items[r].id
        if(arr.indexOf(chosen_id) === -1) arr.push(chosen_id);
    }
    return arr
}

function process_checkbox() {
    let chbox=document.getElementById('save_checkbox');
    if (chbox.checked)
        save_state();
    else
        delete_state();
}

function save_state() {
    let ids = []
    for (let c of columns) {
        ids.push(c.id)
    }
    localStorage.setItem('saved_ids', JSON.stringify(ids));
}

function delete_state() {
    localStorage.removeItem('saved_ids');
}