export const addTable = async (id, name) => {
  await fetch("http://localhost:4000/addTable", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, name }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to add table");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getTable = async () => {
  try {
    const response = await fetch("http://localhost:4000/getTables");
    if (!response.ok) {
      throw new Error("Failed to fetch tables");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTable = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/removeTable/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to remove table");
    }
    console.log("Table removed successfully");
  } catch (error) {
    console.error(error);
    throw error;
  }
};
