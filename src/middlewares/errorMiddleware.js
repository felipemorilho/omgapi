
const errorMiddleware = (err, req, res, next) => {

    console.log(err.stack);
    res.status(500).json({ error: 'Algo deu errado! Tenta novamente.'})
};

export default errorMiddleware;