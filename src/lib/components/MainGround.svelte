<script>
    import { onMount } from 'svelte';
    import Application from '../../Engine/main.ts'
    import { Scene } from 'three';

    let canvas;

    let isStart = true

    let startTime = 0;

    let timer

    let elapsedTime=0;

    function onStartSimulation(){
        if(isStart){
            isStart = false;
            elapsedTime = 0;
        }else 
            isStart = true;
            timer = setInterval(() => {
                elapsedTime += 1;
            }, 1000);
            }

    onMount(()=>{
        const application = new Application(canvas);
        application.init();
    })

</script>

<section class="flex w-[90%] h-[90%] flex-col items-center rounded-2xl ">
    <canvas bind:this={canvas} id="maincanvas" class="h-full w-full"> </canvas>

    {#if !isStart}

        <p class="text-white w-full text-center">Simulation is runnwing for: {elapsedTime} s</p>
    {/if}

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