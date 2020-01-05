const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// como a trigger que acontece antes de salvar com esse schema
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  },
};

// metodos que podem ser usado sem a instâncias de usuário
UserSchema.statics = {
  generateToken({ id }) {
    // o segundo argumento é um secret que criptografa o token, (ver no .env)
    // ttl de 86400 milisegundos (um dia) para o token expirar e ser gerado novamente
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl,
    });
  },
};

module.exports = model('users', UserSchema);
