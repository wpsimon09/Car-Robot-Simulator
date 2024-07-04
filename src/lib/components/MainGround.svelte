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

<section class="flex w-[90%] h-[90%] flex-col items-center rounded-2xl ">
    <canvas bind:this={canvas} id="maincanvas" class="h-full w-full"> </canvas>

    <button id="start" class="w-40 h-10 rounded-2xl shadow-2xl bg-slate-200 mt-10">Start</button>

</section>