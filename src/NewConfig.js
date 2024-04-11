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
      console.log("Failed to fetch tables");
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

export const addProduct = async (id, name, price, type) => {
  let fileName;
  if (type === "drink") {
    fileName = "drinkData";
  } else if (type === "food") {
    fileName = "foodData";
  }
  await fetch("http://localhost:4000/addProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, name, price, type, fileName }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to add product");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getProducts = async (type) => {
  try {
    const response = await fetch(`http://localhost:4000/getProducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type }),
    });
    if (!response.ok) {
      console.log("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteDrink = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/deleteDrink/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to remove table");
    }
    console.log("Drink removed successfully");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteFood = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/deleteFood/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to remove table");
    }
    console.log("Food removed successfully");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProduct = async (id, name, price, type) => {
  let fileName;
  if (type === "drink") {
    fileName = "drinkData";
  } else if (type === "food") {
    fileName = "foodData";
  }
  await fetch("http://localhost:4000/updateProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, name, price, type, fileName }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to update product");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
};

export const addOrder = async (order) => {
  await fetch("http://localhost:4000/addOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to add order");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getOrdersWithTableId = async (tableId) => {
  try {
    const response = await fetch(`http://localhost:4000/getOrdersWithTableId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tableId }),
    });
    if (!response.ok) {
      console.log("Failed to fetch orders with tableId");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteOrderWithTableId = async (tableId, orderId) => {
  await fetch("http://localhost:4000/deleteOrderWithTableId", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tableId, orderId }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to update product");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
};

export const addCredit = async (newCredit) => {
  await fetch("http://localhost:4000/addCredit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newCredit }),
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

export const getCredits = async () => {
  try {
    const response = await fetch("http://localhost:4000/getCredits");
    if (!response.ok) {
      console.log("Failed to fetch credits");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCreditWithOwnerName = async (ownerName) => {
  try {
    const response = await fetch(
      `http://localhost:4000/getCreditWithOwnerName`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ownerName }),
      }
    );
    if (!response.ok) {
      console.log("Failed to fetch credit with ownerName");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCredit = async (ownerName) => {
  try {
    const response = await fetch(
      `http://localhost:4000/deleteCredit/${ownerName}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to remove table");
    }
    console.log("Food removed successfully");
  } catch (error) {
    console.error(error);
    throw error;
  }
};
