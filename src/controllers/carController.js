class CarController {
  constructor(carService) {
    this.carService = carService;
  }

  createCar = async (req, res) => {
    const car = req.body;
    const validation = validateCarData(car);

    if (!validation.valid) return res.status(400).json({ message: validation.error });
    
    try {
      const insertedID = await this.carService.createCar(car);
      res.status(201).json({ message: "Carro adicionado com sucesso", id: insertedID });
    }
    catch (e) {
      res.status(500).json({ message: "Erro ao adicionar o carro", e: e.message });
    }
  }

  createRent = async (req, res) => {
    const rent = req.body;
    
    if (!rent) return { valid: false, error: "Corpo da solicitação vazio" };
    if (!rent.carro_id || !rent.data_inicio || !rent.data_fim) return res.status(400).json({ message: "Campos obrigatórios ausentes" });
    if (!isValidDateTime(rent.data_inicio, rent.data_fim)) return res.status(400).json({ message: "Data inválida" });

    const car = await this.carService.carExists(rent.carro_id);

    if (!car) return res.status(400).json({ message: "Carro não encontrado" });
    
    const isCarAvailable = await this.carService.isCarAvailable(rent.carro_id);
  
    if (!isCarAvailable) return res.status(400).json({ message: "Carro não está disponível para aluguel" });
    
    try {
      const insertedID = await this.carService.createRent(rent);
      res.status(201).json({ message: "Aluguel realizado com sucesso", id: insertedID });
    } 
    catch (e) {
      res.status(500).json({ message: "Erro ao realizar aluguel", error: e.message });
    }
  }

  getAllCars = async (_, res) => {
    try {
      const cars = await this.carService.getAllCars();
      res.status(200).json(cars)
    }
    catch (e) {
      res.status(500).json({ message: "Erro ao listar carros", e: e.message });
    }
  }

  getCar = async (req, res) => {
    const id = req.params.id;
    try {
      const car = await this.carService.getCar(id);
      if (!car) return res.status(404).json({ message: "Carro não encontrado" });
      res.status(200).json(car); 
    }
    catch (e) {
      res.status(500).json({ message: "Erro ao buscar carro", e: e.message });
    }
  }

  updateCar = async (req, res) => {
    const id = req.params.id;
    const car = req.body;
    const validation = validateCarData(car);

    if (!validation.valid) return res.status(400).json({ message: validation.error });
    
    try {
      const updatedCar = await this.carService.updateCar(id, car);
      if (!updatedCar) return res.status(404).json({ message: "Carro não encontrado" });
      res.status(200).json({ message: "Carro atualizado com sucesso" });
    }
    catch (e) {
      res.status(500).json({ message: "Erro ao atualizar o carro", e: e.message });
    }
  }

  deleteCar = async (req, res) => {
    const id = req.params.id;
    
    const isCarAvailable = await this.carService.isCarAvailable(parseInt(id));

    if (!isCarAvailable) return res.status(400).json({ message: "Não é possível excluir um carro que está alugado" });
    
    try {
      const deletedCar = await this.carService.deleteCar(id);
      if (!deletedCar) return res.status(404).json({ message: "Carro não encontrado" });
      res.status(200).json({ message: "Carro excluido com sucesso" });
    }
    catch (e) {
      return res.status(500).json({ message: "Erro ao excluir carro" });
    }
  }

  getRentedCars = async (_, res) => {
    try {
      const cars = await this.carService.getRentedCars();
      res.status(200).json(cars);
    }
    catch (e) {
      res.status(500).json({ message: "Erro ao listar carros alugados", e: e.message });
    }
  }

  getAvailableCars = async (_, res) => {
    try {
      const cars = await this.carService.getAvailableCars();
      res.status(200).json(cars);
    }
    catch (e) {
      res.status(500).json({ message: "Erro ao listar carros disponiveis", e: e.message });
    }
  }
}

const validateCarData = (car) => {
  if (!car) return { valid: false, error: "Corpo da solicitação vazio" };
  if (!car.modelo || !car.marca || !car.preco_aluguel) return { valid: false, error: "Campos obrigatórios ausentes" };
  if (
    typeof car.modelo !== "string" ||
    typeof car.marca !== "string" ||
    typeof car.preco_aluguel !== "number"
  ) return { valid: false, error: "Tipos de dados inválidos" };
  
  return { valid: true, error: null };
};

const isValidDateTime = (startTime, endTime) => {
  const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
  if (!dateTimeRegex.test(startTime) || !dateTimeRegex.test(endTime)) return false;
  
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const now = new Date();

  if (startDate >= endDate) return false;
  if (endDate <= now) return false;

  return true;
};

module.exports = CarController;