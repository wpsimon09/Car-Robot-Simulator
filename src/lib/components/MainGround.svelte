<script>
    import { onMount } from 'svelte';
    import Application from '../../Engine/main.ts'
    import { Scene } from 'three';
    import { browser } from '$app/environment';
    import { scale, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

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

<section class="flex w-[80%] h-[80%] flex-col items-center rounded-2xl ">
    <a class="speak-btn p-2 w-20 text-zinc-900 shadow-2xl duration-300 rounded-lg text-center " href="/speech">Speak</a>

    <canvas bind:this={canvas} id="maincanvas" class="h-full w-full"> </canvas>

    {#if !isStart}
    <dvi class="mt-2" transition:scale={{ duration: 400, delay: 0, opacity: 0.0, start: 0.5, easing: quintOut }} >
        <p class="text-white w-full text-center">Simulation is runnwing for: {elapsedTime} s</p>
        <p class="text-white mt-1 text-sm">Simulation speed</p>
        <input name="sim_speed" type="range"/>
    </dvi>
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


<style>
    .speak-btn {
  background: linear-gradient(to right, #e0e0e0 50%, #75c775 50%);
  background-size: 200% 100%;
  background-position: right bottom;
  transition: background-position 300ms ease-out;

}

.speak-btn:hover {
  background-position: left bottom;
}

</style>