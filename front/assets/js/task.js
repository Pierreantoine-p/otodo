const taskManager = {
    apiEndpoint: 'http://localhost:3000',


    /**
     * Récupére la liste des tâches depuis l'API.
     */
    fetchAndInsertTasksFromApi: async function (event) {


        // Récupère la liste des tâches à l'aide de la fonction fetch()
        const urlToCall = `${taskManager.apiEndpoint}/tasks`;
        const response = await fetch(urlToCall);
        // Boucle sur la liste des tâches
        if (response.ok) {
            const tasks = await response.json();
            for (const task of tasks) {
                console.log(task);
                // pour chaque tâche appeler la fonction insertTaskInHtml()
                taskManager.insertTaskInHtml(task);
            };
        }
        else{
            console.log('l\'API est allé à plus de 88 miles à l\'heure');
        }

    },

    /**
     * Permet de créer une nouvelle tâche sur la page HTML. 
     * La fonction a un paramètre, un objet contenant les données de la tâche. 
     * Il est composé de 2 propriétés : l'id de la tâche et son nom.
     * 
     * Exemple : 
     * {
     *   id: 5,
     *   name: 'Faire les courses'
     * } 
     * 
     * @param {Object} taskData 
     */
    insertTaskInHtml: function (taskData) {

        // On récupère le HTML d'une tâche dans le template
        const taskTemplate = document.querySelector('.template-task');
        const newTask = document.importNode(taskTemplate.content, true);

        // On insère les données de la tâche dans le HTML
        newTask.querySelector('.task__name').textContent = taskData.name;
        newTask.querySelector('.task__input-name').value = taskData.name;
        newTask.querySelector('.task__input-id').value = taskData.id;
        newTask.querySelector('.task').dataset.id = taskData.id;

        // On écoute les événements sur les éléments créés
        newTask.querySelector('.task__delete').addEventListener(
            'click', taskManager.handleDeleteButton);
        
        newTask.querySelector('.task__edit').addEventListener(
            'click', taskManager.handleEditButton);

        newTask.querySelector('.task__edit-form').addEventListener(
            'submit', taskManager.handleEditForm);

        
        // On insère le HTML de la tâche dans la page
        document.querySelector('.tasks').append(newTask);

    },

    /**
     * Cette fonction est appelée quand le formumaire de création de tâche est soumis. 
     * 
     * @param {Event} event 
     */
     handleCreateForm: async function (event) {
        // Bloquer l'envoie du formulaire
        event.preventDefault();

        // Récupérer les données du formulaire
        const taskFormData = new FormData(event.currentTarget);

        if(event.target.closest('.create-task').querySelector("input").value!== ""){
            // Envoyer les données à l'API
            const urlToCall = taskManager.apiEndpoint + "/tasks";
            const fetchOptions = {
                method : "POST",
                body: taskFormData
            };
            // Après confirmation de l'API insérer la tâche dans la page (il y a une fonction toute prete pour ça ;) 
            const response = await fetch (urlToCall, fetchOptions);
            if (response.ok){
                const task = await response.json();
                taskManager.insertTaskInHtml(task);
                event.target.closest('.create-task').querySelector("input").value = "";
            }
            // en utilisant la valeur de retour de l'API
        }else{
            alert("Un champs est vide")
        }
    },

    
    /**
     * Cette fonction est appelée quand l'utilisateur appuie sur le bouton de suppression.
     * 
     * @param {Event} event 
     */
    handleDeleteButton: async function (event) {
        // let result = confirm ("Etes vous sûr de vouloir supprimer cette carte ?");
        // // On récupère l'ID de l'élément à supprimer
        if(event) {

            const taskHtmlElement = event.currentTarget.closest('.task');
            const taskId = taskHtmlElement.dataset.id;
            const response = await fetch(taskManager.apiEndpoint + "/tasks/" + taskId,
            {
                method : "DELETE"
            });
            if(response.ok){
                console.log("La carte a été détruite");
                taskHtmlElement.remove();
            }
            else{
                console.log("La suppression de la carte à échoué ");
            } 
            taskManager.showNotification()
            const myTimeout = setTimeout("taskManager.hideNotification()", 5000)

            console.log(myTimeout)
        }


        // On envoie la requete de suppression à l'API

        // On supprime l'élément dans la page HTML

    },

    
    hideNotification(){
        document.querySelector(".notification").classList.add("hidden");
    },

    showNotification(){
        document.querySelector('.notification').classList.remove("hidden")
    },

    /**
     * Cette fonction est appelée lors du click sur le bouton "modifier une tâche"
     * 
     * @param {Event} event 
     */
    handleEditButton: function (event) {
        // On récupére l'élément HTML de la tâche à modifier
        const taskHtmlElement = event.currentTarget.closest('.task');
        // On affiche l'input de modification
        taskHtmlElement.querySelector('.task__edit-form').style.display = 'flex';
        // On masque le titre
        taskHtmlElement.querySelector('.task__name').style.display = 'none';
    },

    /**
     * Cette fonction est appelée quand le formumaire de modification de tâche est soumis. 
     * 
     * @param {Event} event 
     */
    handleEditForm: async function (event) {
        // Bloquer l'envoie du formulaire
        event.preventDefault();

        // On récupère l'élément HTML complet de la tâche à modifier
        const taskHtmlElement = event.currentTarget.closest('.task');

        // Récupérer les données du formulaire
        const taskFormData = new FormData(event.currentTarget);

        // je récupère l'id de la tâche à modifier
        const taskId = taskFormData.get('id');

        // Envoyer les données à l'API
        // on vérifie que le titre a bien été changé avant d'appeler l'API
        if(taskFormData.get("name") !== ""){

        if(taskFormData.get("name") !== taskHtmlElement .textContent){
            const urlToCall = taskManager.apiEndpoint + "/tasks/" + taskId;
            const fetchOptions = {
                method : "PUT",
                body : taskFormData
            };
            const response = await fetch (urlToCall, fetchOptions);
            if (response.ok){
                const list = await response.json();
                taskHtmlElement.textContent = task.name;
            }
            else{
                console.log("Il y a eu un problème")
            }
        }
    }

        // Après confirmation de l'API modifier le nom de la tâche dans le span.task__name

        // On affiche l'input de modification
        taskHtmlElement.querySelector('.task__edit-form').style.display = 'none';
        // On masque le titre
        taskHtmlElement.querySelector('.task__name').style.display = 'block';
    }

};
