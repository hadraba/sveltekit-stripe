<script>
	import { onMount, onDestroy } from "svelte";
  import { page } from '$app/stores';
  export let mode;
  
  onMount(() => {

    // @ts-ignore
    window.showMode = mode;
    // @ts-ignore
    if(window.scriptLoaded === undefined) {
      addScript("/static/p5.min.js");
      addScript("//cdnjs.cloudflare.com/ajax/libs/seedrandom/2.3.10/seedrandom.min.js");
      addScript("/static/sketch.js");
      addScript("/static/controls.js");
      addScript("/static/helpers.js");
    }
    
    function addScript(url) {
      let script = document.createElement('script');
      script.setAttribute('src', url);
      document.head.appendChild(script);
    }
  });

  onDestroy(() => {
    console.log("destroy");
  });


</script>

  <div id="ui-checkboxes" class={mode}>
    <input type="checkbox" id="ch1" name="ch1"><label for="ch1">ch01</label>
    <input type="checkbox" id="ch2" name="ch2"><label for="ch2">ch02</label>
    <input type="checkbox" id="ch3" name="ch3"><label for="ch3">ch03</label>
    <input type="checkbox" id="ch4" name="ch4"><label for="ch4">ch04</label>
    <input type="checkbox" id="ch5" name="ch5"><label for="ch5">ch05</label>
    <input type="checkbox" id="ch6" name="ch6"><label for="ch6">ch06</label>
    <input type="checkbox" id="ch7" name="ch7"><label for="ch7">ch07</label>
    <input type="checkbox" id="ch8" name="ch8"><label for="ch8">ch08</label>
    <input type="checkbox" id="ch9" name="ch9"><label for="ch9">ch09</label>
    <input type="checkbox" id="ch10" name="ch10"><label for="ch10">ch10</label>
    <input type="checkbox" id="ch11" name="ch11"><label for="ch11">ch11</label>
    <input type="checkbox" id="ch12" name="ch12"><label for="ch12">ch12</label>
    <input type="checkbox" id="ch13" name="ch13"><label for="ch13">ch13</label>
    <input type="checkbox" id="ch14" name="ch14"><label for="ch14">ch14</label>
    <input type="checkbox" id="ch15" name="ch15"><label for="ch15">ch15</label>
    <input type="checkbox" id="ch16" name="ch16"><label for="ch16">ch16</label>
    <input type="checkbox" id="ch17" name="ch17"><label for="ch17">ch17</label>
    <input type="checkbox" id="ch18" name="ch18"><label for="ch18">ch18</label>
    <input type="checkbox" id="ch19" name="ch19"><label for="ch19">ch19</label>
    <input type="checkbox" id="ch20" name="ch20"><label for="ch20">ch20</label>
    <input type="checkbox" id="ch21" name="ch21"><label for="ch21">ch21</label>
    <input type="checkbox" id="ch22" name="ch22"><label for="ch22">ch22</label>
    <input type="checkbox" id="ch23" name="ch23"><label for="ch23">ch23</label>
    <input type="checkbox" id="ch24" name="ch24"><label for="ch24">ch24</label>
    <input type="checkbox" id="ch25" name="ch25"><label for="ch25">ch25</label>
  </div>

  {#if mode === "generate"}
    <button id="resetter">Reset</button>
    <button id="randomizer">Generate random</button>
    <button id="save">Save</button>
  {/if}

  <style>
    .preview {
      display: none;
    }
  </style>




