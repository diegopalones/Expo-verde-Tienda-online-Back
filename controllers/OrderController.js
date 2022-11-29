const { Order, Product } = require("../models/index.js");

const OrderController = {
  async createOrder(req, res){
    try{
    const order = await Order.create ({...req.body,date: new Date(),
      status: "in process",UserId:req.user.id})
    order.addProduct(req.body.ProductId)
    res.send({msg:"Pedido creado", order})
  } catch (error){
      console.error(error)
      res.status(500).send({msg:"No me has creado el pedido socio...", error})
  }
  },


async getOrdersAndProducts(req, res) {
  try {
    const categories = await Order.findAll({
      include: [{ model: Product, attributes: ["name","price"], through: { attributes: [] } }],
    });
    res.send({ msg: "Tus pedidos y productos", categories });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error al traer tus categorias y productos", error });
  }}

};
module.exports = OrderController;
