const app = {


    init: function () {
        console.log('Nom de zeus, une app.init !');
        // Ajout de données de test, supprimer ces 2 appels lorsque l'API est branchée
        
        // On charge la liste des tâches depuis l'API
        taskManager.fetchAndInsertTasksFromApi();
     

        // On écoute la soumission du formulaire d'ajout
        document.querySelector('.create-task').addEventListener('submit', taskManager.handleCreateForm);
        

    }

};

document.addEventListener('DOMContentLoaded', app.init);
