const Docker = require('dockerode');

class DockerService {
    constructor(docker) {
        this.docker = docker;
    }

    getList() {
        return new Promise((resolve, reject) => {
            this.docker.listContainers((error, containers) => {
                if (error) {
                    return reject(error);
                }

                return resolve(containers.map((container) => {
                    return {
                        id: container.Id,
                        names: container.Names,
                        state: container.State,
                        status: container.Status
                    }
                }));
            });
        });
    }

    attach(containerId) {
        const container = this.docker.getContainer(containerId);

        return new Promise((resolve, reject) => {
            container.attach({
                stream: true, stdout: true, stderr: true
            }, (error, stream) => {
                if (error) {
                    return reject(error);
                }

                return resolve(stream);
            });
        })
    }

    logs(containerId) {
        const container = this.docker.getContainer(containerId);

        return new Promise((resolve, reject) => {
            container.logs({
                follow: false,
                stdout: true,
                stderr: true
            }, (error, data) => {
                if (error) {
                    return reject(error);
                }

                return resolve(data);
            });
        })
    }
}

module.exports = new DockerService(new Docker());
