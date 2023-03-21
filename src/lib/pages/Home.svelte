<script>
    import VideoPlayer from '../VideoPlayer.svelte';
    import videoLink from '$lib/TestingVideo.mp4'
</script>

<div class="flex">
<VideoPlayer height={150} width={200} src={videoLink}></VideoPlayer>
<VideoPlayer height={150} width={200} src={videoLink}></VideoPlayer>
<VideoPlayer height={150} width={200} src={videoLink}></VideoPlayer>
</div>