module.exports = {
    isProduction: false || process.env.isProduction,
    mongoDbUrl: 'mongodb+srv://shaon:shaon123@cluster0.zhl1ddx.mongodb.net/oauth-testi?retryWrites=true&w=majority' || process.env.mongoDbUrl,
    salt: 'a5828e9d6052dc3b14a93e07a5932dd9' || process.env.salt
};