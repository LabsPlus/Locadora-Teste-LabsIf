const express = require("express");
const CarModel = require("../models/carModel");
const CarServices = require("../services/carServices");
const CarController = require("../controllers/carController");

const router = express.Router();

const model = new CarModel();
const service = new CarServices(model);
const controller = new CarController(service);

/**
 * @swagger
 * /carros:
 *   post:
 *     summary: Adicionar um novo carro
 *     tags: [Carros]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modelo:
 *                 type: string
 *               marca:
 *                 type: string
 *               preco_aluguel:
 *                 type: number
 *     responses:
 *       201:
 *         description: Carro adicionado com sucesso
 *       400:
 *         description: Parâmetros inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/carros", controller.createCar);

/**
 * @swagger
 * /carros/alugar:
 *   post:
 *     summary: Realizar o aluguel de um carro
 *     tags: [Aluguel]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carro_id:
 *                 type: integer
 *               data_inicio:
 *                 type: string
 *               data_fim:
 *                 type: string
 *     responses:
 *       201:
 *         description: Aluguel realizado com sucesso
 *       400:
 *         description: Parâmetros inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/carros/alugar", controller.createRent);

/**
 * @swagger
 * /carros:
 *   get:
 *     summary: Listar todos os carros
 *     tags: [Carros]
 *     responses:
 *       200:
 *         description: Lista de carros obtida com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/carros", controller.getAllCars);

/**
 * @swagger
 * /carros/alugados:
 *   get:
 *     summary: Listar carros alugados
 *     tags: [Aluguel]
 *     responses:
 *       200:
 *         description: Lista de carros alugados obtida com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/carros/alugados", controller.getRentedCars);

/**
 * @swagger
 * /carros/disponiveis:
 *   get:
 *     summary: Listar carros disponíveis para aluguel
 *     tags: [Aluguel]
 *     responses:
 *       200:
 *         description: Lista de carros disponíveis obtida com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/carros/disponiveis", controller.getAvailableCars);

/**
 * @swagger
 * /carros/{id}:
 *   get:
 *     summary: Obter informações de um carro por ID
 *     tags: [Carros]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do carro a ser obtido
 *         type: integer
 *     responses:
 *       200:
 *         description: Informações do carro obtidas com sucesso
 *       404:
 *         description: Carro não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/carros/:id", controller.getCar);

/**
 * @swagger
 * /carros/{id}:
 *   put:
 *     summary: Atualizar informações de um carro por ID
 *     tags: [Carros]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do carro a ser atualizado
 *         type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modelo:
 *                 type: string
 *               marca:
 *                 type: string
 *               preco_aluguel:
 *                 type: number
 *     responses:
 *       200:
 *         description: Carro atualizado com sucesso
 *       400:
 *         description: Parâmetros inválidos
 *       404:
 *         description: Carro não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/carros/:id", controller.updateCar);

/**
 * @swagger
 * /carros/{id}:
 *   delete:
 *     summary: Excluir um carro por ID
 *     tags: [Carros]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do carro a ser excluído
 *         type: integer
 *     responses:
 *       200:
 *         description: Carro excluído com sucesso
 *       400:
 *         description: Não é possível excluir um carro que está alugado
 *       404:
 *         description: Carro não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/carros/:id", controller.deleteCar);

module.exports = router;