const express = require('express');
const router = express.Router();
const taskController = require('./controllers/task');

// Route pour la liste des taches
router.get('/tasks', taskController.listTasks);

// Route pour ajouter une tache
router.post('/tasks', taskController.listCreat);
// Route pour modifier une tache
router.put('/tasks/:id',taskController.listUpDate)
// Route pour supprimer une tache
router.delete('/tasks/:id',taskController.listDestroy)

module.exports = router;
