const async = require('async');
const Erc20Contracts = require('../models/Erc20Contracts');

function Erc20ContractsRepository () {}

Erc20ContractsRepository.prototype.fetchContract = function (contractAddress, next) {
    return Erc20Contracts.findOne({contract_address: contractAddress}, function(err, row) {
        return next(err, row);
    });
};

Erc20ContractsRepository.prototype.updateTotalSupply = function (contractAddress, totalSupply, next) {
    return Erc20Contracts.update({contract_address: contractAddress}, {total_supply: totalSupply}, function(err, row) {
        return next(err, row);
    });
};

Erc20ContractsRepository.prototype.createOrUpdateTx = function (data, next) {
    return Erc20Contracts.findOneAndUpdate({tx_hash: data.tx_hash, vout_idx: data.vout_idx}, data, {upsert: true, new: true}, function(err, row) {
        return next(err, row);
    });

};

module.exports = Erc20ContractsRepository;