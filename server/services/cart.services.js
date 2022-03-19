const pool = require("../middleware/db.middleware");
const getCartByUserId = async (userId) => {
  const { rows } = await pool.query("SELECT * FROM CART WHERE id_user=$1", [
    userId,
  ]);
  return rows;
};
module.exports = {
  getCartByUserId,
};
