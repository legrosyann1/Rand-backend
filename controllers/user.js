import {userModel} from "../models/userEconomics.js"

export const getUser = async (req, res) => {
  userModel.findOne({name: 'Pol Martin'}, (err, data) => {
    if (err) {
      res.status(404).json({ error: error.message })
    } else {
      res.status(200).json(data);
    }
  });
}

export const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new userModel(user)
  newUser.save((err, data) => {
    if (err) {
      res.status(409).json({ error: error.message })
    } else {
      res.status(201).json(data);
    }
  });
}

export const getBalance = async (req, res) => {
  userModel.findOne({name: 'Pol Martin'}, 'balance', (err, data) => {
    if (err) {
      res.status(404).json({ error: error.message })
    } else {
      res.status(200).json(data);
    }
  });
}

export const addBalance = (req, res) => {
  const balance = req.body.amount;
  userModel.findOneAndUpdate({name: 'Pol Martin'}, {$inc: {balance: balance}}, {new: true}, (err, data) => {
    if (err){
      res.status(409).json({ error: error.message })
    } else {
      res.status(201).json(data);
    }
  })
}

export const getVaults = async (req, res) => {
  userModel.findOne({name: 'Pol Martin'}, 'vaults', (err, data) => {
    if (err) {
      res.status(404).json({ error: error.message })
    } else {
      res.status(200).json(data);
    }
  });
}

export const addVault = async (req, res) => {
  const vaults = req.body;
  userModel.findOneAndUpdate({name: 'Pol Martin'}, {$inc: {balance: -vaults.amount}}, {new: true}, (err, data) => {
    if (err){
      res.status(409).json({ error: error.message })
    } else {
      data.vaults.push(vaults);
      data.save((err, user) => {
        if (err) {
          res.status(409).json({ error: error.message })
        } else {
          let Vault = null;
          for (let i = 0; i < user.vaults.length; i++) {
            if(user.vaults[i].name == vaults.name){
              Vault = user.vaults[i]
            }
          }
          res.status(201).json(Vault);
        }
      });
    }
  })
}

export const removeVault = async (req, res) => {
  userModel.findOne({name: 'Pol Martin'}, (err, user) => {
    if (err){
      res.status(409).json({ error: err.message })
    } else {
      const balance = user.vaults.id(req.params.id).amount;
      userModel.findOneAndUpdate({name: 'Pol Martin'}, {$inc: {balance: balance}}, {new: true}, (err, data) => {
        if (err) {
          res.status(409).json({ error: err.message })
        } else {
          const removedVault = data.vaults.id(req.params.id);
          data.vaults.id(req.params.id).remove();
          data.save((err, final) => {
            if (err) {
              res.status(409).json({ error: err.message })
            } else {
              res.status(201).json(removedVault);
            }
          });
        }
      });
    }
  })
}