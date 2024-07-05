<script>
    import { onMount } from 'svelte';
    import Application from '../../Engine/speechMain.ts'
    import { Scene } from 'three';
    let canvas;
    export let apiResponse;
    onMount(()=>{
        const application = new Application(canvas);
        application.init(apiResponse);
    })
</script>

<section class="flex  w-[80%] h-[80%] flex-col items-center rounded-2xl ">
    <canvas bind:this={canvas} id="maincanvas" class="h-full w-full"> </canvas>

</section>