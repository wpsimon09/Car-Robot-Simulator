<script lang="ts">
    import { onMount } from "svelte";
    import SpeechGround from "../../lib/components/SpeechGround.svelte";
    let transcriptionResult: string = "";
    let apiResponse: string[] = [];
    async function fetchTranscription() {
        try {
            const response = await fetch("http://localhost:5000/get-file");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            transcriptionResult = data.content;
            console.log(transcriptionResult);
        } catch (error) {
            console.error("Error fetching transcription:", error);
        }
    }
    function splitSentence() {
        let words: string[] = transcriptionResult.split(" ");
        let wordPairs: string[] = words;
        return wordPairs;
    }
    onMount(async () => {
        await fetchTranscription();
        apiResponse = splitSentence();
    });
</script>

{#if apiResponse.length > 0}
    <div class="w-full h-full flex flex-col items-center justify-center">
        <a class="speak-btn p-2 w-20 text-zinc-900 shadow-2xl duration-300 rounded-lg text-center " href="/">Draw</a>
        <h1 class="text-white">Speech: {transcriptionResult}</h1>
        <SpeechGround {apiResponse} />
    </div>
{:else}
    <p>Loading...</p>
{/if}

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