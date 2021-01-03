<template>
    <v-text-field
        color="white"
        :placeholder="searchPlaceholder"
        v-model="searchQuery" 
        @click:append="search" 
        @keyup.enter="search"
        single-line
        hide-details 
        append-outer-icon="mdi-magnify"
        @click:append-outer="search"
        dark
        />
</template>

<script>
export default {
    props: {
        value: { default: null },
        showSearch: { type: Boolean, default: true },
        searchPlaceholder: { type: String, default: null  },
    },
    data() {
        return {
            searchQuery: ''
        }
    },
    methods: {
        search() {
            this.$emit("input", this.searchQuery);
        },
    },
    watch: {
        value : {
            handler(val) {
                this.searchQuery = val;
            },
            immediate: true
        }
    }
}
</script>
