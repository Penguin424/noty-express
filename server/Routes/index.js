const { Router } = require("express");
const webpush = require("../webpush.js");
const pdf = require("html-pdf");

const psfTemplate = require("../documents/pagare.js");
const { numeroALetras } = require("../utils/numerosAletras.js");
const path = require("path");

const router = Router();
let pushSubscription;

const PedidosCosbiome = require("../models/pedidosCosbiome.js");
const ConteosSoal = require("../models/conteosSoal.js");
const ConteosCosbiome = require("../models/conteosCosbiome.js");

router.get("/", (req, res) => {
  res.status(200).json({ ok: true, message: "Server para web notis" });
});

router.post("/subscription", async (req, res) => {
  pushSubscription = req.body;

  console.log(req.body);

  res.status(200).json();
});

router.post("/loginReg", async (req, res) => {
  const payload = JSON.stringify({
    title: "Entreada de sistema",
    message: req.body.message,
  });

  try {
    await webpush.sendNotification(pushSubscription, payload);
  } catch (error) {
    console.log(error);
  }
});

router.post("/almacenNoti", async (req, res) => {
  const payload = JSON.stringify({
    title: req.body.title,
    message: req.body.message,
  });

  try {
    await webpush.sendNotification(pushSubscription, payload);
    res.status(200).json();
  } catch (error) {
    console.log(error);
  }
});

router.post("/create-pdf", (req, res) => {
  let body = req.body;

  let textoTotal = numeroALetras(body.total, {
    plural: "PESOS",
    singular: "PESO",
    centPlural: "CENTAVOS",
    centSingular: "CENTAVO",
  });

  pdf
    .create(
      psfTemplate({
        prodcutos: body.pedidos,
        total: body.total,
        nombreRepartidor: body.nombreRepartidor,
        textoTotal: textoTotal,
        nombreAlmacen: body.almacenNombre,
        idRuta: body.idRuta,
      }),
      {}
    )
    .toFile("result.pdf", (err) => {
      if (err) {
        return res.send(Promise.reject());
      }

      return res.send(Promise.resolve());
    });
});

router.get("/fetchpdf", (req, res) => {
  res.sendFile(path.resolve("result.pdf"));
});

router.post("/pedidoCosbiome", async (req, res) => {
  let pedidosCosbiome = new PedidosCosbiome({
    numPedidos: parseInt(req.body.numPedidos),
  });

  await pedidosCosbiome.save();

  return res.status(200).json({ ok: true, pedidosCosbiome });
});

router.get("/pedidoCosbiome", async (req, res) => {
  let numPedidos = await PedidosCosbiome.findById("5f4d29056dc30b6349a68fb4");
  return res.status(200).json({ ok: true, numPedidos });
});

router.put("/pedidoCosbiome", async (req, res) => {
  let numPedidos = await PedidosCosbiome.findByIdAndUpdate(
    "5f4d29056dc30b6349a68fb4",
    {
      numPedidos: parseInt(req.body.numPedidosNuevo),
    }
  );
  return res.status(200).json({ ok: true, numPedidos });
});

router.post("/conteosSoal", async (req, res) => {
  let body = req.body;

  let conteosSoal = new ConteosSoal({
    numPedidos: parseInt(body.numPedidos),
    numClientes: parseInt(body.numClientes),
    numRutas: parseInt(body.numRutas),
  });

  await conteosSoal.save();

  return res.status(200).json({ ok: true, conteosSoal });
});

router.get("/conteosSoal", async (req, res) => {
  let conteosSoal = await ConteosSoal.findById("5f4e5c26d9d3ec54c254f431");
  return res.status(200).json({ ok: true, conteosSoal });
});

router.put("/soalRutas", async (req, res) => {
  let conteosSoal = await ConteosSoal.findByIdAndUpdate(
    "5f4e5c26d9d3ec54c254f431",
    {
      numRutas: parseInt(req.body.numRutas),
    }
  );
  return res.status(200).json({ ok: true, conteosSoal });
});

router.put("/soalPedidos", async (req, res) => {
  let conteosSoal = await ConteosSoal.findByIdAndUpdate(
    "5f4e5c26d9d3ec54c254f431",
    {
      numPedidos: parseInt(req.body.numPedidos),
    }
  );
  return res.status(200).json({ ok: true, conteosSoal });
});

router.put("/soalClientes", async (req, res) => {
  let conteosSoal = await ConteosSoal.findByIdAndUpdate(
    "5f4e5c26d9d3ec54c254f431",
    {
      numClientes: parseInt(req.body.numClientes),
    }
  );
  return res.status(200).json({ ok: true, conteosSoal });
});

router.post("/conteosCosbiome", async (req, res) => {
  let body = req.body;

  let conteosCosbiome = new ConteosCosbiome({
    numPedidos: parseInt(body.numPedidos),
    numClientes: parseInt(body.numClientes),
  });

  await conteosCosbiome.save();

  return res.status(200).json({ ok: true, conteosCosbiome });
});

router.get("/conteosCosbiome", async (req, res) => {
  let conteosCosbiome = await ConteosCosbiome.findById(
    "5f7b36ed3b77d80017b00444"
  );
  return res.status(200).json({ ok: true, conteosCosbiome });
});

router.put("/cosbiomePedidos", async (req, res) => {
  let conteosCosbiome = await ConteosCosbiome.findByIdAndUpdate(
    "5f7b36ed3b77d80017b00444",
    {
      numPedidos: parseInt(req.body.numPedidos),
    }
  );
  return res.status(200).json({ ok: true, conteosCosbiome });
});

router.put("/cosbiomeClientes", async (req, res) => {
  let conteosCosbiome = await ConteosCosbiome.findByIdAndUpdate(
    "5f7b36ed3b77d80017b00444",
    {
      numClientes: parseInt(req.body.numClientes),
    }
  );
  return res.status(200).json({ ok: true, conteosCosbiome });
});

module.exports = router;
