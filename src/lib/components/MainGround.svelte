<script>
    import { onMount } from 'svelte';
    import Application from '../../Engine/main.ts'
    import { Scene } from 'three';

    let canvas;

    onMount(()=>{
        const application = new Application(canvas);
        application.init();
    })

</script>

<section class="flex w-full h-full flex-col items-center rounded-2xl bg-red-200">
    <canvas bind:this={canvas} id="maincanvas" class="h-full w-full"> </canvas>
</section>