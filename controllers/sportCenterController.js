
import SportCenter from "../data/model/SportCenter.js"
import sportCenter from "../data/model/SportCenter.js";

const insertSportCenter = async (req, res) => {
    try {
        const sportCenter = new SportCenter(req.body);
        const insertSportCenterResponse = await sportCenter.save();
        console.log(insertSportCenterResponse);
        res.status(200).json(insertSportCenterResponse);

    } catch (e) {
        if (e.code === 11000) { // Código de error de MongoDB para duplicados
            res.status(400).json({ message: 'El nombre o imagen del centro deportivo ya existe.' });
        } else {
            console.error(e);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
        console.error(e);
    }
};

const getSportCenters = async (req, res) => {
    try {
        const sportCenters = await SportCenter.find();
        res.status(200).json(sportCenters);
    } catch (e) {
        res.status(500).json({ message: 'Error interno del servidor.' });
        console.error(e);
    }
};

export { insertSportCenter, getSportCenters };