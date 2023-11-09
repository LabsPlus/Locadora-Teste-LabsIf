class CarServices {
  constructor(CarModel) {
    this.CarModel = CarModel
  }

  createCar = (car) => {
    return this.CarModel.createCar(car);
  }

  createRent = (rent) => {
    return this.CarModel.createRent(rent);
  }

  getAllCars = () => {
    return this.CarModel.getAllCars();
  }

  getCar = (id) => {
    return this.CarModel.getCar(id);
  }

  updateCar = (id, car) => {
    return this.CarModel.updateCar(id, car);
  }

  deleteCar = (id) => {
    return this.CarModel.deleteCar(id);
  }

  getRentedCars = () => {
    return this.CarModel.getRentedCars();
  };

  getAvailableCars = () => {
    return this.CarModel.getAvailableCars();
  };

  isCarAvailable = async (carId) => {
    const rentedCars = await this.CarModel.getRentedCars();
    return !rentedCars.some((rentedCar) => rentedCar.carro.ID === carId);;
  };

  carExists = async (carId) => {
    const car = await this.CarModel.getCar(carId);
    return car !== null;
  }
}

module.exports = CarServices;