function init() {
    window.columns = []
    window.pass_to_template = {}
    window.menu_items = []
    window.available_subgroups = ['Common information', 'Politics', 'Codes', 'Other']
    window.available_values = {
        'Common information': [
            'Official name',
            'Capital',
            'Region',
            'Area',
            'Population',
        ],
        'Politics': [
            'UN member',
            'Independent',
            'Status',
        ],
        'Codes': [
            'cca2',
            'ccn3',
            'cca3',
            'cioc',
        ],
        'Other': [
            'First day of week',
        ]
    }
    start()
}

function start() {
    get_all_countries().then(async r => {
        let saved_ids = JSON.parse(localStorage.getItem('saved_ids'))
        let arr
        if (saved_ids != null){
            document.getElementById("save_checkbox").checked = true;
            arr = saved_ids
        }
        else
            arr = choose_start_items()
        let promises_for_columns = []
        for (const id of arr) {
            promises_for_columns.push(get_info(id))
            hide_from_menu(id)
        }
        await Promise.all(promises_for_columns).then(elements => columns.push(...elements))
        render_all()
        document.querySelector("#loader").classList.remove("loading")
        document.querySelector(".hide_at_init").classList.remove("hidden")
        }
    )
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