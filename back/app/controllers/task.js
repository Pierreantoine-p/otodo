const { Task } = require('../models');

const taskController = {
    
    //catch les tâches
     async listTasks(req, res) {
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

    //create les tâches
    async taskCreat(req, res) {
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

    //upDate task
    async taskUpDate(req, res){
        try {
            const { id } = req.params;
            const {name} = req.body;
            const task = await Task.update({
            name: name
            },{
            where: {id : parseInt(id)}
            })
            task.save();
        }catch (error) {
            console.log(error);
            res.status(500);
            res.send("erreur serveur");
        }
    },

    // delete tasl
    async taskDestroy (req, res){
        try {
            const { id }= req.params;
            const task = await Task.findByPk(parseInt(id));
            task.destroy();
            res.send(`liste ${task.name} supprimée`)
        } catch (error) {
            console.log(error);
            res.res.send("No content");
        }
    }
};

module.exports = taskController;
