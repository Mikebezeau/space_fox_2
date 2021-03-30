export function handleSpeedUp(setPlayer) {
  //console.log(player);
  setPlayer((prev) => ({
    ...prev,
    speed: prev.speed + 0.2,
    speedMessage: "SPEED " + (prev.speed + 0.2).toFixed(1),
  }));
}

export function handleSpeedDown(setPlayer) {
  setPlayer((prev) => ({
    ...prev,
    speed: prev.speed - 0.2,
    speedMessage: "SPEED " + (prev.speed - 0.2).toFixed(1),
  }));
}

export function handleToggleOrbit(setPlayer) {
  setPlayer((prev) => ({
    ...prev,
    orbit: prev.nearPlanet && !prev.orbit ? 1 : 0,
    //orbitMessage:""
  }));
  //console.log(player.orbit, player.nearPlanet, player.orbiting);
}
