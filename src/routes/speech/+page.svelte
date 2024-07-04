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
        // for (let i = 0; i < words.length; i += 2) {
        //     if (i + 1 < words.length) {
        //         let pair: string = words[i] + " " + words[i + 1];
        //         wordPairs.push(pair);
        //     }
        // }
        return wordPairs;
    }
    onMount(async () => {
        await fetchTranscription();
        apiResponse = splitSentence();
    });
</script>

{#if apiResponse.length > 0}
    <div class="w-full h-full flex flex-col items-center justify-center">
        <h1>Speech: {transcriptionResult}</h1>
        <SpeechGround {apiResponse} />
    </div>
{:else}
    <p>Loading...</p>
{/if}

<style>
</style>