const pool = require("../db.config");
const getCartByUserId = async (userId) => {
  const { rows } = await pool.query("SELECT * FROM CART WHERE id_user=$1", [
    userId,
  ]);
  return rows;
};
const insertCart = async (userId, product, cart) => {
  try {
    if (cart?.length) {
      let foundProduct = false;
      for (const cartProduct of cart) {
        if (cartProduct.id_product === product.id) {
          foundProduct = true;
          if (cartProduct.quantity + product.quantity > 0) {
            await pool.query(
              "UPDATE CART SET quantity=$1 WHERE id_product=$2 AND id_user=$3 ",
              [cartProduct.quantity + product.quantity, product.id, userId]
            );
            return {
              status: 200,
              message: "Added to cart",
            };
          } else {
            const response = await pool.query(
              "DELETE FROM CART WHERE id_product=$1 AND id_user=$2 ",
              [product.id, userId]
            );

            return {
              status: 200,
              message: "Added to cart",
            };
          }
        }
      }
      if (!foundProduct) {
        await pool.query(
          "INSERT INTO CART (id_user,id_product,quantity) VALUES ($1,$2,$3)",
          [userId, product.id, product.quantity]
        );

        return {
          status: 200,
          message: "Added to cart",
        };
      }
    } else {
      await pool.query(
        "INSERT INTO CART (id_user,id_product,quantity) VALUES ($1,$2,$3)",
        [userId, product.id, product.quantity]
      );

      return {
        status: 200,
        message: "Added to cart",
      };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, error: err };
  }
};
module.exports = {
  getCartByUserId,
  insertCart,
};
