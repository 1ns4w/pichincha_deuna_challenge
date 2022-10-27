import { Router } from "express"
import {
    excercise1Controller,
    excercise2Controller,
    excercise3Controller,
    excercise4Controller
} from "../../controllers/excercises";

const excercisesRouter = Router();

excercisesRouter.get('/1', (req, res) => {
    try {
        excercise1Controller(req, res);
    } catch (error) {
        res.status(500).send(error);
    }
});

excercisesRouter.get('/2', (req, res) => {
    try {
        excercise2Controller(req, res);
    } catch (error) {
        res.status(500).send(error);
    }
});

excercisesRouter.get('/3', (req, res) => {
    try {
        excercise3Controller(req, res);
    } catch (error) {
        res.status(500).send(error);
    }
});

excercisesRouter.get('/4/reportFromTribe/:tribe', (req, res) => {
    try {
        excercise4Controller(req, res);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default excercisesRouter