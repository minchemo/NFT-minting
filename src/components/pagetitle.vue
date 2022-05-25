<template>
  <div
    class="
      container
      mx-auto
      transition-all
      text-5xl
      uppercase
      font-bold
      font-['Open_Sans']
      px-8
      py-8
    "
  >
    <div><span class="text-gray-400">#</span> {{ title }}</div>
    <div class="mt-4 pl-12 text-sm font-thin text-gray-500 tracking-wider">
      {{ subtitle }}
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