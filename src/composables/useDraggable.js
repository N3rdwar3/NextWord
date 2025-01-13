export function useDraggable() {
    function dragStart(event) {
        event.dataTransfer.dropEffect = "move";
        const [x, y] = [event.pageX, event.pageY];
        console.log(`The element is being dragged at (${x}, ${y})`);
    }
    function dragShuffle(event) {
        const [x, y] = [event.pageX, event.pageY];
    }

    function dragAdd(event) {
        let data = event.dataTransfer.getData();
    }

    return {dragStart, dragShuffle, dragAdd}
}