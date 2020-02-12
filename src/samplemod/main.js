function start() {
	console.log("Hello I am a sample mod");
	socket.on("M", () => {
		console.log(Object.keys(world.room.players).length + " Players are online");
	});
}
{
	let w = World.prototype.login;
	World.prototype.login = (t) => {
		w(t)
		start();
	};
}