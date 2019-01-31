import express from 'express';
import expressValidation from 'express-validation';
import bodyParser from 'body-parser';
import routes from '../server/router/index';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/v1' / routes);

app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        res.status(err.status).json(err);
    }
}) 