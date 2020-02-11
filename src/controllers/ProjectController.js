const Project = require('../models/Project');
const Tasks = require('../models/Task');

module.exports = {
    async index(request, response) {
        try {
            const projects = await Project.find().populate(['user', 'tasks']);

            return response.send({ projects });
        } catch (err) {
            console.log(err);
            return response
                .status(400)
                .send({ error: 'Error loading projects' });
        }
    },

    async store(request, response) {
        try {
            const { title, description, tasks } = request.body;

            const project = await Project.create({
                title,
                description,
                user: request.userId,
            });

            await Promise.all(
                tasks.map(async task => {
                    const projectTask = new Tasks({
                        ...task,
                        project: project._id,
                    });
                    await projectTask.save();
                    project.tasks.push(projectTask);
                })
            );

            await project.save();

            return response.send({ project });
        } catch (err) {
            console.log(err);
            return response.status(400).send({ error: 'Error create project' });
        }
    },

    async show(request, response) {
        try {
            const project = await Project.findById(
                request.params.projectId
            ).populate(['user', 'tasks']);

            return response.send({ project });
        } catch (err) {
            return response
                .status(400)
                .send({ error: 'Error loading project' });
        }
    },

    async update(request, response) {
        try {
            const { title, description, tasks } = request.body;

            const project = await Project.findByIdAndUpdate(
                request.params.projectId,
                {
                    title,
                    description,
                },
                { new: true } // retorna o projeto atualizado
            );

            // remover as tasks assosciada ao projeto
            project.tasks = [];
            await Tasks.deleteOne({ project: project._id });

            // criar todas as tasks novamente atualizadas
            await Promise.all(
                tasks.map(async task => {
                    // criando
                    const projectTask = new Tasks({
                        ...task,
                        project: project._id,
                    });

                    // salvando
                    await projectTask.save();
                    project.tasks.push(projectTask);
                })
            );

            await project.save();

            return response.send({ project });
        } catch (err) {
            console.log(err);
            return response
                .status(400)
                .send({ error: 'Error updating project' });
        }
    },

    async delete(request, response) {
        try {
            await Project.findByIdAndRemove(request.params.projectId);

            return response.send();
        } catch (err) {
            return response
                .status(400)
                .send({ error: 'Error deleting project' });
        }
    },
};
