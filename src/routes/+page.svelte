<script lang="ts">
    import MainGround from "../lib/components/MainGround.svelte";
    import { onMount } from "svelte";

    let transcriptionResult: string = "";

    async function fetchTranscription() {
        try {
            const response = await fetch("http://localhost:5000/get-file"); // Adjust endpoint as per your API
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            transcriptionResult = data.content; // Adjust based on your API response structure
        } catch (error) {
            console.error("Error fetching transcription:", error);
            // Handle error scenario
        }
    }

    const LEFT: string = "turn left";
    const RIGHT: string = "turn right";
    const FORWARD: string = "go forward";
    const BACKWARDS: string = "go backwards";

    let orders: string[] = [];

    function splitSentence() {
        let words: string[] = transcriptionResult.split(" ");
        console.log(words);
        let wordPairs: string[] = [];
        for (let i = 0; i < words.length; i += 2) {
            if (i + 1 < words.length) {
                let pair: string = words[i] + " " + words[i + 1];
                wordPairs.push(pair);
            }
        }
        orders = wordPairs;
        console.log(orders);
    }

    function translateToOrders() {
        orders.forEach((order: string) => {
            switch (order) {
                case LEFT:
                    console.log("car turned left");
                    break;
                case RIGHT:
                    console.log("car turned right");
                    break;
                case FORWARD:
                    console.log("car went forward");
                    break;
                case BACKWARDS:
                    console.log("car went backwards");
                    break;

                default:
                    break;
            }
        });
    }

    onMount(() => {
        fetchTranscription();
    });
</script>


<div class="w-full h-full flex flex-col items-center justify-center">
    <MainGround/>
</div>

<style>
</style>
