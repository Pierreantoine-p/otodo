const { Task } = require('../models');

const taskController = {

     async listTasks(req, res) {
        // Récupérer la liste des taches
        // Renvoyer la liste des taches en json
        try {
            const tasks = await Task.findAll({

            });
            res.json(tasks);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send("erreur serveur");
        }
        },

        async listCreat(req, res) {
            try {
                const name = req.body.name;
                const tasks = await Task.create({
                    name: name,
                })
                res.json(tasks);

            } catch (error) {
                console.log(error);
                res.status(500);
                res.send("erreur serveur");
            }

        },
        async listUpDate(req, res){
            try {
                const { id } = req.params;
                const {name} = req.body;
                const task = await Task.update({
                    name: name
                },{
                    where: {id : parseInt(id)}
                })
                task.save();
            } catch (error) {
                console.log(error);
                res.status(500);
                res.send("erreur serveur");
            }
        },


        async listDestroy (req, res){
            try {
                const { id }= req.params;
                const task = await Task.findByPk(parseInt(id));
                task.destroy();
                res.send(`liste ${task.name} supprimée`)
            } catch (error) {
                console.log(error);
                res.status(204);
                res.send("No content");
            }
        }
};

module.exports = taskController;
