<template>
    <div>

        <div class="
    relative
    top-0
    left-0
    transition-all
    text-5xl uppercase font-bold font-['Open_Sans'] inline-block px-8 py-8">
            <div>
                <span class="text-gray-400">#</span> {{ title }}
            </div>
            <div class="pl-12 text-sm font-thin text-gray-500 tracking-wider">{{ subtitle }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pagetitle',
    props: ['title', 'subtitle'],
    setup() {

    }
}
</script>