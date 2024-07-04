<script>
    import { onMount } from 'svelte';
    import Application from '../../Engine/main.ts'
    import { Scene } from 'three';

    let canvas;

    let isStart = true

    function onStartSimulation(){
        if(isStart){
            isStart = false;
        }else 
            isStart = true;
    }

    onMount(()=>{
        const application = new Application(canvas);
        application.init();
    })

</script>

<section class="flex w-[90%] h-[90%] flex-col items-center rounded-2xl ">
    <canvas bind:this={canvas} id="maincanvas" class="h-full w-full"> </canvas>

    <div class="flex flex-row itmes-center">
        <button id="start" on:click={onStartSimulation} class="w-20 h-20  rounded-2xl shadow-2xl hover:w-24 hover:h-24 duration-100 mt-10">
                {#if isStart}
                <img src="/icons/play.png" alt="play"/>
                {:else}
                <img src="/icons/stop-button.png" alt="play"/>
                {/if}
        </button>
    </div>

</section>