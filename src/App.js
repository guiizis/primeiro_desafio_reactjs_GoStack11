import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get("/repositories").then(response => {
      setProjects(response.data)
    })
  }, [])




  async function handleAddRepository() {
    api.post(`/repositories`, {
      title: `project created at : ${Date.now()}`,
      url: "https://github.com/CodeSeven",
      techs: [],

    }).then(response => {
      setProjects([response.data, ...projects])

    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`)
      .then(_ => {

        const indexOfDeletedRepo = projects.findIndex(repository => repository.id == id)

        projects.splice(indexOfDeletedRepo, 1)

        setProjects([...projects]) //spread to create a new array to change the state
      })
      .catch(error => console.error(error))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((project, index) => (
          <li key={project.id} >
            <h4>{project.title}</h4>
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
