<template>
  <section class="progress-bar">
        <progress class="progress is-primary" :value="progressValue" :max="100"></progress>
        <div class="progress-value"><slot></slot></div>
    </section>
</template>

<script>
export default {
    props: ['progressValue']
}
</script>

<style>
    .progress-bar {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    }

    .progress-bar .progress {
        height: 25px;
        margin-bottom: 0;
    }
    .progress-value{
        position: absolute;
        font-family: 'MontBold', sans-serif;
}
</style>
