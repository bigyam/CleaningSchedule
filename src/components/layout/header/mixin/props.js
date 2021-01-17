export default {
    props: {
        value: { default: null },
        displayAppTourButton: {type: Boolean, default: false },
        appTourMethod: {type: Function, default: null},
        //userName: { type: String, default: "" },
        //lastLogin: { type: Date , default: null},
        //isAuthenticated: { type: Boolean, default: false },
        menuItems: { type: Array, default: () => [
            {title: "Schedule", to: {name: 'home'}},
            {title: "Config", children: [
                {title: "Schedule Builder", to: {name: 'schedule-config'}},
                {title: "Rooms", to: {name: 'room-config'}},
                {title: "Tasks", to: {name: 'task-config'}}          
            ]}
        ] },
        //languageAltCb: { type: Function, default: () => { } },
        appName: { type: String, default: "" },
        showSearch: { type: Boolean, default: true },
        searchPlaceholder: { type: String, default: null},
        fullWidth: {type: Boolean, default: false },
        navigationDrawer: {type: Boolean, default: false},
        navigationDrawerWidth: { default: 300 }
    },
    methods: {
        getProps() {
            return this._props;
        }
    }
}