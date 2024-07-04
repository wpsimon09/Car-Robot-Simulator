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

<section class="flex w-1/2 h-1/2 flex-col items-center rounded-2xl bg-red-200">
    <canvas bind:this={canvas} id="maincanvas" class="h-full w-full"> </canvas>
</section>