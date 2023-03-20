export default function longpress(node, options) {
	let timer;

	function handeMouseDown() {
		const { duration = 2000 } = options;
		console.log(options, duration);
		timer = setTimeout(() => {
			node.dispatchEvent(new CustomEvent('longpress'));
		}, duration);
	}

	function handeMouseUp() {
		clearTimeout(timer);
	}

	node.addEventListener('mousedown', handeMouseDown);
	node.addEventListener('mouseup', handeMouseUp);

	return {
		update(newOptions) {
			options = newOptions;
			console.log(newOptions);
		},
		destroy() {
			3;
			clearTimeout(timer);
			node.removeEventListener('mousedown', handeMouseDown);
			node.removeEventListener('mouseup', handeMouseUp);
			console.log('destroyed!');
		}
	};
}
