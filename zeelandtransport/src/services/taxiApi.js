export async function getStations() {
  try {
    const res = await fetch(`http://localhost:8080/stations`);
    if (!res.ok)
      throw new Error("Helaas konden er geen stations ingeladen worden");
    const data = await res.json();
    if (data.Response === "False") throw new Error("Stations not Found");
    return data;
  } catch (err) {
    throw Error(err.message);
  }
}

export async function SetData() {
  try {
    const res = await fetch(`http://localhost:8080/stations`, {
      method: "PUT",
    });
    if (!res.ok) throw new Error("Stations not set");
    const data = await res.json();
    if (data.Response === "False") throw new Error("Stations not Found");
    return "success";
  } catch (err) {
    throw Error(err.message);
  }
}
