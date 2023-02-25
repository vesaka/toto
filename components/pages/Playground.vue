<template>
    <div ref="container" class="flex relative inset-0 w-full h-full justify-center items-center"></div>
</template>
<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import TotoGame from '$toto/toto';
    import options from '$toto/config/options.json';
    import assets from '$toto/config/assets.json';
    import { useAuthStore, useGameStore } from '$toto/bootstrap/stores';
    
    const container = ref(null);
    let game;
    onMounted(() => {
        game = new TotoGame({
            container: container.value,
            options,
            assets,
            $store: useGameStore()
        });
        game.load();
    });
    
    onBeforeUnmount(() => {
        game.destroy();
    });
    
</script>
