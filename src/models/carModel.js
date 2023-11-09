const db = require("../../database");

class CarModel {
  createCar = (car) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO carro (modelo, marca, preco_aluguel, descricao, categoria) VALUES (?, ?, ?, ?, ?)",
        [car.modelo, car.marca, car.preco_aluguel, car.descricao, car.categoria],
        (e, result) => {
          if (e) reject(new Error(`Erro ao criar um novo carro: ${e.message}`));
          else resolve(result.insertId);
        }
      );
    });
  }

  createRent = (rent) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO aluguel (carro_id, data_inicio, data_fim) VALUES (?, ?, ?)",
        [rent.carro_id, rent.data_inicio, rent.data_fim],
        (e, result) => {
          if (e) reject(new Error(`Erro ao criar um aluguel: ${e.message}`));
          else resolve(result.insertId);
        }
      );
    });
  }

  getAllCars = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM carro", (e, result) => {
        if (e) reject(new Error(`Erro ao listar os carros: ${e.message}`));
        else resolve(result);
      });
    });
  }

  getCar = (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM carro WHERE ID = ?",
        [id],
        (e, result) => {
          if (e) reject(new Error(`Erro ao buscar o carro: ${e.message}`));
          else {
            if (result.length === 0) resolve(null);
            else resolve(result[0]);
          }
        }
      );
    });
  }

  updateCar = (id, car) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE carro SET modelo = ?, marca = ?, preco_aluguel = ?, descricao = ?, categoria = ? WHERE ID = ?",
        [car.modelo, car.marca, car.preco_aluguel, car.descricao, car.categoria, id],
        (e, results) => {
          if (e) reject(new Error(`Erro ao atualizar o carro: ${e.message}`));
          else resolve(results.affectedRows > 0);
        }
      );
    });
  }

  deleteCar = (carId) => {
    return new Promise(async (resolve, reject) => {
      const rentals = await this.getRentals(carId);
  
      if (rentals.length === 0) {
        db.query("DELETE FROM carro WHERE ID = ?", [carId], (e, result) => {
          if (e) reject(e);
          else resolve(result.affectedRows > 0);
        });
      } 
      else {
        db.query("DELETE FROM aluguel WHERE carro_id = ?", [carId], (e) => {
          if (e) reject(e);
          else {
            db.query("DELETE FROM carro WHERE ID = ?", [carId], (e, result) => {
              if (e) reject(err);
              else resolve(result.affectedRows > 0);
            });
          }
        });
      }
    });
  };

  getRentals = (carId) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM aluguel WHERE carro_id = ?", [carId], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  getRentedCars = () => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT a.ID AS aluguel_id, c.*, a.data_inicio, a.data_fim
        FROM carro c
        INNER JOIN aluguel a ON c.ID = a.carro_id
        WHERE a.data_fim > NOW()
        `,
        (e, result) => {
          if (e) reject(new Error(`Erro ao buscar carros alugados: ${e.message}`));
          else {
            const rentedCars = result.map((row) => ({
              aluguel_id: row.aluguel_id,
              carro: {
                ID: row.ID,
                modelo: row.modelo,
                marca: row.marca,
              },
              data_inicio: row.data_inicio,
              data_fim: row.data_fim,
            }));
            resolve(rentedCars);
          }
        }
      );
    });
  }

  getAvailableCars = () => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT c.*
        FROM carro c
        LEFT JOIN aluguel a ON c.ID = a.carro_id
        WHERE a.carro_id IS NULL
        `,
        (e, result) => {
          if (e) reject(new Error(`Erro ao buscar carros disponíveis: ${e.message}`));
          else resolve(result);
        }
      );
    });
  }
}

module.exports = CarModel;